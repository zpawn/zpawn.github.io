import { useNavigate } from "react-router-dom";
import { Stack } from "@deskpro/deskpro-ui";
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
  const button = null;

  // eslint-disable-next-line no-console
  console.error(error);

  if (error instanceof TrelloError) {
    if (error?.status === status.UN_AUTH) {
      navigate("/log_in");
    }
    //..
  }

  return (
    <Container>
      <ErrorBlock
        text={(
          <Stack gap={6} vertical style={{ padding: "8px" }}>
            {message}
            {button}
          </Stack>
        )}
      />
    </Container>
  );
};

export { ErrorFallback };
