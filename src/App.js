import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import { useEffect, useState } from "react";
import api from "./utils/api";

function App() {
  // 간단한 과제이므로 리덕스 대신 부모에 만들자.
  const [user, setUser] = useState(null)

  // 유저(토큰으로) 확인 - 백엔드랑 연결
  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem('token');
      if (storedToken) {
        const response = await api.get('/user/me')
        setUser(response.data.user)
      }
    } catch (error) {
      setUser(null)
    }
  }
  useEffect(() => {
    getUser()
  }, [])
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute user={user}><TodoPage setUser={setUser} /></PrivateRoute>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
    </Routes>
  );
}

export default App;
