import { ReactNode } from "react";

interface Props {
  title?: String;
  children?: ReactNode;
  className?: String;
}

export const Section = (props: Props) => {
  return (
    <div className="w-[90%] h-[550px] mx-auto">
      {props.title ? (
        <h1 className=" text-xl text-[25px] px-6 py-1.5">{props.title}</h1>
      ) : (
        ""
      )}
      {props.children}
    </div>
  );
};
