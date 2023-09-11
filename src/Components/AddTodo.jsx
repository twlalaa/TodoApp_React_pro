// Hooks
import { useRef } from "react";

//Supabase
import supabase from "../supabase";

//Router
import { useHistory } from "react-router-dom";

const AddTodo = (props) => {
  const contentRef = useRef();
  const importanceRef = useRef();
  const { replace } = useHistory();

  const sendTodo = async (e) => {
    e.preventDefault();

    if (!contentRef.current.value || !importanceRef.current.value) {
      return;
    }

    const { data, error } = await supabase
      .from("Todos")
      .insert({
        content: contentRef.current.value,
        importance: importanceRef.current.value,
        userId: props.user.id,
      })
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);

      replace("/");

      contentRef.current.value = "";
      importanceRef.current.value = "";
    }
  };

  return (
    <div className="mx-auto rounded-lg p-5 w-3/4 bg-dark">
      <h1 className="text-2xl mb-2 text-center">Add New Todo</h1>
      <form onSubmit={sendTodo} className=" w-1/2 mx-auto ">
        <div className="flex flex-col mb-2">
          <label htmlFor="content" className="mb-2">
            Content
          </label>
          <input
            ref={contentRef}
            type="text"
            id="content"
            className="p-2 text-dark focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="importance" className="mb-2">
            Importance Level (Higher is more important)
          </label>
          <input
            ref={importanceRef}
            type="number"
            id="content"
            min={1}
            max={10}
            className="p-2 text-dark focus:outline-none"
          />
        </div>
        <button className="mt-2 bg-white p-2 rounded border border-white hover:bg-dark hover:text-white text-dark transition-all duration-200">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
