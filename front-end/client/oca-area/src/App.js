import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

import TicTacToe from "./pages/TicTacToe";
import TicTacToeMulti from "./pages/OnlineXoGame";
import OnlineXoPortal from "./pages/OnlineXoPortal";
import TicTacToeMode from "./pages/TicTacToeMode";
import TicTacToeAi from "./pages/TicTacToeAi";
import Home from "./pages/Home";
import Games from "./pages/Games";
import About from "./pages/About";
import Contact from "./pages/Contact";
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/vnd.api+json";
axios.defaults.headers.post["Accept"] = "application/vnd.api+json";
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <GoogleOAuthProvider
        clientId={`${process.env.REACT_APP_GOOGLE_API_CLIENT_ID}`}
        // clientId={
        //   "811071158820-2am1vmkdpm1fbhlgugc2m8jkf9frhkep.apps.googleusercontent.com"
        // }
      >
        <Routes>
          <Route path={"/signin"} element={<SignIn />} />
          <Route path={"/game"} element={<TicTacToeMulti />} />
          <Route path={"/xo"} element={<TicTacToeMode />} />
          <Route path={"/multiplayer-offline"} element={<TicTacToe />} />
          <Route path={"/tictactoe-online"} element={<OnlineXoPortal />} />
          <Route path={"/vs-ai"} element={<TicTacToeAi />} />
          <Route path={"/all-games"} element={<Games />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/contact"} element={<Contact />} />
          <Route path={"/"} element={<Home />} />
        </Routes>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
