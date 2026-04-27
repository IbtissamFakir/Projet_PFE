import { Routes, Route } from "react-router-dom";

import Page from "./Admin/Page";
import Layout from "./Layout/Layout";
import Dashboard from "./Admin/Dashboard";
import AjouterStagiaires from "./Admin/AjouterStagiaires";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page />} />

      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inscription" element={<AjouterStagiaires />} />
      </Route>
    </Routes>
  );
}

export default App;