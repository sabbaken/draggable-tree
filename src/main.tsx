import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import DraggableTree from "./pages/draggableTree.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DraggableTree />
  </React.StrictMode>,
);
