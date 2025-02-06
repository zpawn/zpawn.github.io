import styled, { keyframes } from "styled-components";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import CopyToClipboard from "react-copy-to-clipboard";
import { IconButton } from "@deskpro/deskpro-ui";
import type { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  copyText: string;
};

const Container = styled.div`
  width: 1px;
  height: 1rem;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(100%, -15%);
  }
  to {
    opacity: 1;
    transform: translate(0, -15%);
  }
`;

const CopyButtonStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-15%);
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 1) 100%);
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;

  &:hover ${CopyButtonStyled} {
    opacity: 1;
    animation: ${fadeIn} 0.15s ease-in-out;
  }
`;

const CopyButton = ({ copyText }: { copyText: string }) => (
  <Container>
    <CopyButtonStyled>
      <CopyToClipboard text={copyText}>
        <IconButton icon={faCopy} size="small" intent="minimal" />
      </CopyToClipboard>
    </CopyButtonStyled>
  </Container>
);

const WithCopyButton: FC<Props> = ({ children, copyText }) => {
  return (
    <Wrapper>
      {children}
      <CopyButton copyText={copyText}/>
    </Wrapper>
  );
};

export { WithCopyButton };
