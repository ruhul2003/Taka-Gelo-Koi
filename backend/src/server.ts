import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import { prisma } from "./db.js";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with credentials support for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));

// We need raw and JSON body parser
app.use(express.json());

// Auth interceptor for admin signups
app.post("/api/auth/sign-up/email", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role, adminSecret } = req.body;
    if (role === "admin") {
      if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ 
          error: "Unauthorized: Invalid admin secret key." 
        });
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Mount Better Auth handler
app.all("/api/auth/*", toNodeHandler(auth));

// Custom interface for request with user info
interface AuthenticatedRequest extends Request {
  user?: any;
  session?: any;
}

// Authentication Middleware
const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as any
    });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    req.user = session.user;
    req.session = session.session;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Authentication check failed." });
  }
};

// Admin Middleware
const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

/* ==========================================
   TRANSACTIONS API
   ========================================== */

// Get all transactions for the logged-in user, optionally filtered by dashboard
app.get("/api/transactions", authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { dashboard } = req.query; // "daily", "business", "study"
    const userId = req.user.id;

    const whereClause: any = { userId };
    if (dashboard) {
      whereClause.dashboard = dashboard as string;
    }

    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      orderBy: { date: "desc" }
    });

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions." });
  }
});

// Add a transaction
app.post("/api/transactions", authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { type, category, amount, description, date, dashboard } = req.body;
    const userId = req.user.id;

    if (!type || !category || amount === undefined || !dashboard) {
      return res.status(400).json({ error: "Missing required transaction fields." });
    }

    // Role-based validations:
    // If a user has a specific role, they should generally use their dashboard
    // But we let them log transaction under daily/business/study as long as they are authenticated.
    // However, admin cannot create transactions.
    if (req.user.role === "admin") {
      return res.status(403).json({ error: "Admins cannot record financial transactions." });
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        type,
        category,
        amount: parseFloat(amount),
        description,
        date: date ? new Date(date) : new Date(),
        dashboard
      }
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Failed to create transaction." });
  }
});

// Delete a transaction
app.delete("/api/transactions/:id", authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const transaction = await prisma.transaction.findUnique({
      where: { id }
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    if (transaction.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized to delete this transaction." });
    }

    await prisma.transaction.delete({
      where: { id }
    });

    res.json({ message: "Transaction deleted successfully." });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Failed to delete transaction." });
  }
});


/* ==========================================
   ADMIN API
   ========================================== */

// Get all users (Admin only)
app.get("/api/admin/users", authenticate, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: { transactions: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

// Get global stats (Admin only)
app.get("/api/admin/stats", authenticate, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    
    // User counts by role
    const rolesGroup = await prisma.user.groupBy({
      by: ["role"],
      _count: {
        role: true
      }
    });

    const userCountByRole = {
      admin: 0,
      user: 0
    };

    rolesGroup.forEach((group) => {
      const roleKey = group.role as keyof typeof userCountByRole;
      if (roleKey in userCountByRole) {
        userCountByRole[roleKey] = group._count.role;
      }
    });

    // Total transactions
    const totalTransactions = await prisma.transaction.count();

    // Sum income/expenses globally
    const agg = await prisma.transaction.groupBy({
      by: ["type"],
      _sum: {
        amount: true
      }
    });

    let totalIncome = 0;
    let totalExpense = 0;

    agg.forEach((item) => {
      if (item.type === "income") {
        totalIncome = item._sum.amount || 0;
      } else if (item.type === "expense") {
        totalExpense = item._sum.amount || 0;
      }
    });

    res.json({
      totalUsers,
      userCountByRole,
      totalTransactions,
      globalFinances: {
        totalIncome,
        totalExpense,
        netBalance: totalIncome - totalExpense
      }
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ error: "Failed to fetch global stats." });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 "টাকা গেল কই ?" backend running on http://localhost:${PORT}`);
});
