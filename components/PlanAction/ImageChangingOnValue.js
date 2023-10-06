function ImageChangingOnValue({ title, subtitle, position, images }) {
  return (
    <div className="flex flex-col gap-2 items-center sm:mx-5 sm:text-center">
      <h2 className="text-xl text-red-800">{title}</h2>
      <h5 className="font-thin text-customGray italic text-center text-xs mb-3">{subtitle}</h5>
      <div className="">
        <img
          src={images[position]}
          height={100}
          width={100}
          alt=""
        />
      </div>
    </div>
  );
}

export default ImageChangingOnValue;
