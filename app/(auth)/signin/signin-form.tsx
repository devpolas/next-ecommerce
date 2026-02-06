"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signin } from "./signin-action";
import { LoadingSpinner } from "@/components/spinner/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams } from "next/navigation";

export default function SigninForm() {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") ?? "/";

  const [data, action] = useActionState(signin, {
    success: false,
    message: "",
  });

  const SigninButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        disabled={pending}
        className='w-full hover:cursor-pointer'
        variant='default'
      >
        {pending ? (
          <span className='flex flex-row items-center gap-2'>
            <LoadingSpinner /> <span>Signin.....</span>
          </span>
        ) : (
          "Signin"
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
              autoComplete='password'
              placeholder='password'
            />
          </div>
          <div className='flex flex-row items-center'>
            <input type='hidden' name='rememberMe' value='off' />
            <Checkbox name='rememberMe' value='on' defaultChecked={false} />
            <span className='ml-2 text-sm'>Remember Me?</span>
          </div>
          <div>
            <SigninButton />
          </div>
          <p className='text-muted-foreground text-sm text-center'>
            Don&apos;t have any account?{" "}
            <Link className='hover:underline link' href='/signup'>
              Signup
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
