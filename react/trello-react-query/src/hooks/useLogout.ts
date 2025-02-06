import { useState, useCallback } from "react";
import { noop } from "lodash";
import { useNavigate } from "react-router-dom";
import { removeTokenService } from "../services/local";
import { revokeTokenService } from "../services/trello";

type UseLogout = () => {
    isLoading: boolean,
    logout: () => Promise<unknown>,
};

const useLogout: UseLogout = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const logout = useCallback(() => {
        setIsLoading(true);

        return Promise.all([
          revokeTokenService(),
          removeTokenService(),
        ])
            .catch(noop)
            .finally(() => {
                setIsLoading(false);
                navigate("/log_in");
            });
    }, [navigate]);

    return { logout, isLoading };
};

export { useLogout };
