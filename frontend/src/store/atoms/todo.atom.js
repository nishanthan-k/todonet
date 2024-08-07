import { atom } from "recoil";

export const toDoList = atom({
  key: "toDoList",
  default: [
    // { task: "one", isisCompleted: false, id: 1, isCompletedId: null },
    // { task: "two", isisCompleted: false, id: 2, isCompletedId: null },
    // { task: "three", isisCompleted: false, id: 3, isCompletedId: null },
    // { task: "four", isisCompleted: true, id: 4, isCompletedId: null },
  ],
});
