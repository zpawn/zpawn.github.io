import { Routes, Route } from "react-router-dom";
import { nav, routes } from "./constants";
import {
    AddCommentPage,
    CreateCardPage,
    EditCardPage,
    HomePage,
    LinkCardPage,
    LoadingAppPage,
    LogInPage,
    ViewCardPage,
    LogoutPage,
} from "./pages";
import { AppNavigation, AppContainer } from "./components/common";

const App = () => {
  return (
    <AppContainer>
      <AppNavigation nav={nav}/>
      <Routes>
        <Route path={routes.HOME} element={<HomePage />} />
        <Route path={routes.LOGIN} element={<LogInPage />} />
        <Route path={routes.LOGOUT} element={<LogoutPage />} />
        <Route path={routes.LINK_CARD} element={<LinkCardPage />} />
        <Route path={routes.CREATE_CARD} element={<CreateCardPage />} />
        <Route path={routes.VIEW_CARD} element={<ViewCardPage />} />
        <Route path={routes.EDIT_CARD} element={<EditCardPage />} />
        <Route path={routes.ADD_COMMENT} element={<AddCommentPage />} />
        <Route index element={<LoadingAppPage />} />
      </Routes>
    </AppContainer>
  );
};

export { App };
