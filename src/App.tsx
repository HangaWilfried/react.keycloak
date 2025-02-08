import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import DefaultLayout from "./layouts/layout.default";

import { AuthProvider } from "./context/session";
import { BrowserRouter, Route, Routes } from "react-router"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="welcome" element={<Welcome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>  
  );
}

export default App
