import React from "react";
import { data } from "./data";

const Todo = () => {
  const [todos, setTodos] = React.useState(data);
  const receivedUpdateFromChild = (todo, index) => {
    const newTodos = todos;
    todos[index] = todo;
    setTodos([...newTodos]);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="text-2xl">Toppings</h1>
        {todos.map((todo, index) => (
          <TodoNode
            key={todo.id}
            todo={todo}
            sendUpdateToParent={receivedUpdateFromChild}
            nodeIndex={index}
          />
        ))}
      </div>
    </div>
  );
};

const TodoNode = ({ todo, sendUpdateToParent, nodeIndex }) => {
  const handleClick = () => {
    todo.isChecked = todo.isChecked ? !todo.isChecked : true;
    sendUpdateToParent(todo, nodeIndex);
  };

  const receivedUpdateFromChild = (child, childIndex) => {
    todo.todos[childIndex] = child;
    sendUpdateToParent(todo, nodeIndex);
  };

  return (
    <div className="ml-12">
      {todo.isChecked && <span>CHECKED</span>}
      <span onClick={handleClick}>{`${nodeIndex} ${todo.name}`}</span>
      {(todo.todos ?? []).map((todo, index) => (
        <TodoNode
          key={todo.id}
          todo={todo}
          nodeIndex={index}
          sendUpdateToParent={receivedUpdateFromChild}
        />
      ))}
    </div>
  );
};

export default Todo;
