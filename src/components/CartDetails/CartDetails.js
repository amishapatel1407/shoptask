import React, { useState } from "react";
import { Col, Row, Card, Button, Container } from "react-bootstrap";
import { FaTrash,FaArrowRight } from 'react-icons/fa'
import { deleteItem, updateCartQty } from '../../Redux/Action/CartAction'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import './CartDetails.css'
import { GetCoupons,ApplyCouponsData } from '../../Redux/Action/GetCoupons'
import { useEffect } from "react";
function CartDetails() {


    const cartDetails = useSelector((state) => state?.cartuser)
    console.log("cartDetails===>", cartDetails);
    const Cartsubtotal = cartDetails.cartTotal;
    const [input, setInput] = useState(null)
    const [coupons, setCoupons] = useState(null)
    const [alert, setAlert] = useState(null)
    const [wrog, setWrong] = useState(null)
    const [deleteitem, setdeleteItem] = useState(null)
    const GetCouponsdata = useSelector((state) => state?.CouponsReducer)
    // const [resdata, setResponsedata] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handlecartpageinput = (e, cartIndex) => {
        console.log("asdasd", e.target.value, cartIndex);
        dispatch(updateCartQty({
            id: cartIndex,
            qty: e.target.value
        }))
    }
    const handleclickShop = () => {
        navigate('/shop')

    }
const navigatetocheckoutpage = () => {
    navigate('/CheckOut')
}

