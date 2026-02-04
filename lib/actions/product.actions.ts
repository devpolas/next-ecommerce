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

// get single product by it's slug
export async function getProductBySlug(slug: string): Promise<Product> {
  const product = await prisma.product.findFirst({
    where: { slug },
  });

  return convertToPlainObject({
    ...product,
    price: product?.price.toString(),
    rating: product?.rating.toNumber(),
  }) as Product;
}
