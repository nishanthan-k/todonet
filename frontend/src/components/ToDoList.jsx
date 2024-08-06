import PropTypes from 'prop-types';
import { useRecoilStateLoadable, useRecoilValue } from "recoil";
import useSetLocalStorage from "../hooks/useSetLocalStorage";
import { toDoList } from "../store/atoms/todo.atom";
import { sortedToDos } from "../store/selectors/todo.selector";
import ToDoCard from "./ToDoCard";
import Loader from "../global/loader/Loader";

function ToDoList({ loading }) {
  const [toDosLoadable, setToDos] = useRecoilStateLoadable(toDoList);
  const sortedToDo = useRecoilValue(sortedToDos);
  const setLS = useSetLocalStorage();

  const handleDeleteTask = (id) => {
    const updatedToDos = toDosLoadable.contents.filter(
      (todo) => todo.id !== id
    );
    setToDos(updatedToDos);
    setLS("todos", updatedToDos);
  };

  const handleTaskCheck = (id) => {
    const updatedToDos = toDosLoadable.contents.map((todo) =>
      todo.id === id
        ? {
          ...todo,
          isCompleted: !todo.isCompleted,
          completedId: !todo.isCompleted
            ? toDosLoadable.contents.filter((n) => n?.completedId).length + 1
            : null,
        }
        : todo
    );

    setToDos(updatedToDos);
    setLS("todos", updatedToDos);
  };

  return loading ? (
    <Loader />
  ) : (
    <section className="grid grid-cols-1 gap-2">
      {sortedToDo.length > 0 ? (
        sortedToDo.map((todo, i) => (
          <ToDoCard
            key={i}
            todo={todo}
            handleDeleteTask={handleDeleteTask}
            handleTaskCheck={handleTaskCheck}
          />
        ))
      ) : (
        <p className="text-white text-xl text-center">No todos found!</p>
      )}
    </section>
  );
}

export default ToDoList;

ToDoList.propTypes = {
  loading: PropTypes.bool.isRequired, 
}