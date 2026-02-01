import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <Image
        src={"/images/logo.svg"}
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />
      <div className='shadow-md p-6 rounded-lg text-center w1/3'>
        <h1 className='mb-4 font-bold text-3xl'>Not Found</h1>
        <p className='text-destructive'>Could not found your requested page</p>
        <Button
          asChild
          variant='outline'
          className='mt-4 ml-2 hover:cursor-pointer'
        >
          <Link href='/'>Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
