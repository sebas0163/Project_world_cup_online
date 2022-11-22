import express from "express";
import GroupController from "../controllers/group.controller";

const router = express.Router();

router
    .route("/")
    .get(GroupController.getGroups)
    .post(GroupController.createGroup);

router
    .route("/:code")
    .get(GroupController.getGroup);

router
    .route("/join")
    .post(GroupController.joinGroup);

export default router;