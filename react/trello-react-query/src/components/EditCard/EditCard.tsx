import { CardForm } from "../CardForm";
import { FC } from "react";
import type { FormProps } from "../CardForm";

const EditCard: FC<FormProps> = (props) => {
  return (
    <CardForm {...props}/>
  );
};

export { EditCard };
