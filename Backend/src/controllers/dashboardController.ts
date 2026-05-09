import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/authMiddleware";

export const getDashboardStats = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const totalLeads = await prisma.lead.count();

    const newLeads = await prisma.lead.count({
      where: {
        status: "NEW",
      },
    });

    const qualifiedLeads = await prisma.lead.count({
      where: {
        status: "QUALIFIED",
      },
    });

    const wonLeads = await prisma.lead.count({
      where: {
        status: "WON",
      },
    });

    const lostLeads = await prisma.lead.count({
      where: {
        status: "LOST",
      },
    });

    const totalDealValue = await prisma.lead.aggregate({
      _sum: {
        dealValue: true,
      },
    });

    const wonDealValue = await prisma.lead.aggregate({
      where: {
        status: "WON",
      },

      _sum: {
        dealValue: true,
      },
    });

    res.json({
      totalLeads,
      newLeads,
      qualifiedLeads,
      wonLeads,
      lostLeads,
      totalEstimatedDealValue:
        totalDealValue._sum.dealValue || 0,

      totalWonDealValue:
        wonDealValue._sum.dealValue || 0,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch dashboard stats",
    });
  }
};