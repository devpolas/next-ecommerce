"use server";

import { convertToPlainObject } from "@/utils/utils";
import prisma from "@/lib/prisma";
import { LATEST_PRODUCT_LIMIT } from "../constants";

export async function getLatestProducts() {
  const latestProduct = await prisma.product.findMany({
    take: Number(LATEST_PRODUCT_LIMIT),
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(latestProduct);
}
