import { useState } from 'react';
import Modal from '../Modal/Modal';
import './ListHeader.scss';

const ListHeader = ({listName, signOut}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="list-header"> 
      <h1>{listName}</h1>
      <div className="btn-container">
        <button className="create" onClick={()=>setShowModal(true)}>ADD NEW</button>
        <button className="signout" onClick={signOut}>SIGN OUT</button>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal}/>}
    </div>
  );
}
  
  export default ListHeader;