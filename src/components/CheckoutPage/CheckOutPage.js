import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap";
import BillingForm from './BillingForm'
import { CheckFormData } from '../../Redux/Action/GetCheckFormData'
import { PaymentGateway } from '../../Redux/Action/GetCheOutPageApi'
import { SelectedShipppingData,SelectedPaymentData} from '../../Redux/Action/GetCheckFormData'
import {ApplyCouponsData} from '../../Redux/Action/GetCoupons'
import {PostApiData} from '../../Redux/Action/PostData'
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from "react-router-dom";
import './CheckOutPage.css'

const CheckOutPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartdata = useSelector((state) => state?.cartuser)
    const applycouponsdData1 = useSelector((state) => state?.CouponsReducer?.AppluCouponsData)
    console.log("applycouponsdData1==========>",applycouponsdData1);
    const checkoutformdata = useSelector((state) => state?.CheckOutFormData)
    const paymentdata = useSelector((state) => state?.CheckOutDataReducer?.PaymentGatewayData)
    const ShippingData = useSelector((state) => state?.CheckOutDataReducer?.ShippingApiData)
    const AllCheckoutData = useSelector((state) => state?.CheckOutFormData)
    console.log("checkoutformdata?.billing?.country",checkoutformdata?.billing);
    const payment_method = useSelector((state) => state?.CheckOutFormData?.payment_method)
    console.log("payment_method==========>",payment_method);
    const shipping_linesData = useSelector((state) => state?.CheckOutFormData?.shipping_lines)
    // console.log("shipping_linesData==========>",shipping_linesData);
   
    const shippingCost = shipping_linesData?.map((data) => data.total)

    const [validation, setvalidation] = useState(true)
    const [shipping, setShipping] = useState(null)
    const [shippininput, setShippingInput] = useState(shipping_linesData)
    const [pymentinput , setPaymentinput] = useState(null)
    const [beforeformvalidation , setBeforeformvalidation] = useState(null)
    let ordercartdata = cartdata.carts



  

    
    const ShippinghandleChange = (e) => {

        const getshippingmethod = ShippingData.find((item) => item.method_id === e.target.value)
        setShippingInput(getshippingmethod)
           
        dispatch(SelectedShipppingData(getshippingmethod))



    }
    const handlePaymentGateway = (e) => {
        let selectedpaymentdata = paymentdata.find((data) => data.id === e.target.value)
        setPaymentinput(selectedpaymentdata)
        dispatch(SelectedPaymentData(selectedpaymentdata))

    }

    const handleSubmit = (values) => {
        setvalidation(false)
        window.scroll(0, 0)
        console.log("values.country",values.Country ,values.state);
        if (values.first_name && values.last_name && values.address_1 && values.city && values.postcode && values.phone && values.email && values.country && values.state) {
            setvalidation("Success")
            console.log("not done");
        }

        console.log("values======>", values);
        console.log('shippininputtest',shippininput);
        dispatch(CheckFormData({
            val: values,
            data1: ordercartdata,
            coupons :applycouponsdData1,
            paymentdata: pymentinput,
            shippingdata: shippininput
        }))

    }
    console.log("test to it",validation);


    
