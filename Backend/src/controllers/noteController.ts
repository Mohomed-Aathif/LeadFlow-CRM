import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/authMiddleware";

export const addNote = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const { content } = req.body;

    const existingLead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!existingLead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    const note = await prisma.note.create({
      data: {
        content,
        createdBy: req.user.email,
        leadId: id,
      },
    });

    res.status(201).json(note);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add note",
    });
  }
};

export const getNotesByLead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const notes = await prisma.note.findMany({
      where: {
        leadId: id,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(notes);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch notes",
    });
  }
};