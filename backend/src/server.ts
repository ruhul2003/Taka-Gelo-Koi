import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import { db } from "./db.js";
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Helper to map MongoDB _id to string id for frontend
const mapDoc = (doc: any) => {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
};

// Enable CORS with credentials support for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));

// We need raw and JSON body parser
app.use(express.json());

// Welcome / Health check route
app.get("/", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "🚀 \"টাকা গেল কই ?\" backend server is running successfully."
  });
});

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

    const query: any = { userId };
    if (dashboard) {
      query.dashboard = dashboard as string;
    }

    const rawTransactions = await db.collection<any>("transaction")
      .find(query)
      .sort({ date: -1 })
      .toArray();

    const transactions = rawTransactions.map(mapDoc);

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

    if (req.user.role === "admin") {
      return res.status(403).json({ error: "Admins cannot record financial transactions." });
    }

    const newTransaction = {
      _id: new ObjectId().toString(),
      userId,
      type,
      category,
      amount: parseFloat(amount),
      description,
      date: date ? new Date(date) : new Date(),
      dashboard,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection<any>("transaction").insertOne(newTransaction);
    const transaction = mapDoc(newTransaction);

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

    const transaction = await db.collection<any>("transaction").findOne({ _id: id });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    if (transaction.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized to delete this transaction." });
    }

    await db.collection<any>("transaction").deleteOne({ _id: id });

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
    const rawUsers = await db.collection<any>("user")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const users = await Promise.all(
      rawUsers.map(async (u) => {
        const transCount = await db.collection<any>("transaction").countDocuments({ userId: u._id.toString() });
        return {
          id: u._id.toString(),
          name: u.name,
          email: u.email,
          role: u.role || "user",
          createdAt: u.createdAt,
          _count: {
            transactions: transCount
          }
        };
      })
    );

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

// Get global stats (Admin only)
app.get("/api/admin/stats", authenticate, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const totalUsers = await db.collection<any>("user").countDocuments();
    
    // User counts by role
    const adminCount = await db.collection<any>("user").countDocuments({ role: "admin" });
    const userCount = await db.collection<any>("user").countDocuments({ $or: [{ role: "admin" }, { role: "user" }, { role: { $exists: false } }] });

    const userCountByRole = {
      admin: adminCount,
      user: userCount - adminCount // Make sure distinct users count is correct or just use exact count query
    };

    // Total transactions
    const totalTransactions = await db.collection<any>("transaction").countDocuments();

    // Sum income/expenses globally using aggregation
    const incomeAgg = await db.collection<any>("transaction")
      .aggregate([
        { $match: { type: "income" } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]).toArray();

    const expenseAgg = await db.collection<any>("transaction")
      .aggregate([
        { $match: { type: "expense" } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]).toArray();

    const totalIncome = incomeAgg[0]?.total || 0;
    const totalExpense = expenseAgg[0]?.total || 0;

    res.json({
      totalUsers,
      userCountByRole: {
        admin: adminCount,
        user: totalUsers - adminCount
      },
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
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 "টাকা গেল কই ?" backend running on http://localhost:${PORT}`);
  });
}

export default app;
