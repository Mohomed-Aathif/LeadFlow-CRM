import express from "express";

import authMiddleware from "../middleware/authMiddleware";

import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/leadController";

import {
  addNote,
  getNotesByLead,
} from "../controllers/noteController";

const router = express.Router();

router.use(authMiddleware);

router.get("/test", (req, res) => {
  res.json({
    message: "Lead routes working",
  });
});


router.post("/", createLead);

router.get("/", getLeads);

router.post("/:id/notes", addNote);

router.get("/:id/notes", getNotesByLead);

router.get("/:id", getLeadById);

router.put("/:id", updateLead);

router.delete("/:id", deleteLead);

export default router;