"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signup } from "./signup-action";
import { LoadingSpinner } from "@/components/spinner/spinner";
import { useSearchParams } from "next/navigation";

export default function SignupForm() {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") ?? "/";

  const [data, action] = useActionState(signup, {
    success: false,
    message: "",
  });

  const SignupButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        disabled={pending}
        className='w-full hover:cursor-pointer'
        variant='default'
      >
        {pending ? (
          <span className='flex flex-row items-center gap-2'>
            <LoadingSpinner /> <span>Signup.....</span>
          </span>
        ) : (
          "Signup"
        )}
      </Button>
    );
  };

  return (
    <>
      <p className='text-destructive text-sm text-center'>
        {!data.success && data.message}
      </p>
      <form action={action}>
        {/* Hidden callbackURL */}
        <input type='hidden' name='callbackURL' value={callbackURL} />
        <div className='space-y-6'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              type='text'
              required
              autoComplete='name'
              placeholder='Full Name'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              required
              autoComplete='email'
              placeholder='email'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              type='password'
              required
              placeholder='password'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='passwordConfirm'>Password Confirm</Label>
            <Input
              id='passwordConfirm'
              name='passwordConfirm'
              type='password'
              required
              placeholder='password confirm'
            />
          </div>

          <div>
            <SignupButton />
          </div>
          <p className='text-muted-foreground text-sm text-center'>
            Don&apos;t have any account?{" "}
            <Link className='hover:underline link' href='/signin'>
              Signin
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
