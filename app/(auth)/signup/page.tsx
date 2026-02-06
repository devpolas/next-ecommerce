import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SignupForm from "./signup-form";

export const metadata: Metadata = {
  title: "signup",
};
export default function SigninPage() {
  return (
    <div className='mx-auto w-full max-w-md'>
      <Card>
        <CardHeader className='space-y-4'>
          <Link href='/' className='flex-center'>
            <Image
              height={100}
              width={100}
              src='/images/logo.svg'
              alt={`${APP_NAME}`}
              priority={true}
            />
          </Link>
          <CardTitle className='text-center'>Signup</CardTitle>
          <CardDescription className='text-center'>
            Create your account
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
