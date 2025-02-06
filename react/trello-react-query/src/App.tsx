import { Routes, Route } from "react-router-dom";
import {
    AddCommentPage,
    CreateCardPage,
    EditCardPage,
    HomePage,
    LinkCardPage,
    LoadingAppPage,
    LogInPage,
    ViewCardPage,
} from "./pages";
import { AppNavigation } from "./components/common";

const App = () => {
  return (
    <>
      <AppNavigation/>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/log_in" element={<LogInPage />} />
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
