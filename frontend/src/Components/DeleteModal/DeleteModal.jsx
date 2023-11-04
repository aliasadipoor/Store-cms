import React from 'react'
import ReactDOM from 'react-dom'
import './DeleteModal.css'

export default function DeleteModal({ submit, cancel ,title}) {


    return ReactDOM.createPortal(
        <div className="modal active "> {/* active */}
            <div className="delete-modal">
                <h1>{title}</h1>
                <div className="delete-modal-button">
                    <button className='delet-button delet-modal-acept-button' onClick={() => submit()}>بله</button>
                    <button className='delet-button delet-modal-reject-button' onClick={() => cancel()}>خیر</button>
                </div>
            </div>
        </div>
        , document.getElementById('modals')
    )
}
