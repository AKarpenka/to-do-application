import { useState } from "react";

const Modal = ({mode, setShowModal, getData, task}) => {
  const editMode = mode === "edit"? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : "nastya123@some.com",
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : "0",
    date: editMode ? task.date : new Date()
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/todos', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      if( response.status === 200) {
        console.log('worked');
        console.log(response);
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData(data => ({
      ...data,
      [name]: value
    }));

    console.log(data);
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
            onClick={editMode ? '' : postData}
          />
        </form>
      </div>
    </div>
  );
  }
  
  export default Modal;