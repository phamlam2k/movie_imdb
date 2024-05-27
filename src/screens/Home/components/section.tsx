import { ReactNode } from "react";

interface Props {
  title?: String;
  children?: ReactNode;
  classNames?: String;
}

export const Section = (props: Props) => {
  return (
     <div className={`w-[90%] ${props.classNames} mx-auto`}>
      {props.title ? (
        <h1 className="text-[25px] px-6 py-1.5">{props.title}</h1>
      ) : (
        ""
      )}
      {props.children}
 
  </div>
   
  );
};
