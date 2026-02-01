import { cn } from "@/lib/utils";

export default function ProductPrice({
  priceSign,
  price,
  className,
}: {
  priceSign?: string;
  price: number;
  className?: string;
}) {
  // price convert to string
  const priceString = price.toFixed(2);
  // separated int and float value
  const [intValue, floatValue] = priceString.split(".");
  return (
    <p className={cn("font-medium text-2xl", className)}>
      <span className='text-sm align-super'>{priceSign ? priceSign : "$"}</span>
      {intValue}
      <span className='text-sm align-super'>.{floatValue}</span>
    </p>
  );
}
