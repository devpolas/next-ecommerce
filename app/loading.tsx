import Image from "next/image";

export default function DefaultLoading() {
  return (
    <div className='flex justify-center items-center w-dvw h-dvh'>
      <Image src={"/loader.gif"} height={150} width={150} alt='loading.....' />
    </div>
  );
}
