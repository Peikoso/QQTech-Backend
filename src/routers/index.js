import express  from "express";

import rulesRouter from "./rules.js";

const router = express.Router();

router.use("/rules", rulesRouter);

export default router;
