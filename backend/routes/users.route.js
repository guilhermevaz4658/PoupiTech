import { Router } from "express";
import { getUsers, getUsersById, createUser, deleteUser, updateUser, loginUser } from "../controllers/users.controller.js";

const router = Router()

router.get("/", getUsers)
router.get("/:id", getUsersById)
router.post("/", createUser)
router.post("/login", loginUser)  // NOVO endpoint
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

export default router