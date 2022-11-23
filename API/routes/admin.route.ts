import express from "express";
import AdminController from "../controllers/admin.controller";

const router = express.Router();

router
    .route("/login")
    .post(AdminController.login);

export default router;