import { useNavigate } from "react-router-dom";
import { TrelloError } from "../../utils";
import { UNKNOWN_ERROR, status } from "../../constants";
import { Container, ErrorBlock } from "../common";
import type { FC } from "react";
import type { FallbackProps } from "react-error-boundary";

type Props = Omit<FallbackProps, "error"> & {
    error: Error,
};

const ErrorFallback: FC<Props> = ({ error }) => {
  const navigate = useNavigate();
  const message = UNKNOWN_ERROR;

  // eslint-disable-next-line no-console
  console.error(error);

  if (error instanceof TrelloError) {
    if (error?.status === status.UNAUTH) {
      navigate("/log_in");
      return;
    }
    //..
  }

  return (
    <Container>
      <ErrorBlock errors={[message]}/>
    </Container>
  );
};

export { ErrorFallback };
