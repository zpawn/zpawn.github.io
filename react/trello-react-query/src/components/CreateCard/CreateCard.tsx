import { routes } from "../../constants";
import { TwoButtonGroup } from "../common";
import { CardForm } from "../CardForm";
import type { FC } from "react";
import type { FormProps } from "../CardForm";

const CreateCard: FC<FormProps> = (props) => {
  return (
    <>
      <TwoButtonGroup
        oneTitle="Find Card"
        onePath={routes.LINK_CARD}
        twoTitle="Create Card"
        twoPath={routes.CREATE_CARD}
      />
      <CardForm {...props}/>
    </>
  );
};

export { CreateCard };
