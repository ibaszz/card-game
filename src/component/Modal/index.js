import React from 'react';
import './Modal.css';

const Modal = (props) => {
    return (
        <div id="myModal" class="modal" style={{display: props.result ? 'block' : 'none'}}>
            <div class="modal-content">
                <span class="close" onClick={props.onClose}>&times;</span>
                <p>{props.result}</p>
            </div>
        </div>
    )
}

export default Modal