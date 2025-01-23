import React from "react";
import TodoItem from './TodoItem'

const TodoBoard = ({ todoList, deleteItem, toggleComplete }) => {
  return (
    <div>

      <h2>Todo List</h2>
      {todoList.length > 0 ? todoList.map((item, index) => <TodoItem key={index} item={item} deleteItem={deleteItem} toggleComplete={toggleComplete} />) : <h2>There is no Item to show</h2>}
    </div>
  );
};

export default TodoBoard;
