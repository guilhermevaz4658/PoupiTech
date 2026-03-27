import { Router } from "express";
import { getUsers, getUsersById, createUser, deleteUser, updateUser } from "../controllers/users.controller";
const router = Router()

router.get("/", getUsers)
router.post("/", createUser)
router.get("/:id", getUsersById)
router.delete("/:id", deleteUser)
router.put("/:id", updateUser)

export default router