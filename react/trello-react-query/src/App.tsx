import { Routes, Route } from "react-router-dom";
import { nav } from "./constants";
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
import { AppNavigation } from "./components/common";

const App = () => {
  return (
    <>
      <AppNavigation nav={nav}/>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/log_in" element={<LogInPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/link_card" element={<LinkCardPage />} />
        <Route path="/create_card" element={<CreateCardPage />} />
        <Route path="/view_card/:cardId" element={<ViewCardPage />} />
        <Route path="/edit_card/:cardId" element={<EditCardPage />} />
        <Route path="/add_comment/:cardId" element={<AddCommentPage />} />
        <Route index element={<LoadingAppPage />} />
      </Routes>
    </>
  );
};

export { App };
