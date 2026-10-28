import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./example.css";

export const GetTodo = () => {
  const [id, SetId] = useState(1);
  const [data, SetData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data1 = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );
      const resData = await data1.json();
      SetData(resData);
      console.log("Data:", resData);
    })();
  }, [id]);

  return (
    <div className="example-page">
    <Link className="page-link" to="/counter" >Counter</Link>
      {data == null ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="todo-card">
          {" "}
          <h1 className="todo-text">{data.body}</h1>
          <button
            className="next-btn"
            onClick={() => {
              SetData(null);
              SetId(id + 1);
            }}
          >
            Increament
          </button>
        </div>
      )}
    </div>
  );
};
