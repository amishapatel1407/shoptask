import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap";
import BillingForm from './BillingForm'
import { CheckFormData } from '../../Redux/Action/GetCheckFormData'
import { PaymentGateway } from '../../Redux/Action/GetCheOutPageApi'
import Accordion from 'react-bootstrap/Accordion';
import './CheckOutPage.css'

const CheckOutPage = () => {
    const dispatch = useDispatch()
    const cartdata = useSelector((state) => state?.cartuser)
    const applycouponsdData1 = useSelector((state) => state?.CouponsReducer?.AppluCouponsData)
    const checkoutformdata = useSelector((state) => state?.CheckOutFormData)
    console.log("checkoutformdata========>", checkoutformdata.firstName);
    const paymentdata = useSelector((state) => state?.CheckOutDataReducer?.PaymentGatewayData)

    console.log("paymentdataapi=========>", paymentdata);
    const [test, setTest] = useState(null)
    console.log("cartdata======>", cartdata.carts);
    const [validation, setvalidation] = useState(false)
    const [shipping, setShipping] = useState(null)

    let ordercartdata = cartdata.carts

    const handleSubmit = (values) => {
        console.log("values======>", values);
        setvalidation(true)
        window.scroll(0, 0)
        if (values.firstName && values.lastName && values.Streetaddress && values.city && values.pincode && values.phone && values.email) {
            setvalidation(false)
        }
        dispatch(CheckFormData({
            val: values,
            data1: ordercartdata
        }))



    }
    useEffect(() => {
        dispatch(PaymentGateway())
    }, [])



    return (
        <div className="checkoutpage">


            <Container>
                <h3 className="mt-4">CheckOut</h3>

                {validation ? <div className="alert alert-danger ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    {!checkoutformdata.billing.firstName ? <div> Billing FirstName is a required field.</div> : null}
                    {!checkoutformdata.billing.lastName ? <div> Billing LastName is a required field.</div> : null}
                    {!checkoutformdata.billing.Streetaddress ? <div> Billing Street Address is a required field.</div> : null}
                    {!checkoutformdata.billing.city ? <div> Billing City is a required field.</div> : null}
                    {!checkoutformdata.billing.pincode ? <div> Billing Pincode is a required field.</div> : null}
                    {!checkoutformdata.billing.phone ? <div> Billing Phone Number is a required field.</div> : null}
                    {!checkoutformdata.billing.email ? <div> Billing Email is a required field.</div> : null}
                    {!checkoutformdata.shipping.Shipping_firstName ? <div> shipping firstName is a required field.</div> : null}
                    {!checkoutformdata.shipping.Shipping_lastName ? <div> shipping LastName  is a required field.</div> : null}
                    {!checkoutformdata.shipping.Shipping_Streetaddress ? <div> shipping Streetaddress  is a required field.</div> : null}
                    {!checkoutformdata.shipping.Shipping_city ? <div> shipping City  is a required field.</div> : null}
                    {!checkoutformdata.shipping.Shipping_pincode? <div> shipping Pincode  is a required field.</div> : null}
                    {/* {!checkoutformdata.shipping.Shipping_phone? <div> shipping Phone  is a required field.</div> : null}
                    {!checkoutformdata.shipping.Shipping_email? <div> shipping Email  is a required field.</div> : null} */}


                </div> : null}
                <Row  >

                    <Col className="mt-4" md={7}>

                        <div>
                            <h3>Billing details</h3>
                            <BillingForm onSubmit={handleSubmit} prefix="" />
                            <Row>
                                <Col md={11}>
                                    <div className="control mt-3">
                                        <label htmlFor="checkbox1"><h2>Ship to a different address?</h2></label>
                                    </div>
                                </Col>

                                <Col md={1}>
                                    {/* <div className="control mt-4"> */}

                                    <div className="checkbox control mt-4">
                                        <input type="checkbox" name="checkbox" id="checkbox1" value="checkbox" onChange={(e) => setShipping(e.target.checked)} />
                                        {/* </div> */}
                                    </div>
                                </Col>
                            </Row>
                            {shipping ? <BillingForm prefix="Shipping_" onSubmit={handleSubmit} /> : null}
                        </div>
                    </Col>
                    <Col className="mt-5 g-4" md={5}>
                        <h3>Your Order</h3>
                        <div className="orderHeading mt-4">
                            <Row>
                                <Col md={7} >

                                    <p>Product</p>

                                </Col>
                                <Col md={5}>
                                    <p>SubTotal</p>
                                </Col>

                            </Row>
                        </div>
                        <div>
                            {cartdata.carts.map((item, id) => {
                                return (
                                    <div key={id}>
                                        <Row>
                                            <Col md={7}>
                                                <div className="displaydata">
                                                    <p>{item.name}  {""} x {""} {item.quantity}</p>
                                                </div>
                                            </Col>
                                            <Col md={5}>
                                                <div className="displaydata">
                                                    <p>${(item.price) * (item.quantity)}.00</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            })}
                        </div>
                        <Row>
                            <Col md={7}>
                                <div className="displaydata">
                                    <b>
                                        <p>
                                            SubTotal:
                                        </p>

                                    </b>

                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="displaydata">
                                    <b>
                                        <p>
                                            ${cartdata.cartTotal}.00
                                        </p>
                                    </b>

                                </div>


                            </Col>
                        </Row>
                        <Row>
                            <Col md={7}>
                                {applycouponsdData1 ?
                                    <div className="displaydata">
                                        <b>
                                            <p>
                                                Coupons:{applycouponsdData1.code}
                                            </p>

                                        </b>
                                    </div> : null}
                            </Col>
                            <Col md={5}>
                                <div className="displaydata">
                                    <b>
                                        <p>
                                            -${applycouponsdData1.amount}
                                        </p>

                                    </b>
                                </div>

                            </Col>

                        </Row>
                        <Row>
                            <Col md={7}>
                                <div className="displaydata">
                                    <b>
                                        <p>
                                            Total:
                                        </p>

                                    </b>

                                </div>
                            </Col>
                            <Col md={5}>
                                {applycouponsdData1 ?
                                    <div className="displaydata">
                                        <b>
                                            <p>
                                                ${cartdata.cartTotal - applycouponsdData1.amount}.00
                                            </p>
                                        </b>

                                    </div> :
                                    <div className="displaydata">
                                        <b>
                                            <p>
                                                ${cartdata.cartTotal}.00
                                            </p>
                                        </b>

                                    </div>
                                }


                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {paymentdata.map((data) => (
                                    <div className="displaypaymentdata">
                                        <Accordion >
                                            <Accordion.Item >
                                                <div className="inputdata">
                                                    {/* <Accordion.Header>  */}
                                                    <label>
                                                        <input
                                                            onChange={(e) => setTest(e.target.value)}
                                                            id="radio1"
                                                            name="radiobutton"
                                                            type="radio"
                                                            value={data.title}
                                                        />

                                                        <span >{data.title} </span>

                                                    </label>
                                                    {/* </Accordion.Header> */}
                                                </div>
                                                {/* <Accordion.Body> */}
                                                {test === data.title ?
                                                    <div className="displaydata">
                                                        <h6>{data.description}</h6>
                                                    </div>
                                                    : null
                                                }
                                                {/* </Accordion.Body> */}
                                            </Accordion.Item>

                                        </Accordion>
                                    </div>


                                ))}


                            </Col>

                        </Row>
                        <Row>
                            <Col>


                            </Col>
                        </Row>
                        {/* <Row>
                            <Col>
                                <div className="displaydata">

                                    <button className="palceorderbtn">Place Order</button>

                                </div>
                            </Col>

                        </Row> */}
                    </Col>
                    <Row>

                    </Row>

                </Row>





            </Container>


        </div>


    )
}
export default CheckOutPage