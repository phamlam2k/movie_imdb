import { ReactNode } from "react";

interface Props {
  title?: String;
  children?: ReactNode;
}

export const Section = (props: Props) => {
  return (
    <div className="">
      {props.title ? (
        <h1 className="text-xl px-6 py-1.5">{props.title}</h1>
      ) : (
        ""
      )}
      {props.children}
    </div>
  );
};
