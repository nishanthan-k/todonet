import { atom } from "recoil";

export const toDoList = atom({
  key: "toDoList",
  default: [
    // { task: "one", isCompleted: false, id: 1, completedId: null },
    // { task: "two", isCompleted: false, id: 2, completedId: null },
    // { task: "three", isCompleted: false, id: 3, completedId: null },
    // { task: "four", isCompleted: true, id: 4, completedId: null },
  ],
});
