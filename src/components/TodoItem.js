import React from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const TodoItem = ({ item, deleteItem, toggleComplete }) => {
  return (
    <Paper elevation={2} sx={{ mb: 2 }}>
      <ListItem
        sx={{ p: 1.5 }}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deleteItem(item._id)}
          >
            <DeleteIcon />
          </IconButton>
        }
        disablePadding
      >
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleOutlineIcon />}
          checked={item.isComplete}
          tabIndex={-1}
          disableRipple
          onChange={() => toggleComplete(item._id)}
        />
        <ListItemText
          primary={item.task}
          sx={{
            textDecoration: item.isComplete ? "line-through" : "none",
            color: item.isComplete ? "text.disabled" : "text.primary",
          }}
        />
      </ListItem>
    </Paper>
  );
};

export default TodoItem;
