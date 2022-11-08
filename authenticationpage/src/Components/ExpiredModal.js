import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth:"500px",
    padding: "50px",
  },  
};


export const ExpiredModal = ({isOpen, onRequestClose,countDown}) => {  
  const onLogOffCall = () => {
    window.location.href = "/"
  }

  return (
    <div> 
      <Modal
        isOpen={isOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Session Timeout</h2>
       {countDown}
        <br/>
        <button className='btn btn-danger m-2' onClick={onLogOffCall}>Log out</button>
        <button className='btn btn-success m-2' onClick={onRequestClose}>Continue Session</button>
      </Modal>
    </div>  
  );
}

