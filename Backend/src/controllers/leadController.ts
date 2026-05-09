import { Response } from "express";

import prisma from "../config/prisma";

import { AuthRequest } from "../middleware/authMiddleware";

export const createLead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      leadName,
      companyName,
      email,
      phoneNumber,
      leadSource,
      assignedSalesperson,
      status,
      dealValue,
    } = req.body;

    const lead = await prisma.lead.create({
      data: {
        leadName,
        companyName,
        email,
        phoneNumber,
        leadSource,
        assignedSalesperson,
        status,
        dealValue,
        userId: req.user.userId,
      },
    });

    res.status(201).json(lead);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create lead",
    });
  }
};

export const getLeads = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      status,
      leadSource,
      assignedSalesperson,
      search,
    } = req.query;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (leadSource) {
      where.leadSource = leadSource;
    }

    if (assignedSalesperson) {
      where.assignedSalesperson =
        assignedSalesperson;
    }

    if (search) {
      where.OR = [
        {
          leadName: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          companyName: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search as string,
            mode: "insensitive",
          },
        },
      ];
    }

    const leads = await prisma.lead.findMany({
      where,

      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(leads);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch leads",
    });
  }
};

export const getLeadById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const lead = await prisma.lead.findUnique({
      where: { id },

      include: {
        notes: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.json(lead);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch lead",
    });
  }
};

export const updateLead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const updatedLead = await prisma.lead.update({
      where: { id },

      data: req.body,
    });

    res.json(updatedLead);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update lead",
    });
  }
};

export const deleteLead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    await prisma.lead.delete({
      where: { id },
    });

    res.json({
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete lead",
    });
  }
};