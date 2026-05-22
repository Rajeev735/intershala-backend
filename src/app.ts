import express from "express"
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import errorMiddleware from "./middleware/error.middleware";
import leadController from "./controllers/lead.controller";
import leadRoutes from "./routes/lead.routes";
import userRoutes from "./routes/user.routes";

const app=express();
app.use(cors({
  origin:"https://internshala-frontend.vercel.app",
  credentials:true
}))
app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/leads",leadRoutes)
app.use("/api/users",userRoutes)

app.use(errorMiddleware)

export default app;
