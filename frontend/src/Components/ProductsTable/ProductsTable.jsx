import React, { useEffect, useState } from 'react'
import './ProductsTable.css'
import DeleteModal from './../DeleteModal/DeleteModal'
import ErrorBox from '../ErrorBox/ErrorBox'
import DetailsModal from '../DetailsModal/DetailsModal'
import EditModal from '../EditModal/EditModal'
import { BsCurrencyDollar } from 'react-icons/bs'

export default function ProductsTable() {
    const [isShowModal, setIsShowModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [allProduct, setAllProduct] = useState([])
    const [productId, setPorductId] = useState(null)
    const [productInfos, setProductInfos] = useState({})
    const [newProductTitle, setNewProductTitle] = useState("")
    const [newProductPrice, setNewProductPrice] = useState("")
    const [newProductCount, setNewProductCount] = useState("")
    const [newProductImg, setNewProductImg] = useState("")
    const [newProductPopularity, setNewProductPopularity] = useState("")
    const [newProductSale, setNewProductSale] = useState("")
    const [newProductColor, setNewProductColor] = useState("")

    const getAllProducts = () => {
        fetch("http://localhost:8000/api/products")
            .then(resonse => resonse.json())
            .then(product => setAllProduct(product))
    }
    useEffect(() => {
        getAllProducts()
    }, [])

    const cancelDelteModal = () => {
        console.log("cancel shod");
        setIsShowModal(false)
    }

    const submiteDelteModal = () => {
        console.log("delete shod");
        fetch(`http://localhost:8000/api/products/${productId}`, {
            method: 'DELETE'
        }).then(res => res.json()).then(data => {
            setIsShowModal(false)
            getAllProducts()
        })
    }

    const closeDetailsModal = () => {
        console.log("نمایش جزییات بسته شد");

        setShowDetailsModal(false)
    }

    const closeEditeModal = () => {
        console.log("نمایش تغییرات بسته شد");
        setShowEditModal(false)
    }

    const submitEditeModal = (event) => {
        event.preventDefault()
        let newProductInfos = {
            title: newProductTitle,
            price: newProductPrice,
            count: newProductCount,
            img: newProductImg,
            popularity: newProductPopularity,
            sale: newProductSale,
            colors: newProductColor,
        }
        fetch(`http://localhost:8000/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(newProductInfos)

        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                getAllProducts()
                setShowEditModal(false)

            })
        console.log("نمایش تغییرات ویرایش  شد");
    }

    return (
        <>
            {allProduct.length ? (<table className="Products-Table">
                <thead>

                    <tr className="Products-Table-header">
                        <th>عکس</th>
                        <th>اسم</th>
                        <th>قیمت</th>
                        <th>موجودی</th>
                    </tr>
                </thead>{/* /img/charger.jpeg */}
                <tbody>
                    {allProduct.map(product => (
                        <tr className='Products-Table-tr' key={product.id}>
                            <td>
                                <img src={product.img} className='Products-Table-img' alt={product.title} />
                            </td>
                            <td>{product.title}</td>
                            <td>{product.price} تومان</td>
                            <td>{product.count}</td>
                            <td>
                                <button className='Products-Table-btn'
                                    onClick={() => {
                                        setShowDetailsModal(true)
                                        setProductInfos(product)
                                    }}>جزئیات</button>
                                <button
                                    className='Products-Table-btn'
                                    onClick={() => {
                                        setIsShowModal(true)
                                        setPorductId(product.id)
                                    }}
                                >
                                    حذف
                                </button>
                                <button className='Products-Table-btn'
                                    onClick={() => {
                                        setShowEditModal(true)
                                        setPorductId(product.id)
                                        setNewProductTitle(product.title)
                                        setNewProductColor(product.colors)
                                        setNewProductCount(product.count)
                                        setNewProductImg(product.img)
                                        setNewProductPopularity(product.popularity)
                                        setNewProductPrice(product.price)
                                        setNewProductSale(product.sale)
                                    }}>ویرایش
                                </button>


                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            ) : (
                <ErrorBox msg=" هیچ محصولی یافت نشد" />

            )}

            {isShowModal && <DeleteModal
                title={"آیا از حذف اطمینان دارید؟"}
                submit={submiteDelteModal}
                cancel={cancelDelteModal} />}

            {showDetailsModal && <DetailsModal onHide={closeDetailsModal}>
                <table className='details-modal-table'>
                    <thead>
                        <tr>
                            <td>اسم</td>
                            <td>فروش</td>
                            <td>محبوبیت </td>
                            <td>رنگ بندی </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{productInfos.title}</td>
                            <td>{productInfos.popularity}</td>
                            <td>{productInfos.sale}</td>
                            <td>{productInfos.colors}</td>
                        </tr>
                    </tbody>
                </table>
            </DetailsModal>

            }

            {showEditModal && <EditModal
                close={closeEditeModal}
                submit={submitEditeModal} >

                {/* children */}
                <div className="edit-product-form">
                    <span>
                        <BsCurrencyDollar />
                    </span>
                    <input
                        type="text"
                        className='edit-product-input'
                        placeholder='عنوان جدبد را وارد کنید '
                        value={newProductTitle}
                        onChange={(event) => setNewProductTitle(event.target.value)}
                    />
                </div>
                <div className="edit-product-form">
                    <span>
                        <BsCurrencyDollar />
                    </span>
                    <input
                        type="text"
                        className='edit-product-input'
                        placeholder='قیمت جدبد را وارد کنید '
                        value={newProductPrice}
                        onChange={(event) => setNewProductPrice(event.target.value)}
                    />
                </div>
                <div className="edit-product-form">
                    <span>
                        <BsCurrencyDollar />
                    </span>
                    <input
                        type="text"
                        className='edit-product-input'
                        placeholder='موجودی جدبد را وارد کنید '
                        value={newProductCount}
                        onChange={(event) => setNewProductCount(event.target.value)}
                    />
                </div>
                <div className="edit-product-form">
                    <span>
                        <BsCurrencyDollar />
                    </span>
                    <input
                        type="text"
                        className='edit-product-input'
                        placeholder='آدرس عکس جدبد را وارد کنید'
                        value={newProductImg}
                        onChange={(event) => setNewProductImg(event.target.value)}
                    />
                </div>
                <div className="edit-product-form">
                    <span>
                        <BsCurrencyDollar />
                    </span>

                    <input
                        type="text"
                        className='edit-product-input'
                        placeholder=' میزان محبوبیت جدبد را وارد کنید '
                        value={newProductPopularity}
                        onChange={(event) => setNewProductPopularity(event.target.value)}
                    />
                </div>
                <div className="edit-product-form">
                    <span>
                        <BsCurrencyDollar />
                    </span>

                    <input
                        type="text"
                        className='edit-product-input'
                        placeholder='میزان فروش  جدبد را وارد کنید  '
                        value={newProductSale}
                        onChange={(event) => setNewProductSale(event.target.value)}
                    />
                </div>
                <div className="edit-product-form">
                    <span>
                        <BsCurrencyDollar />
                    </span>
                    <input
                        type="text"
                        className='edit-product-input'
                        placeholder='تعداد رنگ بندی جدبد را وارد کنید '
                        value={newProductColor}
                        onChange={(event) => setNewProductColor(event.target.value)}
                    />
                </div>

            </EditModal>}

        </>
    )
}
