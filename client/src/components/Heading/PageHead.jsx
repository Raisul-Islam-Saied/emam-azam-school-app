// eslint-disable-next-line react/prop-types
const PageHead = ({ children, className }) => {
  return (
    <h1
      className={`text-3xl font-extrabold  lg:text-[2.1rem] text-center ${className}`}
    >
      {children}
    </h1>
  );
};

export default PageHead;
