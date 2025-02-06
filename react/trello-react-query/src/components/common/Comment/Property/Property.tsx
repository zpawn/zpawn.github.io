import React, { isValidElement } from "react";
import styled from "styled-components";
import { P5, TSpan } from "@deskpro/deskpro-ui";
import { WithCopyButton } from "./CopyButton";
import type { FC, ReactNode } from "react";

export interface PropertyProps {
  label?: ReactNode,
  text?: ReactNode,
  copyText?: string,
  marginBottom?: number,
}

const Label = styled(TSpan)`
  color: ${({ theme }) => theme.colors.grey80};
`;

const Container = styled.div<PropertyProps>`
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
`;

const Property: FC<PropertyProps> = ({ text, label, copyText, marginBottom = 10 }: PropertyProps) => {
  let textBlock;

  if ((typeof text === "string" && Boolean(text)) || typeof text === "number") {
    textBlock = (<P5>{text}</P5>);
  } else if (isValidElement(text)) {
    textBlock = text;
  }

  if (copyText && textBlock) {
    textBlock = (
      <WithCopyButton copyText={copyText}>{textBlock}</WithCopyButton>
    );
  }

  return (
    <Container marginBottom={marginBottom}>
      {label && <Label type="p8">{label}</Label>}
      {textBlock ? textBlock : (<P5>-</P5>)}
    </Container>
  );
};

export { Property };
