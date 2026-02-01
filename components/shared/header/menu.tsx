import { Button } from "@/components/ui/button";
import ThemeToggler from "./theme-toggler";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Menu() {
  return (
    <div className='flex justify-end gap-3'>
      <nav className='hidden md:flex gap-1 w-full max-w-xs'>
        <ThemeToggler />
        <Button asChild variant='ghost'>
          <Link href={"/cart"}>
            <ShoppingCart /> Cart
          </Link>
        </Button>
        <Button asChild>
          <Link href={"/signin"}>
            <UserIcon /> Signin
          </Link>
        </Button>
      </nav>
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='align-middle'>
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className='flex flex-col items-start'>
            <span className='flex flex-row justify-around items-center bg-primary-foreground p-2 w-full'>
              <SheetTitle>Menu</SheetTitle>
              <ThemeToggler />
            </span>
            <Button asChild variant='ghost'>
              <Link href={"/cart"}>
                <ShoppingCart /> Cart
              </Link>
            </Button>
            <Button asChild>
              <Link href={"/signin"}>
                <UserIcon /> Signin
              </Link>
            </Button>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
