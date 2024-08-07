import { selector } from "recoil";
import { toDoList } from "../atoms/todo.atom";

export const sortedToDos = selector({
  key: "sortedToDos",
  get: ({ get }) => {
    const todos = get(toDoList);

    const notisCompletedToDos = [...todos].filter((todo) => !todo.isisCompleted);
    const isCompletedToDos = [...todos].filter((todo) => todo.isisCompleted);

    isCompletedToDos.sort((a, b) => (a.isCompletedId || 0) - (b.isCompletedId || 0));

    return [...notisCompletedToDos, ...isCompletedToDos];
  },
});
