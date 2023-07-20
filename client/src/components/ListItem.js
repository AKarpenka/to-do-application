import ProgressBar from './ProgressBar';
import TickIcon from './TickIcon';
import {useState} from 'react';
import Modal from './Modal';

const ListItem = ({task, getData}) => {
  const [showModal, setShowModal] = useState(false);

  const deleteToDo = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: "DELETE"
      });
      if(response.status===200) {
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <li className="list-item"> 
      <div className="info-conteiner">
        <TickIcon/>
        <p className="task-title">{task.title}</p>
        <ProgressBar/>
      </div>

      <div className="btn-container">
        <button className="edit" onClick={()=> setShowModal(true)}>EDIT</button>
        <button className="delete" onClick={deleteToDo}>DELETE</button>
      </div>

      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task}/>}
    </li>
  );
}
  
  export default ListItem;