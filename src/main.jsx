import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RoomProvider } from "./context";

console.log("App:", App);
console.log("BrowserRouter:", BrowserRouter);
console.log("RoomProvider:", RoomProvider);

const root = createRoot(document.getElementById("root"));

root.render(
  <RoomProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RoomProvider>
);
