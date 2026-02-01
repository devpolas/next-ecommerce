import { APP_NAME } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='border-t'>
      <div className='flex-center p-3 md:p-5 wrapper'>
        <p className='text-xs md:text-sm text-center'>
          {currentYear} {APP_NAME}. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
