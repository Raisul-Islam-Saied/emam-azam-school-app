import React from "react";
import PageSubtitle from "./Heading/PageSubtitle";

function NoData({ children, className }) {
  return (
    <div
      className={`flex items-center justify-center flex-col my-10 gap-5 ${className}`}
    >
      <img
        loading="lazy"
        src="/images/notFound.svg"
        className="w-[70%] md:w-[50%]"
      />
      <PageSubtitle>{children}</PageSubtitle>
    </div>
  );
}

export default NoData;
