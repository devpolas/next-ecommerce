import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
export const dynamic = "force-dynamic";
export default async function page() {
  const latestProducts = await getLatestProducts();
  console.log(latestProducts);
  return (
    <div>
      <ProductList data={latestProducts} />
    </div>
  );
}
