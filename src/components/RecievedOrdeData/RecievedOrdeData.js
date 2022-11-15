import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

function RecievedOrdeData() {


    const  receivedData = useSelector((state) => state?.CheckOutFormData?.orderRecivedData) 
    console.log("receivedData======>",receivedData);
    return (
        <div>
            <Container>
                <div>
                <h1>Order received</h1>
                <h5>Thank you. Your order has been received.</h5>

                </div>

            </Container>
        </div>
    )
}
export default RecievedOrdeData