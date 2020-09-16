"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
  type Todo {
    id: Int!
    text: String! 
    completed: Boolean!
  }

  type TodoNotFoundError {
    message: String!
  }

  union TodoResult = Todo | TodoNotFoundError

  type Query {
    todos (
      after: String, 
      before: String, 
      first: Int, 
      last: Int
    ): [Todo]!

    todo (id: Int!): TodoResult!
  }

  type TodoAlreadyCompletedError {
    message: String!
  }

  union CompleteTodoError = TodoNotFoundError | TodoAlreadyCompletedError

  type CompleteTodoResult {
    success: Boolean!
    todo: Todo
    error: CompleteTodoError
  }

  type TodoValidationError {
    message: String!
  }

  type ClearCompletedTodosResult {
    success: Boolean!
    todos: [Todo]!
  }

  type CompleteAllTodosResult {
    success: Boolean!
    todos: [Todo]!
  }

  type ToggleTodoResult {
    success: Boolean!
    todo: Todo 
    error: TodoNotFoundError
  }

  type Mutation {
    completeTodo (id: Int!): CompleteTodoResult!
    completeAllTodos: CompleteAllTodosResult!
    toggleTodo (id: Int!): ToggleTodoResult!
  }
`;
exports.typeDefs = typeDefs;
//# sourceMappingURL=schema.js.map