import ProductImageDisplay from "@/components/shared/product/product-image-display";
import ProductPrice from "@/components/shared/product/product-price";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { Product } from "@/types/product";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product: Product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-5'>
          <div className='col-span-2'>
            <ProductImageDisplay images={product.images} />
          </div>
          <div className='col-span-2 p-5'>
            {/* details container */}
            <div className='flex flex-col gap-6'>
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className='h3-bold'>{product.name}</h1>
              <p>
                {product.rating} of {product.numReviews}
              </p>
              <div className='flex sm:flex-row flex-col sm:items-center gap-3'>
                <ProductPrice
                  className='bg-green-100 px-5 py-2 rounded-full w-24 text-green-700'
                  price={Number(product.price)}
                />
              </div>
            </div>
            <div className='mt-10'>
              <p className='font-semibold'>Description</p>
              <p>{product.description}</p>
            </div>
          </div>
          {/* action column */}
          <div>
            <Card>
              <CardContent className='p-4'>
                <div className='flex justify-between mb-2'>
                  <p>Price</p>
                  <div>
                    <ProductPrice price={Number(product.price)} />
                  </div>
                </div>
                <div className='flex justify-between mb-2'>
                  <p>Status</p>
                  {product.stock > 0 ? (
                    <Badge variant='outline'>In Stock</Badge>
                  ) : (
                    <Badge variant='destructive'>Out of Stock</Badge>
                  )}
                </div>
                {product.stock > 0 && (
                  <div className='flex-center'>
                    <Button className='w-full hover:cursor-pointer'>
                      Add to Cart
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
