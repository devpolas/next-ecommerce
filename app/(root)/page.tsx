import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { Product } from "@/types/product";
export const dynamic = "force-dynamic";
export default async function page() {
  const latestProducts: Product[] = await getLatestProducts();
  return (
    <div>
      <ProductList data={latestProducts} />
    </div>
  );
}
