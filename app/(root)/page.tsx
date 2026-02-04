import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
export default async function page() {
  const latestProducts = await getLatestProducts();
  return (
    <div>
      <ProductList data={latestProducts} />
    </div>
  );
}
