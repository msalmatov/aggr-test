import express from "express";
import getEmployees from "./employees";

const router = express.Router();

router.post("/employees", getEmployees);

export default router;