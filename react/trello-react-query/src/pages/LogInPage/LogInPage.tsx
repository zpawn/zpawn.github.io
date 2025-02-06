import { useLogIn } from "./hooks";
import { LogIn } from "../../components";

const LogInPage = () => {
  const { authUrl, onLogin, isLoading } = useLogIn();

  return (
    <LogIn authUrl={authUrl} onLogin={onLogin} isLoading={isLoading}/>
  );
};

export { LogInPage };
