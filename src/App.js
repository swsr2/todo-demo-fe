import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import { useEffect, useState } from "react";
import api from "./utils/api";
import { Container, CssBaseline, Box } from "@mui/material";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        const response = await api.get("/user/me");
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ pt: 4, pb: 4 }}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute user={user}>
                <TodoPage setUser={setUser} user={user} />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/login"
            element={<LoginPage user={user} setUser={setUser} />}
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
