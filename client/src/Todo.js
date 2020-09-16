import React from "react";
import { gql, useMutation } from "@apollo/client";

const COMPLETE_TODO = gql`
  mutation CompleteTodo($id: Int!) {
    completeTodo(id: $id) {
      todo {
        id
        text
        completed
      }
      success
      error {
        __typename
        ... on TodoNotFoundError {
          message
        }
        ... on TodoAlreadyCompletedError {
          message
        }
      }
    }
  }
`;

const Todo = ({ todo }) => {
  const [testNum, setTestNum] = React.useState(0);
  const [testString, setTestString] = React.useState("string");
  const [mutate, { data, error }] = useMutation(COMPLETE_TODO);

  const handleChange = () => {
    mutate({ variables: { id: todo.id } });
  };

  const increase = () => {
    setTestNum(testNum + 1);
  };

  const changeString = () => {
    const randomStr =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    setTestString(randomStr);
  };

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        id={`todo-${todo.id}`}
        onChange={handleChange}
      />
      <label htmlFor={`todo-${todo.id}`} className="sr-only">
        Mark Complete
      </label>
      {todo.text}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>
        <button onClick={increase}>Increase!</button>
        {testNum}
      </pre>
      <pre>
        <button onClick={changeString}>Change Me!</button>
        {testString}
      </pre>
    </li>
  );
};

export default Todo;
