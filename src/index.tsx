import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import SwapPage from "./pages/SwapPage";
import WalletPageRefactor from "./pages/WalletPageRefactor";
// import SumN from "./pages/SumN";
{
  /* <SumN /> */
}

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <SwapPage />
      <WalletPageRefactor />
    </StyledEngineProvider>
  </React.StrictMode>
);
