import { Product } from "@/types/product";
import ProductCard from "./product-card";

export default function ProductList({
  data,
  title,
}: {
  data: Product[];
  title?: string;
}) {
  return (
    <div className='my-10'>
      <h2 className='mb-4 h2-bold'>{title}</h2>
      {data.length > 0 ? (
        <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {data.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className='text-center'>
          <p>No product found</p>
        </div>
      )}
    </div>
  );
}
