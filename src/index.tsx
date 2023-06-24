import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import ContextProvider from "./context/Context";
import "semantic-ui-css/semantic.min.css";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
