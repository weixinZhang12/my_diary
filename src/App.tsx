import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import './theme/variables.css'
import ThemeView from "./pages/Setting/SettingView/ThemeView";
import Setting from "./pages/Setting";
import LanguageView from "./pages/Setting/SettingView/LanguageView";

function App() {
  
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/language" element={<LanguageView />} />
        <Route path="/theme" element={<ThemeView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
