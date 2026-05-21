import express, { Request, Response }  from "express";
import dotenv from "dotenv"

import connectDB from "./config/mongo";
dotenv.config()
import createAdmin from "./seeder/adminSeeder";
connectDB()
createAdmin();
import app from "./app";

app.get("/",(req:Request,res:Response)=>{
  res.send("typescript server is running");
})

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`)
})