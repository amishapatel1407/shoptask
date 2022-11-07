import React , {useState} from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Field, reduxForm } from 'redux-form'
import { useDispatch, useSelector } from "react-redux";
import { GetCountries } from '../../Redux/Action/GetCheOutPageApi'
import './BillingForm.css'
function BillingForm(props) {
  const {handleSubmit ,prefix}=props || ''
  

  const dispatch = useDispatch()
  const CountriesData = useSelector((state) => state?.CheckOutDataReducer?.CountriesData)
  
  const  [selectedCountry, setSelectedCountry] = useState();
  const [shipping ,setShipping]  = useState(null)
  

  const availableState = CountriesData.find((c) => c.name === selectedCountry )
 


  useEffect(() => {
    dispatch(GetCountries())
  }, [])








  return (
    <div>

      <form className="form" onSubmit={handleSubmit} >
   <Row>
          <Col md={6}>
            <div className="control">
              <label>First Name</label>
              <abbr className="required" title="required">*</abbr>
              <div >
                <Field
                  name={`${prefix}firstName`}
                  component="input"
                  type="text"
                  placeholder="First Name"
                />
              </div>
            </div>
          </Col>

          <Col md={6}>
            <div className="control">
              <label>Last Name</label>
              <abbr className="required" title="required">*</abbr>
              <div>
                <Field
                  name={`${prefix}lastName`}
                  component="input"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
          </Col>
          <div className="control">
            <label>Company Name(optional)</label>
            <div>
              <Field
                name={`${prefix}companyname`}
                component="input"
                type="text"
                placeholder="Company Name"
              />
            </div>
          </div>
          <div className="control">
            <label>Country / Region</label>
            <abbr className="required" title="required">*</abbr>
            <div>


              <Field
                name={`${prefix}Country`}
                component="select"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value) }
              >
                <option>Select Your Country</option>
                {CountriesData.map((country,id) => (
                <>
                  <option key={id} value={country.name}>{country.name}</option></>
               )  )}


              </Field>
            </div>
          </div>



          <div className="control">
            <label>Street address </label>
            <abbr className="required" title="required">*</abbr>
            <div>
              <Field
                name={`${prefix}Streetaddress`}
                component="input"
                type="text"
                placeholder="Street address"
              />
            </div>
          </div>
          <div className="control">
            <label>Town / City</label>
            <abbr className="required" title="required">*</abbr>

            <div>
              <Field
                name={`${prefix}city`}
                component="input"
                type="text"
                placeholder="Town / City"
              />
            </div>
          </div>
          <div className="control">
            <label>State</label>
            <abbr className="required" title="required">*</abbr>
            <div>
              <Field
                name={`${prefix}state`}
                component="select"
                  value={availableState}

              >
                <option>Select Your state</option>
                 {availableState?.states?.map((state,id) => (
              
                  <option key={id} value={state.name}>{state.name}</option>
               )  )}
               </Field>
            </div>
          </div>

          <div className="control">
            <label>Pin Code</label>
            <abbr className="required" title="required">*</abbr>

            <div>
              <Field
                name={`${prefix}pincode`}
                component="input"
                type="text"
                placeholder="Pin Code"
              />
            </div>
          </div>
          <div className="control">
            <label>Phone</label>
            <abbr className="required" title="required">*</abbr>

            <div>
              <Field
                name={`${prefix}phone`}
                component="input"
                type="tel"
                placeholder="Phone"
              />
            </div>
          </div>
          <div className="control">
            <label>Email address</label>
            <abbr className="required" title="required">*</abbr>

            <div>
              <Field
                name={`${prefix}email`}
                component="input"
                type="email"
                placeholder="Email address"
              />
            </div>
          </div>
         
        </Row>
      <div className="control">
    
        <label>Order notes (optional)</label>
        <div>
          <Field
            name="notes"
            component="textarea"
            placeholder="Notes about your orders,e.g. special notes for delivery"
            />
        </div>
      </div>
    <button type="submit" className="submitbtn">submit</button>

            </form>
    </div>
  )
}
BillingForm = reduxForm({
  // a unique name for the form
  form: 'root'
})(BillingForm)


export default BillingForm