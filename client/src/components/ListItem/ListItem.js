import ProgressBar from '../ProgressBar/ProgressBar';
import TickIcon from '../TickIcon/TickIcon';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import Modal from '../Modal/Modal';
import './ListItem.scss';

import { removeTask, tasksFetchingError, selectAll} from './ListItemSlice';

const ListItem = ({task, getData}) => {
  const [showModal, setShowModal] = useState(false);
  const {request} = useHttp();

  const tasks = useSelector(selectAll);
  const dispatch = useDispatch();

  const deleteToDo = async () => {
    const filteredTasks = tasks.filter(el => el.id !== task.id);
    request(`todos/${task.id}`, "DELETE")
      .then(() => dispatch(removeTask(filteredTasks)))
      .catch(() => dispatch(tasksFetchingError()))
  }

  return (
    <li className="list-item"> 
      <div className="info-container">
        <TickIcon/>
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress}/>
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