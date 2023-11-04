import React, { useEffect } from 'react'
import './DetailsModal.css'
export default function DetailsModal({ onHide, children }) {
    useEffect(() => {
        const closeDetails = (event) => {

            if (event.keyCode === 27) {
                onHide()
            }
        }
        window.addEventListener('keydown', closeDetails)
        return () => window.removeEventListener('keydown', closeDetails)

    })

    return (
        <>
            <div className="modal active">
                <div className="details-modal  ">
                    {children}
                </div>
            </div>
        </>
    )
}
