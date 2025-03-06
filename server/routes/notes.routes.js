import express from "express";
import { getNotes, createNotes } from "../controllers/notes.controller.js";

const router = express.Router();

router.get("/get-notes/:userId", getNotes);
router.post("/create-notes", createNotes);

export default router;
