import express from "express";
import { login } from "../../controllers/controllers_scada/authController.js";

const router = express.Router();

router.post("/login", login);

export default router;
