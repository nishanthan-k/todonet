import React from 'react'
import ToDoList from '../components/ToDoList';
import UserProfile from '../components/UserProfile';
import AddNewToDo from '../components/AddNewToDo';

export default function ToDoScreen() {
  return (
    <main className="w-screen h-dvh overflow-auto no-scrollbar bg-slate-800 flex flex-col items-center gap-4 md:gap-10 px-4 pt-4 pb-10 md:pt-10 relative">
      <UserProfile />
      <section className="max-w-xl w-full flex flex-col gap-10 md:mt-4">
        <AddNewToDo />
        <ToDoList />
      </section>
    </main>
  );
}
