import { selector } from "recoil";
import { toDoList } from "../atoms/todo.atom";

export const sortedToDos = selector({
  key: "sortedToDos",
  get: ({ get }) => {
    const todos = get(toDoList);

    const notCompletedToDos = [...todos].filter((todo) => !todo.isCompleted);
    const completedToDos = [...todos].filter((todo) => todo.isCompleted);

    completedToDos.sort((a, b) => (a.completedId || 0) - (b.completedId || 0));

    return [...notCompletedToDos, ...completedToDos];
  },
});
