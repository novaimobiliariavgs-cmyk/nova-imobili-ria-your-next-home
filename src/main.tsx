import { createRoot } from "react-dom/client";
import { hydrate, type DehydratedState } from "@tanstack/react-query";
import App from "./App.tsx";
import { queryClient } from "./lib/queryClient";
import "./index.css";

declare global {
  interface Window {
    __RQ_STATE__?: DehydratedState;
  }
}

// Páginas pré-renderizadas trazem os imóveis já carregados: evita tela de "carregando".
if (window.__RQ_STATE__) {
  hydrate(queryClient, window.__RQ_STATE__);
}

createRoot(document.getElementById("root")!).render(<App />);
