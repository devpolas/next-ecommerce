import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import ProductPrice from "./product-price";

export default function ProductCard({ product }: { product: any }) {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='items-center p-0'>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            priority={true}
          />
        </Link>
      </CardHeader>
      <CardContent className='gap-4 grid p-4'>
        <Badge variant='secondary'>{product.brand}</Badge>
        <Link href={`/product/${product.slug}`}>
          <h2 className='font-medium text-sm'>{product.name}</h2>
        </Link>
        <div className='flex-between gap-4'>
          <p>{product.rating} stars</p>
          {product.stock > 0 ? (
            <ProductPrice price={product.price} />
          ) : (
            <Badge variant='destructive'>Out of Stock</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
