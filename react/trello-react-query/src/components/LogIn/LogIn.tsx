import { Title, Container, AnchorButton } from "../common";
import type { FC } from "react";

type Props = {
  authUrl: string;
  isLoading: boolean;
  onLogin: () => void;
};

const LogIn: FC<Props> = ({ onLogin, authUrl, isLoading }) => {
    return (
        <Container>
            <Title title="Log into your Trello Account" />
            <AnchorButton
                text="Sign In"
                href={authUrl}
                intent="secondary"
                onClick={onLogin}
                target="_blank"
                loading={isLoading}
                disabled={!authUrl || isLoading}
            />
        </Container>
    );
}

export { LogIn };
