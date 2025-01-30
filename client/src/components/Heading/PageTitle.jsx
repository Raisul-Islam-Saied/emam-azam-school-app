// eslint-disable-next-line react/prop-types
const PageTitle = ({ children, className }) => {
  return (
    <div
      className={`page-title flex flex-col  items-center justify-center gap-2 ${className}`}
    >
      {children}
    </div>
  );
};

export default PageTitle;
