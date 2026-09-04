import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { TopBar } from "../components/TopBar";
import { FlowEditorPage } from "./pages/FlowEditorPage";
import { HomePage } from "./pages/HomePage";

function AppShell() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar />
      <main style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flow-editor" element={<FlowEditorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
