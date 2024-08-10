import { atom } from "recoil";

export const toDoList = atom({
  key: "toDoList",
  default: [
    // { task: "one", isCompleted: false, id: 1, isCompletedId: null },
    // { task: "two", isCompleted: false, id: 2, isCompletedId: null },
    // { task: "three", isCompleted: false, id: 3, isCompletedId: null },
    // { task: "four", isCompleted: true, id: 4, isCompletedId: null },
  ],
});

export const userAtom = atom({
  key: 'userAtom',
  default: ''
})

export const tokenAtom = atom({
  key: 'tokenAtom',
  default: ''
})
