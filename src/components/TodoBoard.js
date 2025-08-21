import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { List, TextField, Button, Box, Typography, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";

const TodoBoard = ({ user, todoList, addTask, deleteItem, toggleComplete }) => {
  const [todoValue, setTodoValue] = useState("");

  const handleAdd = () => {
    if (todoValue.trim() !== "") {
      addTask(todoValue);
      setTodoValue("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const userTasks = todoList.filter((item) => item.author?._id === user?._id);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Todo List
      </Typography>
      <Box sx={{ display: "flex", mb: 4 }}>
        <TextField
          fullWidth
          label={user ? "새로운 할 일을 입력하세요" : "로그인 후 이용해주세요"}
          variant="outlined"
          value={todoValue}
          onChange={(event) => setTodoValue(event.target.value)}
          onKeyPress={handleKeyPress}
          sx={{ bgcolor: "background.paper" }}
          disabled={!user}
        />
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{ ml: 2, whiteSpace: "nowrap" }}
          startIcon={<AddIcon />}
          disabled={!user}
        >
          추가
        </Button>
      </Box>

      {user ? (
        userTasks.length > 0 ? (
          <List>
            {userTasks.map((item) => (
              <TodoItem
                key={item._id}
                item={item}
                deleteItem={deleteItem}
                toggleComplete={toggleComplete}
              />
            ))}
          </List>
        ) : (
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mt: 4 }}
          >
            아직 등록된 할 일이 없습니다. 첫 번째 할 일을 추가해보세요!
          </Typography>
        )
      ) : (
        <Box textAlign="center" sx={{ mt: 8 }}>
          <Typography variant="h6" gutterBottom>
            로그인하고 나만의 할 일을 관리해보세요!
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 2 }}
          >
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              color="primary"
            >
              로그인
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              variant="outlined"
            >
              회원가입
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default TodoBoard;