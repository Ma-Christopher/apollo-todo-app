import React from "react";
import { gql, useQuery } from "@apollo/client";
import Todo from "./Todo";

const TODOS_QUERY = gql`
  {
    todos {
      id
      text
      completed
    }
  }
`;

const Todos = () => {
  const [testNum, setTestNum] = React.useState(0);
  const [testString, setTestString] = React.useState("string");
  const { loading, data, error } = useQuery(TODOS_QUERY);

  const increase = () => {
    setTestNum(testNum + 1);
  };

  const changeString = () => {
    const randomStr =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    setTestString(randomStr);
  };

  if (loading) return <p>loading...</p>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <>
      <h3>My Todos</h3>
      <ul>
        {data.todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
      <pre>
        <button onClick={increase}>Increase!</button>
        TodoList {testNum}
      </pre>
      <pre>
        <button onClick={changeString}>Change Me!</button>
        TodoList {testString}
      </pre>
    </>
  );
};

export default Todos;
