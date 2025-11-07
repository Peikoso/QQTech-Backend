import { RulesController } from "../controllers/rules.js";
import express from "express";

const router = express.Router();

router.get("/", RulesController.getAllRules);

export default router;
