import { useState } from "react";
import { useCookies } from "react-cookie";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import {v4 as uuidv4} from 'uuid';
import Spinner from "../Spinner/Spinner";
import './Modal.scss';

import {
  tasksFetching,
  addTask,
  editTask,
  tasksFetchingError,
  selectAll
} from '../ListItem/ListItemSlice';

const Modal = ({mode, setShowModal, task}) => {
  const editMode = mode === "edit"? true : false;
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const tasksLoadingStatus = useSelector(selectAll);
  const {request} = useHttp();

  const dispatch = useDispatch();

  const [data, setData] = useState({
    id: editMode ? task.id : uuidv4(),
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : "0",
    date: editMode ? task.date : new Date()
  });

  const postData = async (e) => {
    dispatch(tasksFetching());
    e.preventDefault();
    request('todos', "POST", JSON.stringify(data))
      .then(() => {
        dispatch(addTask(data));
        setShowModal(false);
      })
      .catch(() => dispatch(tasksFetchingError()))
  }

  const editData = async (e) => {
    dispatch(tasksFetching());
    e.preventDefault();
    request(`todos/${task.id}`, "PUT", JSON.stringify(data))
      .then(() => {
        dispatch(editTask({id: task.id, changes: data}));
        setShowModal(false);
      })
      .catch(() => dispatch(tasksFetchingError()))
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData(data => ({
      ...data,
      [name]: value
    }));
  }

  return (
    <div className="overlay"> 
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input 
            type="text" 
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />

          <br />

          <label htmlFor="range">Drag to select your current progress</label>
          <input 
            id="range"
            type="range" 
            required
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />

          <input 
            type="submit" 
            value={"submit"}
            className={mode}
            onClick={editMode ? editData : postData}
          />
        </form>

      </div>
      {tasksLoadingStatus === 'loading' && <Spinner/>}
    </div>
  );
  }
  
  export default Modal;