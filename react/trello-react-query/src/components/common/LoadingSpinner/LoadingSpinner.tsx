import { Spinner, Stack } from "@deskpro/deskpro-ui";
import type { FC } from "react";

const LoadingSpinner: FC = () => (
  <Stack justify="center" align="center" style={{ height: "200px" }}>
    <Spinner size="large" />
  </Stack>
);

export { LoadingSpinner };
