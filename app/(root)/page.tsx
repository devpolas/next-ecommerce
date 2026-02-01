import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";
export default async function page() {
  return (
    <div>
      <ProductList data={sampleData.products} limit={4} />
    </div>
  );
}
