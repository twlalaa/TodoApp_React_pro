// Hooks
import { useRef, useEffect } from "react";

//Supabase
import supabase from "../supabase";

//Router
import { useHistory, useParams } from "react-router-dom";
import { complex } from "framer-motion";

const EditTodo = (props) => {
  const contentRef = useRef();
  const importanceRef = useRef();
  const { replace } = useHistory();

  const params = useParams();
  console.log(params.id);

  const getTodo = async () => {
    const { data, error } = await supabase
      .from("Todos")
      .select("*")
      .eq("id", params.id);

    if (data) {
      contentRef.current.value = data[0].content;
      importanceRef.current.value = data[0].importance;
    }
  };

  const editTodo = async (e) => {
    e.preventDefault();

    if (!contentRef.current.value || !importanceRef.current.value) {
      return;
    }

    const { data, error } = await supabase
      .from("Todos")
      .update({
        content: contentRef.current.value,
        importance: importanceRef.current.value,
        userId: props.user.userId,
      })
      .eq("id", params.id)
      .select();

    if (data) {
      replace("/");
    }
  };

  useEffect(() => {
    getTodo();
  }, []);
  return (
    <div className="mx-auto rounded-lg p-5 w-3/4 bg-dark">
      <h1 className="text-2xl mb-2 text-center">Edit Todo</h1>
      <form className=" w-1/2 mx-auto ">
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
        <button
          onClick={editTodo}
          className="mt-2 bg-white p-2 rounded border border-white hover:bg-dark hover:text-white text-dark transition-all duration-200"
        >
          Done
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
