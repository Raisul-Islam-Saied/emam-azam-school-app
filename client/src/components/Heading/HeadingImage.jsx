// eslint-disable-next-line react/prop-types
const PageHeadingImage = ({ src, visible, className }) => {
  return (
    <img
      loading="lazy"
      className={`flex items-end justify-starts transition duration-100 w-[7rem]  
              ${visible ? "animate-peep" : "opacity-0"} ${className}`}
      src={src}
      alt="peep"
    />
  );
};

export default PageHeadingImage;
