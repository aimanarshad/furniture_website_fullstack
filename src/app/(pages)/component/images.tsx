import Image from "next/image"

export default function Images(){
    return(
        <>
        <div
  style={{ backgroundImage: "url('/img.jpg')" }}
  className="bg-cover bg-center h-[330px] opacity-80 w-full relative mt-[100px]"
>
  <div className="absolute top-[60px] left-[50%] transform -translate-x-1/2">
    <Image className="w-[77px] h-[77px] top-[30px] left-[682px]" src="/logo.png" alt="logo" width={70} height={60} />
    <h1 className=" text-[48px] font-medium leading-[72px] text-5xl text-left top-0 ">Checkout</h1>
    <div className="w-[145px] h-[24px] flex flex-row gap-7 top-[295px] left-[680px] "
    >
      <span className="font-bold text-sm ">Home</span>
      <Image
      src="/arrow.png"
      alt="arrow"
      width={100}
      height={100}
      className=" w-[30px] h-[15px]  top-[150px] left-[37px] absolute "

      />
      <span className="font-bold text-sm text-black">Checkout</span>
    </div>
  </div>
  </div>
        </>
    )
}