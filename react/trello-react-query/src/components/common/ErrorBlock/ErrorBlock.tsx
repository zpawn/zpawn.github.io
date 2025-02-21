import { UNKNOWN_ERROR } from "../../../constants";
import { P } from "../Typography";
import type { FC, ReactNode } from "react";

type Props = {
  errors?: Array<ReactNode|string>;
}

const ErrorBlock: FC<Props> = ({ errors = [UNKNOWN_ERROR] }) => (
  <div>
    {errors.map((msg, idx) => (
      <P key={idx} className="bg-red-500 text-white rounded-md py-2 px-3">
        {msg}
      </P>
    ))}
  </div>
);

export { ErrorBlock };
