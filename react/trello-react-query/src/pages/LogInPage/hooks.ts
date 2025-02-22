import { useEffect, useState, useCallback, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import { checkIsAliveService } from "../../services/trello";
import { setTokenService } from "../../services/local";
import { getTokenInProxyService } from "../../services/proxy";
import { API_KEY, PROXY_URL } from "../../constants";
import { getQueryParams } from "../../utils";
import { useAsyncError } from "../../hooks";

type UseLogIn = () => {
  authUrl: string;
  isLoading: boolean;
  onLogin: () => void;
};

const useLogIn: UseLogIn = () => {
    const navigate = useNavigate();
    const [authUrl, setAuthUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { asyncErrorHandler } = useAsyncError();
    const state = useMemo(() => uuid(), []);

    useEffect(() => {
        if (state) {
            setAuthUrl(`https://trello.com/1/authorize?${getQueryParams({
            callback_method: "fragment",
            name: "ilia-makarov-trello-auth",
            key: API_KEY,
            expiration: "1day",
            return_url: `${PROXY_URL}/auth/callback?state=${state}`,
            scope: ["read","write"].join(","),
          })}`);
        }
    }, [state]);

    const onLogin = useCallback(() => {
      setTimeout(() => setIsLoading(true), 500);

      getTokenInProxyService(state)
        .then(({ token }) => setTokenService(token))
        .then(() => checkIsAliveService)
        .then(() => navigate(routes.HOME))
        .catch(asyncErrorHandler)
        .finally(() => setIsLoading(false));
    }, [navigate, asyncErrorHandler, state]);

    return { authUrl, onLogin, isLoading };
};

export { useLogIn };
