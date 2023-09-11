// Icons
import DeleteIcon from "../Icons/DeleteIcon";
import EditIcon from "../Icons/EditIcon";

//Supabase
import supabase from "../supabase";

//Hooks
import { useEffect } from "react";

//Roter
import { Link } from "react-router-dom";

const Todos = (props) => {
  const fetchTodos = async () => {
    if (!props.user) {
      return;
    }

    const { data, error } = await supabase
      .from("Todos")
      .select("*")
      .eq("userId", props.user.id);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      props.getTodos(data);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="w-3/4 bg-dark p-5 rounded-lg mx-auto">
      <h1 className="text-center text-2xl mb-5">Your tasks</h1>
      {!props.todos.length && (
        <p className="text-red-500 text-center text-lg">
          There is nothing to show
        </p>
      )}
      <ul className="bg-dark">
        {props.todos
          .slice()
          .reverse()
          .map((todo) => {
            return (
              <li
                key={todo.id}
                className="flex bg-slate-500 cursor-pointer hover:bg-slate-700 transition-all duration-200 items-center justify-between p-2 rounded mb-2"
              >
                <p>{todo.content}</p>
                <div className="flex gap-2">
                  <Link to={`/edit/${todo.id}`}>
                    <button className="p-2 rounded hover:bg-dark transition-all duration-200">
                      <EditIcon />
                    </button>
                  </Link>
                  <button
                    onClick={props.deleteTodo.bind(null, todo.id)}
                    className="p-2 rounded hover:bg-dark transition-all duration-200"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Todos;
