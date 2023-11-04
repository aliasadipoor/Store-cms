import React, { useEffect } from 'react'
import './EditModal.css'
export default function EditModal({ children, close, submit }) {
    useEffect(() => {
        const closeDetails = (event) => {

            if (event.keyCode === 27) {
                close()
            }
        }
        window.addEventListener('keydown', closeDetails)
        return () => window.removeEventListener('keydown', closeDetails)

    })
    return (
        <>
            <div className="modal active">
                <form className='edit-modal-form'>
                    <h1>اطلاعات جدید را وارد کنید</h1>
                    {children}
                    <button className='edit-modal-form-submit' onClick={submit}>ثبت اطلاعات جدید</button>
                </form>
            </div>
        </>
    )
}
