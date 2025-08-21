import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { List, TextField, Button, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Todo List
      </Typography>
      <Box sx={{ display: "flex", mb: 4 }}>
        <TextField
          fullWidth
          label="새로운 할 일을 입력하세요"
          variant="outlined"
          value={todoValue}
          onChange={(event) => setTodoValue(event.target.value)}
          onKeyPress={handleKeyPress}
          sx={{ bgcolor: "background.paper" }} // To make input field white
        />
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{ ml: 2, whiteSpace: "nowrap" }}
          startIcon={<AddIcon />}
        >
          추가
        </Button>
      </Box>

      {todoList.length > 0 ? (
        <List>
          {todoList
            .filter((item) => item.author?._id === user?._id)
            .map((item) => (
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
      )}
    </Box>
  );
};

export default TodoBoard;
