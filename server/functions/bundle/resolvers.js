"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginationUtils_1 = require("./shared/utils/paginationUtils");
const resolvers = {
    Mutation: {
        completeTodo: async (_, { id }, context) => {
            const { todosRepo } = context;
            let todo;
            try {
                todo = await todosRepo.getTodoById(id);
            }
            catch (err) {
                return { success: false, error: { message: 'Todo not found' } };
            }
            if (todo.completed) {
                return { success: false, error: { message: 'Already completed this todo!' } };
            }
            await todosRepo.completeTodo(id);
            todo = await todosRepo.getTodoById(id);
            return { success: true, todo };
        },
        completeAllTodos: async (_, __, context) => {
            const { todosRepo } = context;
            await todosRepo.completeAllTodos();
            const todos = await todosRepo.getAllTodos();
            return { success: true, todos };
        },
        toggleTodo: async (_, { id }, context) => {
            const { todosRepo } = context;
            let todo;
            try {
                todo = await todosRepo.getTodoById(id);
            }
            catch (err) {
                return { success: false, error: { message: 'Todo not found' } };
            }
            todo.completed = !todo.completed;
            await todosRepo.save(todo);
            return { success: true, todo };
        }
    },
    Query: {
        todos: async (_, { after, before, first, last }, context) => {
            const { todosRepo } = context;
            const todos = await todosRepo.getAllTodos();
            let queryTodos = [];
            const limitResult = paginationUtils_1.PaginationUtils
                .limitByFirstAndLast(todos, first, last);
            if (limitResult.isFailure) {
                throw new Error(limitResult.error);
            }
            else {
                queryTodos = limitResult.getValue();
            }
            queryTodos = paginationUtils_1.PaginationUtils
                .filterByBeforeAndAfter(queryTodos, after, before);
            return queryTodos;
        },
        todo: async (_, { id }, context) => {
            const { todosRepo } = context;
            try {
                const todo = await todosRepo.getTodoById(id);
                return todo;
            }
            catch (err) {
                return { message: `Todo with id ${id} not found.` };
            }
        },
    },
    /**
     * This section below is mandatory for when we're using
     * unions. In order to better switch/handle which error
     * type we're using, we should enforce an error interface
     * containing some unique type name or code. This will
     * remove the need for us to switch based on the stringly-typed
     * error message. Not ideal.
     */
    TodoResult: {
        __resolveType(obj) {
            if (obj.hasOwnProperty('id')) {
                return 'Todo';
            }
            if (obj.hasOwnProperty('message')) {
                return 'TodoNotFoundError';
            }
            return null;
        },
    },
    CompleteTodoError: {
        __resolveType(obj) {
            if (obj.message === 'Already completed this todo!') {
                return 'TodoAlreadyCompletedError';
            }
            return 'TodoNotFoundError';
        },
    }
};
exports.resolvers = resolvers;
//# sourceMappingURL=resolvers.js.map