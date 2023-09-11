//Components
import Container from "./Components/Container";
import Header from "./Components/Header";

//Pages
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Add from "./Pages/Add";
import Home from "./Pages/Home";
import Edit from "./Pages/Edit";

//Router
import { Route, Switch, useHistory } from "react-router-dom";

//Hooks
import { useState } from "react";

//Framer Motion
import { motion } from "framer-motion";
import supabase from "./supabase";

const App = () => {
  const [user, setUser] = useState(null);

  const [todos, setTodos] = useState([]);

  const history = useHistory();

  if (!user) {
    history.replace("/sign-in");
  }

  const getUser = (data) => {
    setUser(data);
  };

  const getTodos = (data) => {
    setTodos(data);
    console.log(data);
  };

  const deleteTodo = async (id) => {
    const { data, error } = await supabase
      .from("Todos")
      .delete()
      .eq("id", id)
      .select();

    console.log(data);

    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <Container>
      <Header user={user} getUser={getUser} getTodos={getTodos} />
      <Switch>
        <Route path="/sign-in">
          <motion.div
            initial={{
              x: "-200px",
            }}
            animate={{
              x: 0,
              transition: {
                type: "spring",
              },
            }}
          >
            <SignIn getUser={getUser} />
          </motion.div>
        </Route>
        <Route path="/sign-up">
          <motion.div
            initial={{
              x: "-200px",
            }}
            animate={{
              x: 0,
              transition: {
                type: "spring",
              },
            }}
          >
            <SignUp getUser={getUser} />
          </motion.div>
        </Route>
        <Route path="/add">
          <Add user={user} />
        </Route>
        <Route path="/edit/:id">
          <Edit user={user} />
        </Route>
        <Route path="/">
          <Home
            user={user}
            getTodos={getTodos}
            todos={todos}
            deleteTodo={deleteTodo}
          />
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
