import { useState } from "react";
import { useCookies } from "react-cookie";
import Spinner from "../Spinner/Spinner";
import './Modal.scss';

const Modal = ({mode, setShowModal, getData, task}) => {
  const editMode = mode === "edit"? true : false;
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : "0",
    date: editMode ? task.date : new Date()
  });

  const postData = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      if( response.status === 200) {
        setLoading(false);
        setShowModal(false);
        getData();
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  const editData = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data) 
      });
      if( response.status === 200) {
        setLoading(false);
        setShowModal(false);
        getData();
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
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
      {loading && <Spinner/>}
    </div>
  );
  }
  
  export default Modal;