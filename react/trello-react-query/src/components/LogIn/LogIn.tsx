import { Title, AnchorButton } from "../common";
import type { FC } from "react";

type Props = {
  authUrl: string;
  isLoading: boolean;
  onLogin: () => void;
};

const LogIn: FC<Props> = ({ onLogin, authUrl, isLoading }) => {
    return (
        <>
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
        </>
    );
}

export { LogIn };
