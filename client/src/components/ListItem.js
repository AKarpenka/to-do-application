import ProgressBar from './ProgressBar';
import TickIcon from './TickIcon';

const ListItem = ({task}) => {
    return (
      <li className="list-item"> 
        <div className="info-conteiner">
          <TickIcon/>
          <p className="task-title">{task.title}</p>
          <ProgressBar/>
        </div>

        <div className="btn-container">
          <button className="edit">EDIT</button>
          <button className="delete">DELETE</button>
        </div>
      </li>
    );
  }
  
  export default ListItem;