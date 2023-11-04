import React, { useEffect, useState } from 'react'
import ErrorBox from '../ErrorBox/ErrorBox'
import './Comments.css'
import DetailsModal from '../DetailsModal/DetailsModal'
import DeleteModal from '../DeleteModal/DeleteModal'
import EditModal from '../EditModal/EditModal'
export default function Comments() {
  const [allComments, setAllComments] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [commentBody, setCommentBody] = useState('')
  const [commentID, setCommentID] = useState(null)

  const getAllComments = () => {
    fetch("http://localhost:8000/api/comments").then(response => response.json()).then(comments => setAllComments(comments))
  }

  useEffect(() => {
    getAllComments()
  }, [])

  const closeDetailModal = () => {
    setShowDetailsModal(false)
  }
  const cancelDeleteModal = () => {

    setShowDeleteModal(false)
    console.log("کنسل شد");
  }
  const closeEditModal = () => {
    setShowEditModal(false)
    console.log("کنسل شد");
  }
  const closeAcceptModal = () => {
    setShowAcceptModal(false)
    console.log("تایید نشد");
  }
  const closeRejectModal = () => {
    setShowRejectModal(false)
    console.log("تایید نشد");
  }
  const submitRejectModal = () => {
    fetch(`http://localhost:8000/api/comments/reject/${commentID}`, {
      method: 'POST'
    }).then(res => res.json()).then(result => {
      setShowRejectModal(false)
      getAllComments()
    })
    console.log("تایید نشد");
  }

  const submitAcceptModal = () => {
    fetch(`http://localhost:8000/api/comments/accept/${commentID}`, {
      method: 'POST',
    }).then((res) => res.json())
      .then((result) => {
        setShowAcceptModal(false);
        getAllComments();
        console.log(result);
      });

    console.log("تایید شد");
  }

  const submitEditModal = (event) => {
    event.preventDefault()
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: commentBody
      })
    }).then(response => response.json()).then(result => {
      setShowEditModal(false)
      console.log(result)
      getAllComments()
    })
    console.log("ویرایش  شد")

  }

  const submitDeleteModal = () => {
    console.log("حذف شد");
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: 'DELETE'
    }).then(response => response.json()).then(comment => {
      setShowDeleteModal(false)
      getAllComments()
    })
  }
  return (
    <>
      <h1 className='comment-title'>لیست کامنت ها</h1>
      {allComments.length ? (
        <table className="comment-table">
          <thead>
            <tr>
              <th>اسم کاربر</th>
              <th>محصول</th>
              <th>کامنت</th>
              <th>تاریخ</th>
              <th>ساعت</th>
            </tr>
          </thead>

          <tbody>
            {allComments.map(comment => (
              <tr key={comment.id}>
                <td>{comment.userID}</td>
                <td>{comment.productID}</td>
                <td>
                  <button
                    onClick={() => {
                      setCommentBody(comment.body)
                      setShowDetailsModal(true)
                    }}
                  >دیدن متن</button>
                </td>
                <td>{comment.date}</td>
                <td>{comment.hour}</td>
                <td>
                  <button
                    onClick={() => {
                      setShowDeleteModal(true)
                      setCommentID(comment.id)
                    }}>حذف</button>
                  <button
                    onClick={() => {
                      setShowEditModal(true)
                      setCommentBody(comment.body)
                      setCommentID(comment.id)
                    }}
                  >ویرایش
                  </button>
                  <button>پاسخ</button>
                  {comment.isAccept === 0 ? (
                    <button
                      onClick={() => {
                        setShowAcceptModal(true)
                        setCommentID(comment.id)
                      }}
                    >تایید</button>
                  ) :
                    (
                      <button
                        onClick={() => {
                          setShowRejectModal(true)
                          setCommentID(comment.id)
                        }}
                      >رد
                      </button>
                    )
                  }

                </td>
              </tr>
            ))}

          </tbody>
        </table >) : (
        <ErrorBox msg="هیچ کامنتی یافت نشد" />)
      }

      {
        showDetailsModal && (
          <DetailsModal
            onHide={closeDetailModal}
          >
            <p className="modal-text">
              {commentBody}
              <button className='modal-text-close' onClick={closeDetailModal}>بستن </button>
            </p>
          </DetailsModal>
        )
      }
      {
        showDeleteModal && (
          <DeleteModal
            title={"آیا از حذف اطمینان دارید؟"}
            cancel={cancelDeleteModal}
            submit={submitDeleteModal}
          />
        )
      }
      {
        showEditModal && (
          <EditModal
            close={closeEditModal}
            submit={submitEditModal}
          >
            <textarea
              value={commentBody}
              onChange={event => setCommentBody(event.target.value)}
            >
              {commentBody}
            </textarea>
          </EditModal>
        )
      }

      {
        showAcceptModal && (
          <DeleteModal
            title={"آیا از تایید اطمینان دارید"}
            cancel={closeAcceptModal}
            submit={submitAcceptModal}
          />
        )
      }
      {
        showRejectModal && (
          <DeleteModal
            title={"آیا از رد اطمینان دارید"}
            cancel={closeRejectModal}
            submit={submitRejectModal}
          />
        )
      }


    </>
  )
}
