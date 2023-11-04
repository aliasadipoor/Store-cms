import React, { useState } from 'react'
import './AddNewProduct.css'
import { BsCursorText, BsBag, BsCardImage, BsCurrencyDollar, BsBarChartLine } from 'react-icons/bs'
import { MdFormatColorFill } from 'react-icons/md'
export default function AddNewProduct() {
    const [newProductTitle, setnewProductTitle] = useState('')
    const [newProductPrice, setnewProductPrice] = useState('')
    const [newProductCount, setnewProductCount] = useState('')
    const [newProductImg, setnewProductImg] = useState('')
    const [newProductPopularity, setnewProductPopularity] = useState('')
    const [newProductSale, setnewProductSale] = useState('')
    const [newProductColors, setNewProductColors] = useState('')

    const newProductInfos = {
        title: newProductTitle,
        price: newProductPrice,
        count: newProductCount,
        img: newProductImg,
        popularity: newProductPopularity,
        sale: newProductSale,
        colors: newProductColors,
    }

    let addNewProduct = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8000/api/products/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProductInfos)
        }).then((response) => response.json()).then(result => {
            console.log(result)
            
        })
    }
    return (
        <>
            <div className="product-main">
                <h1 className='product-main-title'>افزودن محصول جدید</h1>
                <form className='product-form'>
                    <div className="product-form-center">
                        <div className="product-form-group">
                            <BsCursorText className="icon" />
                            <input
                                type="text"
                                placeholder='نام محصول '
                                className='product-form-input'
                                value={newProductTitle}
                                onChange={
                                    (event) => setnewProductTitle(event.target.value)
                                }

                            />
                        </div>
                        <div className="product-form-group">
                            <BsCurrencyDollar className="icon" />
                            <input
                                type="text"
                                placeholder='قیمت محصول ' className='product-form-input'
                                value={newProductPrice}
                                onChange={(event) => setnewProductPrice(event.target.value)}

                            />
                        </div>
                        <div className="product-form-group">
                            <BsBag className="icon" />
                            <input
                                type="text"
                                placeholder='موجودی محصول '
                                className='product-form-input'
                                value={newProductCount}
                                onChange={
                                    (event) => setnewProductCount(event.target.value)
                                }
                            />
                        </div>
                        <div className="product-form-group">
                            <BsCardImage className="icon" />
                            <input
                                type="text"
                                placeholder='آدرس عکس محصول ' className='product-form-input'
                                value={newProductImg}
                                onChange={
                                    (event) => setnewProductImg(event.target.value)
                                }
                            />
                        </div>
                        <div className="product-form-group">
                            <BsBarChartLine className="icon" />
                            <input
                                type="text"
                                placeholder='میزان محبوبیت محصول ' className='product-form-input'
                                value={newProductPopularity}
                                onChange={
                                    (event) => setnewProductPopularity(event.target.value)
                                }

                            />
                        </div>
                        <div className="product-form-group">
                            <BsBarChartLine className="icon" />
                            <input
                                type="text"
                                placeholder='میزان فروش محصول ' className='product-form-input'
                                value={newProductSale}
                                onChange={
                                    (event) => setnewProductSale(event.target.value)
                                }
                            />

                        </div>
                        <div className="product-form-group">
                            <MdFormatColorFill className="icon" />
                            <input
                                type="text"
                                placeholder=' تعداد رنگ بندی  محصول ' className='product-form-input'
                                value={newProductColors}
                                onChange={
                                    (event) => setNewProductColors(event.target.value)
                                }

                            />
                        </div>
                    </div>
                    <button className='product-form-submit' onClick={addNewProduct}>ثبت محصول</button>
                </form >
            </div >

        </>
    )
}
