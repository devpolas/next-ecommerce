"use server";

import { convertToPlainObject } from "@/utils/utils";
import prisma from "../prisma";

export async function getLatestProducts() {
  const latestProduct = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(latestProduct);
}
