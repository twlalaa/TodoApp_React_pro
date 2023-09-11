import React from "react";

import Todos from "../Components/Todos";

const Home = ({ user, getTodos, todos, deleteTodo }) => {
  return (
    <Todos
      deleteTodo={deleteTodo}
      user={user}
      getTodos={getTodos}
      todos={todos}
    />
  );
};

export default Home;
