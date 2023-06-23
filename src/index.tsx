import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import NavBar from "./components/NavBar";
import RevieworResults from "./components/RevieworResults";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/review" element={<RevieworResults />} />
          <Route path="/results" element={<RevieworResults />} />
          <Route path="/" element={<App />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
