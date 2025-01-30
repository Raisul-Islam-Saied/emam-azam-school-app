// eslint-disable-next-line react/prop-types
const PageSubtitle = ({ children, className }) => {
  return (
    <p
      className={`font-semibold text-slate-700  text-center dark:text-slate-400 text-md ${className}`}
    >
      {children}
    </p>
  );
};

export default PageSubtitle;
