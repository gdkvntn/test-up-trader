import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

import "./scss/main.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/:id" element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default App;
