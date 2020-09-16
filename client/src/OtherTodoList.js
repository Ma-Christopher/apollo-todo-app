import React from "react";
import { gql, useQuery } from "@apollo/client";
import { visibilityFilterVar } from "./cache";

const TODOS_QUERY = gql`
  {
    visibilityFilter @client
    todos {
      id
      text
      completed
    }
  }
`;

const OtherTodoList = () => {
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
      <h3>OTHER TODO LIST COMPONENT</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <ul>
        {data.todos.map((todo) => (
          <p key={todo.id}>
            {todo.text} is {todo.completed ? "done" : "not done"}
          </p>
        ))}
      </ul>
      <pre>
        <button onClick={increase}>Increase!</button>
        OtherTodoList {testNum}
      </pre>
      <pre>
        <button onClick={changeString}>Change Me!</button>
        OtherTodoList {testString}
      </pre>
    </>
  );
};

export default OtherTodoList;
