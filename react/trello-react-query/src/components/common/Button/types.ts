import type { ReactNode } from "react";

export type ButtonCommonProps = {
  text: ReactNode;
  intent?: "primary"|"secondary"|"minimal"|"underline";
  loading?: boolean;
  active?: boolean;
};
