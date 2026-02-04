"use server";

import { convertToPlainObject } from "@/utils/utils";
import { prisma } from "@/lib/prisma";
import { LATEST_PRODUCT_LIMIT } from "../constants";
import { Product } from "@/types/product";

export async function getLatestProducts(): Promise<Product[]> {
  const latestProduct = await prisma.product.findMany({
    take: Number(LATEST_PRODUCT_LIMIT),
    orderBy: { createdAt: "desc" },
  });

  const products = latestProduct.map((product) => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating.toNumber(),
  }));

  return convertToPlainObject(products) as Product[];
}
