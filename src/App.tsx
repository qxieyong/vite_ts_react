import React from "react";
import routes from "@/router/index.jsx";
import "./App.css";

import { useRoutes } from "react-router-dom";

function App() {
  const element = useRoutes(routes);
  return <div>{element}</div>;
}

export default App;
