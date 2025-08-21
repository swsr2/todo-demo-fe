import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const TodoPage = ({ user, setUser }) => {
  const [todoList, setTodoList] = useState([]);
  const navigate = useNavigate();

  const getTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTodoList(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await api.post("/tasks", {
        task,
        isComplete: false,
      });
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const response = await api.put(`/tasks/${id}`, {
        isComplete: !task.isComplete,
      });
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            안녕하세요, {user?.name || '사용자'}님!
          </Typography>
          <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>
            로그아웃
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        <TodoBoard
          user={user}
          todoList={todoList}
          addTask={addTask}
          deleteItem={deleteItem}
          toggleComplete={toggleComplete}
        />
      </Container>
    </Box>
  );
};

export default TodoPage;