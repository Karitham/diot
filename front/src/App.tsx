import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FrameComponent from "./pages/FrameComponent";
import MagnifyingGlass from "./pages/MagnifyingGlass";
import Dashboard1 from "./pages/Dashboard1";
import Notifications from "./pages/Notifications";
import Cross from "./pages/Cross";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/dashboard1":
        title = "";
        metaDescription = "";
        break;
      case "/frame-1":
        title = "";
        metaDescription = "";
        break;
      case "/magnifyingglass":
        title = "";
        metaDescription = "";
        break;
      case "/dashboard":
        title = "";
        metaDescription = "";
        break;
      case "/notifications":
        title = "";
        metaDescription = "";
        break;
      case "/cross":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard1" element={<Dashboard />} />
      <Route path="/frame-1" element={<FrameComponent />} />
      <Route path="/magnifyingglass" element={<MagnifyingGlass />} />
      <Route path="/dashboard" element={<Dashboard1 />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/cross" element={<Cross />} />
    </Routes>
  );
}
export default App;