const handleDelete = (id, cartdata) => {
    dispatch(deleteItem(id))
    setAlert("delete")
    window.scroll(0,0)
    setdeleteItem(cartdata)
       
        const updateresult = []
        cartDetails.carts.map((data) => {
            updateresult.push(data.id)
          
        })


let res = updateresult.map((ids) => ids).findIndex((id) => id === cartdata.id)

console.log("res",res);
updateresult.splice(res,1)
        console.log("updateresult===== splice",updateresult);
       
        var input2 = input
        var  inputlower1 = input2.toLowerCase()
        
        var myRe123 = GetCouponsdata.CouponsData.find((item) => item.code === inputlower1)
       
        setCoupons('')
        let check = false
       if(myRe123) {

        if ( myRe123.product_ids.length > 0) {
            console.log("updateresult map" ,updateresult);
            myRe123.product_ids.map((pid) => {
                if (updateresult.indexOf(pid) > -1 ) {
                    setCoupons(myRe123)
                  
                    check  = false
                    return ;
                }
                else {
                    setCoupons('')
                   
                    check = true
                }
            })
        }
        
        
        else{
            setCoupons(myRe123)
        }          
    }  
    if(check){
        setAlert("does not Applicable")
       }
       }    



        
    
        useEffect(() => {

            dispatch(GetCoupons()) 
           
        }, [])

        const inputTyp =(e) =>{
            setInput(e.target.value)
        }
        
        const ApplyCoupons = () =>  {
           
        var inpute = input
        var inputlower = inpute.toLowerCase();

        var myRe = GetCouponsdata.CouponsData.find((item) => item.code === inputlower)


        if (myRe && !myRe.product_ids.length) {


            console.log("applied coupan");
            setAlert("successfully");
            setCoupons(myRe);
            dispatch(ApplyCouponsData(myRe))
            window.scroll(0,0)
            if (coupons && myRe.code === inputlower) {
                console.log("Coupon code already applied!")

                // setAlert("applied")
            }

           
        }


        else {
            let check1 = false
            setWrong(input)
            setAlert("wrog")
            setCoupons(null);
           
            window.scroll(0,0)
            if (myRe.product_ids.length) {

                cartDetails.carts.map((ids) => {
                    if (myRe.product_ids.indexOf(ids.id) > -1) {
                        setAlert("successfully");
                        setCoupons(myRe);
                        dispatch(ApplyCouponsData(myRe))
                        window.scroll(0,0)
                        check1 = true
                        console.log("successfully");

                    }
                    
                    
                })
            }
          
            if(!check1){
                
                    setAlert("does not Applicable")
                    window.scroll(0,0)
            }
         
        }
        
    }
    const remove = () => {
       
        setInput("")
        console.log("remove");
        setAlert("remove")
         setCoupons(null);
         
      



    }

    return (
        <div className="cartdetailespage">
            <Container>
                <h2 className="pt-4">Cart</h2>
                {
                    alert === "delete" ? <div className="alert alert-success" role="alert">
                        “{deleteitem.name}” removed..
                    </div> : ""
                }
            </Container>
            {cartDetails.itemTotal !== 0 ? <Container>
                {alert === "successfully" ? <div className="alert alert-success" role="alert">

                    <b> Coupon code applied successfully!!.</b>
                </div> : ''}
                {/* {
                    alert === "applied" ? <div className="alert alert-danger" role="alert">
                        Coupon code already applied!.
                    </div> : ''
                } */}
                {
                    alert === "remove" ?
                        <div className="alert alert-success" role="alert">
                            Coupon has been removed.
                        </div> : null
                }
                {
                    wrog && alert === "wrog" ?
                        <div className="alert alert-danger" role="alert">
                            Coupon "{wrog}" does not exist!
                        </div>
                        : null

                }
                {
                    alert === "does not Applicable" ? <div className="alert alert-danger" role="alert">
           Sorry, this coupon is not applicable to selected products.
                </div> : ''
                }



                <div className="cartheadingcss">

                    <Row>
                        
                        <Col md={2}>

                        </Col>
                        <Col md={2}>

                        </Col>
                        <Col md={2} >
                            <Card.Text >Product</Card.Text>

                        </Col>
                        <Col md={2}>
                            <Card.Text >Price</Card.Text>

                        </Col>
                        <Col md={2}>
                            <Card.Text>Quantity</Card.Text>
                        </Col>

                        <Col md={2}>
                            <Card.Text> SubTotal </Card.Text>
                        </Col>
                    </Row>

                </div>

            </Container> : ''

            }
            {cartDetails?.carts.map((cartdata, id) => (
                <Container key={id}>
                    <div className="cartdatacss" >
                        <Card style={{ width: '100%' }} className='pt-5'>
                            <Card.Body>


                                <Row>
                                    <Col md={2}>
                                        <FaTrash className="cartdeleteicon" onClick={() => handleDelete(id, cartdata)} />
                                    </Col>
                                    <Col md={2}>
                                        <img src={cartdata.img} width={100} />

                                    </Col>
                                    <Col md={2} >
                                        <Card.Text >{cartdata.name}</Card.Text>


                                    </Col>
                                    <Col md={2}>
                                        <Card.Text >${cartdata.price}.00</Card.Text>

                                    </Col>
                                    <Col md={2}>

                                        <input type="number" min={1} className="inputBox border-top" value={cartdata.quantity} onChange={(e) => handlecartpageinput(e, cartdata.id)} />
                                    </Col>

                                    <Col md={2}>
                                        <Card.Text> ${(cartdata.price) * (cartdata.quantity)}.00 </Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>

                        </Card>

                    </div>

                </Container>
            ))}
            {cartDetails.itemTotal !== 0 ? <Container>


                <div>
                    {  
                        coupons ?
                      <>
                        <input type="text"  value = {coupons.code}  className="coupaninput" name="coupon" placeholder="Enter coupan a code" />  <button type="button" className="applycoupan" onClick={()=>remove()}> remove</button>
                        </> : 
                        <>
                         <input type="text"  className="coupaninput" value={input} onChange= {(e) => inputTyp(e)} name="coupon" placeholder="Enter coupan a code" />
                    
                    <button type="button" className="applycoupan"  onClick={() => ApplyCoupons()}> Apply Coupan</button>
                        </>
}

                </div>

                <div className="disaplytotal  ">
                    <Row >
                        <Col>
                            <h4 className="mb-3">Carts Totals : </h4>
                        </Col>

                    </Row>
                    <Row className=' bg-light'>
                        <Col md={6} className=' bg-light'>
                            <h5>SubTotal :</h5>
                        </Col>
                        <Col>
                            <h5>{Cartsubtotal}</h5> </Col>
                    </Row>
                    <Row className=' bg-light'>
                        {coupons ?
                            <div className="d-flex justify-content-around " >
                                <Col md={6}>
                                    <h5 className="mb-0 ">Coupon:{coupons.code}
                                    </h5>
                                </Col>
                                <Col md={2}>
                                    <h5>
                                        -${coupons.amount}

                                    </h5>
                                </Col>

                                <Col>
                                    <h5>
                                        <NavLink className='removelink ' onClick={remove}>[Remove]</NavLink>
                                    </h5>
                                </Col>

                            </div>


                            :
                            ""}
                    </Row>
                    <Row className=' bg-light'>

                        {coupons ?
                            <>

                                <Col md={6}>
                                    <h5>Total: </h5>
                                </Col>
                                <Col>
                                    <h5>{Cartsubtotal - coupons.amount} </h5>
                                </Col>

                            </>

                            :
                            <>
                                <Col>
                                    <h5>Total:</h5>

                                </Col>
                                <Col>
                                    <h5>{Cartsubtotal}</h5>

                                </Col>
                            </>


                        }
                    </Row>
                    <button className="checkoutbtn" onClick={navigatetocheckoutpage}>Proceed to checkout <FaArrowRight /></button>


                </div>


            </Container>
                :
                <Container>
                    <div>
                        <div class="alert alert-primary" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>

                            Your cart is currently empty.


                        </div>
                        <Button className="returnshopbtn" variant="outline-primary" onClick={handleclickShop}> Return to Shop  </Button>
                    </div>
                </Container>
            }


        </div>
    )
}

export default CartDetails