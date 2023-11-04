import React, { useEffect, useState } from 'react'
import ErrorBox from '../ErrorBox/ErrorBox'
import "./Users.css"
import DeleteModal from '../DeleteModal/DeleteModal'
import EditModal from '../EditModal/EditModal'
import { BsCurrencyDollar } from 'react-icons/bs'
import DetailsModal from '../DetailsModal/DetailsModal'

export default function Users() {
  const [users, setUsers] = useState([])
  const [userID, setUserID] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [detailsUser, setDetailsUser] = useState({})

  const [newFirstName, setnewFirstName] = useState('')
  const [newLastName, setnewLastName] = useState('')
  const [newUsername, setnewUsername] = useState('')
  const [newPassword, setnewPassword] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newcity, setNewCity] = useState('')
  const [newEmail, setNewEail] = useState('')
  const [newAddress, setNewAddress] = useState('')
  const [newScore, setNewScore] = useState('')
  const [newBuy, setNewBuy] = useState('')
  useEffect(() => {
    getAllUsers()
  }, [])

  const getAllUsers = () => {
    fetch("http://localhost:8000/api/users/").then(res => res.json().then(users => setUsers(users)))
  }

  const cancelDeleteModal = () => {
    setShowDeleteModal(false)
    console.log("کاربر حذف نشد ");
  }
  const colseEditModal = () => {
    setShowEditModal(false)
  }
  const closeDetailsModal = () => {
    setShowDetailsModal(false)
  }


  const submitEditModal = (event) => {
    event.preventDefault()
    const newUserInfo = {
      firsname: newFirstName,
      lastname: newLastName,
      username: newUsername,
      password: newPassword,
      phone: newPhone,
      city: newcity,
      email: newEmail,
      address: newAddress,
      score: newScore,
      buy: newBuy
    }
    fetch(`http://localhost:8000/api/users/${userID}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserInfo)
    }).then(response => response.json()).then(result => {
      setShowEditModal(false)
      console.log(result)
      getAllUsers()
    })
    console.log("ویرایش شد");

  }

  const submitDeleteModal = () => {
    console.log("کاربر حذف شد");
    fetch(`http://localhost:8000/api/users/${userID}`, {
      method: "DELETE"
    }).then(response => console.log(response)).then(result => {
      setShowDeleteModal(false)
      getAllUsers()

    })
  }


  return (
    <>
      <h1 className='user-title'>لیست کاربران</h1>
      {users.length ? (<table className='user-table'>
        <thead>
          <tr>
            <th>#</th>
            <th>نام و نام خانوادگی</th>
            <th>نام کاربری</th>
            <th>رمز عبور</th>
            <th>شماره تماس</th>
            <th>ایمیل</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            < tr>
              < th > {user.id}</th>
              <th>{user.firsname} {user.lastname}</th>
              <th>{user.username}</th>
              <th>{user.password}</th>
              <th>{user.phone}</th>
              <th>{user.email}</th>
              <td>
                <button onClick={() => {
                  setShowDeleteModal(true)
                  setUserID(user.id)
                }}>حذف</button>

                <button
                  onClick={() => {
                    setDetailsUser(user)
                    setShowDetailsModal(true)
                  }}
                >جزئیات</button>

                <button
                  onClick={() => {
                    setShowEditModal(true)
                    setUserID(user.id)
                    setnewFirstName(user.firsname)
                    setnewLastName(user.lastname)
                    setnewUsername(user.username)
                    setnewPassword(user.password)
                    setNewPhone(user.phone)
                    setNewCity(user.city)
                    setNewEail(user.email)
                    setNewAddress(user.address)
                    setNewScore(user.score)
                    setNewBuy(user.buy)

                  }}
                >ویرایش</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table >)
        : (<ErrorBox msg="هیچ کاربری یافت نشد" />
        )
      }

      {
        showDeleteModal && (
          <DeleteModal
            title={"آیا از حذف کاربر اطمینان دارید؟"}
            cancel={cancelDeleteModal}
            submit={submitDeleteModal}
          />
        )
      }
      {/* show edit modal */}

      {
        showEditModal && (
          <EditModal
            close={colseEditModal}
            submit={submitEditModal}
          >

            <div className="edite-user-div">
              <span>
                <BsCurrencyDollar />
              </span>
              <input
                type="text"
                className='edit-user-input'
                placeholder='نام جدید  را وارد نمایید'
                value={newFirstName}
                onChange={(event) => setnewFirstName(event.target.value)}
              />
            </div>
            <div className="edite-user-div">
              <span>
                <BsCurrencyDollar />
              </span>
              <input type="text" className='edit-user-input' placeholder='نام خانوادگی جدید  را وارد نمایید'
                value={newLastName}
                onChange={(event) => setnewLastName(event.target.value)}

              />
            </div>
            <div className="edite-user-div">
              <span>
                <BsCurrencyDollar />
              </span>
              <input type="text" className='edit-user-input' placeholder='نام کاربری جدید  را وارد نمایید'
                value={newUsername}
                onChange={(event) => setnewUsername(event.target.value)}

              />
            </div>
            <div className="edite-user-div">
              <span>
                <BsCurrencyDollar />
              </span>
              <input type="text" className='edit-user-input' placeholder='پسورد    جدید  را وارد نمایید'
                value={newPassword}
                onChange={(event) => setnewPassword(event.target.value)}

              />
            </div>
            <div className="edite-user-div">
              <span>
                <BsCurrencyDollar />
              </span>
              <input type="text" className='edit-user-input' placeholder='شماره تماس  جدید  را وارد نمایید'
                value={newPhone}
                onChange={(event) => setNewPhone(event.target.value)}

              />
            </div>
            <div className="edite-user-div">
              <span>
                <BsCurrencyDollar />
              </span>
              <input type="text" className='edit-user-input' placeholder='محل شهر جدید  را وارد نمایید'
                value={newcity}
                onChange={(event) => setNewCity(event.target.value)}

              />
            </div>
            <div className="edite-user-div">
              <span>
                <BsCurrencyDollar />
              </span>
              <input type="text" className='edit-user-input' placeholder=' ایمیل  جدید  را وارد نمایید'
                value={newEmail}
                onChange={(event) => setNewEail(event.target.value)}

              />
            </div>
            <div className="edite-user-div">
              <span>
                <BsCurrencyDollar />
              </span>
              <textarea className='edit-user-input' placeholder=' آدرس  جدید  را وارد نمایید'
                value={newAddress}
                onChange={(event) => setNewAddress(event.target.value)}

              />
            </div>
            <div className="edite-user-div">
              <span>
                <BsCurrencyDollar />
              </span>
              <input type="text" className='edit-user-input' placeholder='امتیاز شهر جدید  را وارد نمایید'
                value={newScore}
                onChange={(event) => setNewScore(event.target.value)}

              />
            </div>
            <div className="edite-user-div">
              <span>
                <BsCurrencyDollar />
              </span>
              <input type="text" className='edit-user-input' placeholder=' میزارن خرید جدید  را وارد نمایید'
                value={newBuy}
                onChange={(event) => setNewBuy(event.target.value)}

              />
            </div>

          </EditModal>
        )
      }

      {
        showDetailsModal && (
          <DetailsModal
            onHide={closeDetailsModal}
          >
            <table className='details-modal-table'>
              <thead>
                <tr>
                  <td>شهر</td>
                  <td>آدرس </td>
                  <td>امتیاز</td>
                  <td>میزان خرید</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{detailsUser.city}</td>
                  <td>{detailsUser.address}</td>
                  <td>{detailsUser.score}</td>
                  <td>{detailsUser.buy}</td>
                </tr>
              </tbody>
            </table>
          </DetailsModal>
        )
      }
    </>
  )

}