const PlaceOrder = () => {
    // console.log("validation==========>",!checkoutformdata);
  
       
    if(validation === 'Success'){
             
                
                 console.log("AllCheckoutData==========>",AllCheckoutData);
                    dispatch(PostApiData(AllCheckoutData))
                    navigate('/OrderData')
                }
                else{
            
                        // alert("please fill the form")
                    
                    } 
 
}



    useEffect(() => {
        dispatch(PaymentGateway())
    }, [])



    return (
        <div className="checkoutpage">
  
            <Container>
                <h3 className="mt-4">CheckOut</h3>

                {!validation
                 ? <div className="alert alert-danger ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    {!checkoutformdata?.billing?.first_name ? <div> Billing FirstName is a required field.</div> : null}
                    {!checkoutformdata?.billing?.last_name ? <div> Billing LastName is a required field.</div> : null}
                    {!checkoutformdata?.billing?.address_1 ? <div> Billing Street Address is a required field.</div> : null}
                    {!checkoutformdata?.billing?.city ? <div> Billing City is a required field.</div> : null}
                    {!checkoutformdata?.billing?.postcode ? <div> Billing Pincode is a required field.</div> : null}
                    {!checkoutformdata?.billing?.phone  ? <div> Billing Phone Number is a required field.</div> : null}
                    {!checkoutformdata?.billing?.email ? <div> Billing Email is a required field.</div> : null}
                    {!checkoutformdata?.billing?.country ? <div> Billing country is a required field.</div> : null}
                    {!checkoutformdata?.billing?.state ? <div> Billing state is a required field.</div> : null}
                    {/* {!checkoutformdata?.shipping?.first_name ? <div> shipping firstName is a required field.</div> : null}
                    {!checkoutformdata?.shipping?.last_name ? <div> shipping LastName  is a required field.</div> : null}
                    {!checkoutformdata?.shipping?.address_1 ? <div> shipping Streetaddress  is a required field.</div> : null}
                    {!checkoutformdata?.shipping?.city ? <div> shipping City  is a required field.</div> : null}
                    {!checkoutformdata?.shipping?.postcode ? <div> shipping Pincode  is a required field.</div> : null} */}



                </div> : null}
                <Row  >

                    <Col className="mt-4" md={7}>

                        <div>
                            <h3>Billing details</h3>
                            <BillingForm onSubmit={handleSubmit} prefix="" excludes={""} />
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
                            {shipping ? <BillingForm prefix="Shipping_" onSubmit={handleSubmit} excludes={["phone", "email", "notes"]} /> : null}
                        </div>
                    </Col>
                    <Col className="mt-5 g-3" md={5}>
                        <h3>Your Order</h3>
                        <div className="orderHeading  mt-4">
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
                                    <p>
                                        SubTotal:
                                    </p>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="displaydata">

                                    <p>
                                        ${cartdata.cartTotal}.00
                                    </p>


                                </div>


                            </Col>
                        </Row>
                        {applycouponsdData1 && applycouponsdData1?.code?.length > 0 ?
                            <Row>

                                <Col md={7}>
                                    
                                    <div className="displaydata">

                                        <p>
                                            Coupons:{applycouponsdData1.code}
                                        </p>


                                    </div>
                                </Col>
                                <Col md={5}>

                                    <div className="displaydata">

                                        <p>
                                            -${applycouponsdData1.amount}
                                        </p>


                                    </div>

                                </Col>

                            </Row>
                            : ""}
                        {/* shipping data */}
                        <Row>
                            <Col md={7}>
                                <div className="displaydata">

                                    <p>Shipping</p>

                                </div>
                            </Col>
                            <Col md={5}>

                                <div className="shippingdata">
                                    {ShippingData.map((item,id) => (

                                        <label>
                                            <input
                                                onChange={(e) => ShippinghandleChange(e)}
                                                id="radio1"
                                                name="radiobuttonshipping"
                                                type="radio"
                                                checked={ shipping_linesData ? shipping_linesData?.find((i) => i.method_id ===  item.method_id) ? item.method_id : null  : id == 0}
                                                // checked={shipping_linesData?.method_id ? item.method_id === shipping_linesData?.method_id ? shipping_linesData.method_id : null : null}
                                                value={item.method_id}
                                            />

                                            <span>{item.title} {item?.settings?.cost ? <span> ${item?.settings?.cost?.value}.00</span> : null}</span>
                                   


                                        </label>


                                    ))}
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
                                {applycouponsdData1 && applycouponsdData1?.code?.length > 0 ?
                                    <div className="displaydata">

                                        <p>
                                       
                                            {shipping_linesData && shippingCost ? 
                                            <div>${parseInt(cartdata.cartTotal - applycouponsdData1.amount) + parseInt(shippingCost)}.00</div> : <div>${parseInt(cartdata.cartTotal - applycouponsdData1.amount)}.00</div>
                                            }

                                        </p>


                                    </div> :
                                    <div className="displaydata">
                                        <b>
                                            <p>
                                                {shipping_linesData && shippingCost ? 
                                                 <div>${parseInt(cartdata.cartTotal) + parseInt(shippingCost)}.00</div> : <div>${(cartdata.cartTotal)}.00</div>}
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
                                                            onChange={(e) => handlePaymentGateway(e)}
                                                            id="radio1"
                                                            name="radiobuttonpayment"
                                                            type="radio"
                                                            checked={payment_method === data.id ? data.id : null }
                                                            value={data.id}

                                                        />

                                                        <span >{data.title} </span>

                                                    </label>
                                                    {/* </Accordion.Header> */}
                                                </div>
                                                {/* <Accordion.Body> */}
                                                {data.id === payment_method ?
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
                        <Row>
                            <Col>
                                <div className="displaydata">

                                    <button className="palceorderbtn" onClick={() => PlaceOrder()}>Place Order</button>
                    

                                </div>
                            </Col>

                        </Row>
                    </Col>
                    <Row>

                    </Row>

                </Row>

            </Container>


        </div>


    )
}
export default CheckOutPage