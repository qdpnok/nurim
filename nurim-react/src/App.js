import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./page/Layout";
import HOME from "./page/Home";
import LogIn from "./page/Login";
import SignUp from "./page/SignUp";
import "./App.css";
import { AuthProvider } from "./page/AuthContext";
// 깃 테스트용.

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HOME />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
