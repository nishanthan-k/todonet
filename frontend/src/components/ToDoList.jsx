import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Loader from "../global/loader/Loader";
import { todo } from '../utils/api/apiurls';
import axiosInstance from '../utils/api/axiosInstance';
import ToDoCard from "./ToDoCard";
import { toDoList } from '../store/atoms/todo.atom';

function ToDoList() {
  const [todos, setToDos] = useRecoilState(toDoList);
  const [isLoading, setIsLoading] = useState(true);
  const [currDisBtn, setCurrDisBtn] = useState('');

  const handleDeleteToDo = async (todo_id) => {
    console.log(todo_id)
    setCurrDisBtn('deleteBtn');
    try {
      const req = await axiosInstance.post(todo.deleteToDoApi, { todo_id });

      if (req.status >= 200 && req.status <= 300) {
        const { estatus, todos } = req.data;
        if (estatus) {
          setToDos(todos);
          setIsLoading(false);
          setCurrDisBtn('');
        } else {
          console.log('Check deleteToDo response');
          setIsLoading(false);
          setCurrDisBtn('');
        }
      }
    } catch (error) {
      console.log('Error in deleteToDo');
      setIsLoading(false);
    }
  }

  const handleCompleteToDo = async (todo_id) => {
    console.log(todo_id)
    setCurrDisBtn('completeBtn');
    try {
      const req = await axiosInstance.post(todo.completeToDoApi, { todo_id });

      if (req.status >= 200 && req.status <= 300) {
        const { estatus, todos } = req.data;

        if (estatus) {
          setToDos(todos);
          setIsLoading(false);
          setCurrDisBtn('');
        } else {
          console.log('Check completeToDo response');
          setIsLoading(false);
          setCurrDisBtn('');
        }
      }
    } catch (error) {
      console.log('Error in completeToDo');
      setIsLoading(false);
    }
  }

  const getToDos = async () => {
    try {
      const req = await axiosInstance.get(todo.getToDoApi);

      if (req.status >= 200 && req.status <= 300) {
        const { estatus, todos } = req.data;
        if (estatus) {
          setToDos(todos);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        console.log('Error in fetching todos');
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    getToDos();
  }, [])

  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : (
          <section className="grid grid-cols-1 gap-2">
            {todos.length > 0 ? (
              todos.map((todo, i) => (
                <ToDoCard
                  key={i}
                  todo={todo}
                  handleCompleteToDo={handleCompleteToDo}
                  handleDeleteToDo={handleDeleteToDo}
                  currDisBtn={currDisBtn}
                />
              ))
            ) : (
              <p className="text-white text-xl text-center">No todos found!</p>
            )}
          </section>
        )
      }
    </>
  )
}

export default ToDoList;

ToDoList.propTypes = {
  loading: PropTypes.bool.isRequired, 
}