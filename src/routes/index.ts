import express from "express";
import searchEmployees from "./employees";

const router = express.Router();

router.post("/employees/search", searchEmployees);

export default router;