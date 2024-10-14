import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Provider } from "react-redux";
import { store } from "../src/store/store.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SignUpForm from "./pages/auth/SignUp.jsx";
import CredentialsSignInPage from "./pages/auth/SignIn.jsx";
import Topics from "./pages/topics/Topics.jsx";
import Questions from "./pages/questions/Questions.jsx";
import QuizResults from "./pages/result/Result.jsx";
import LeaderboardPage from "./pages/leaderbord/LeaderBord.jsx";
import Auth from "./pages/auth/auth.jsx";
import NotFoundPage from "./pages/error/NotFound.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<App />}>
        <Route path="" element={<Topics />} />
        <Route path="questions" element={<Questions />} />
        <Route path="result" element={<QuizResults />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
      </Route>
      <Route path="auth" element={<Auth />}>
        <Route path="login" element={<CredentialsSignInPage />} />
        <Route path="register" element={<SignUpForm />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
