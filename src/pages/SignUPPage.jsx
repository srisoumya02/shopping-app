import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link,useNavigate } from "react-router-dom";
import Endpoints from "../apis/Endpoints";
import Navbar from "../components/Navbar";
import HeaderCategory from "../components/HeaderCategory";

const SignUpPage = () => {

  const [requestResponse, setRequestResponse] = useState({
    textMesssage: '',
    alertClass: ''
  })

  const initialValues = {
    firstName: '',
    lastName: '',
    userName:'',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const navigate = useNavigate();
  const onSubmit = (values) => {
    console.log(values)
    axios.post(Endpoints.REGISTER_URL, values)
      .then((response) => {
        console.log(response.data);
        setRequestResponse({
          textMesssage: "Registration Sucessfull",
          alertClass: 'alert alert-success'
        })
        navigate("/Login");
      },
        (error) => {
          console.log(error);

          setRequestResponse({
            textMesssage: error.response.data.message,
            alertClass: 'alert alert-danger'
          })
          console.log(error.response.data.message)
        })
      .catch((error) => { console.log(error) })
  }
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    userName:Yup.string().required('username is required'),
    email: Yup.string().required('email is required').email('email must be valid'),
    password: Yup.string().required('password is required').min(6, 'password must be atleast 6 characters'),
    confirmPassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const Formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  })

  return (
    <>
      <Navbar />
      <HeaderCategory />
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6" style={{ display: "flex", justifyContent: "center", border: "solid lightgrey", padding: "20px", margin: "30px" }}>
            <div className="wrapper">
              <div className={requestResponse.alertClass} role="alert">
                {requestResponse.textMesssage}
              </div>
              <h1 style={{ display: "flex", justifyContent: "center" }}>Sign-Up</h1>


              <form onSubmit={Formik.handleSubmit}>
                <div className="form-group">
                  <input type="text"
                    name="firstName"
                    placeholder="First Name"
                    id="firstName"
                    className={Formik.touched.firstName && Formik.errors.firstName ? "form-control is-invalid" : "form-control"}
                    value={Formik.values.firstName}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                  />
                  {Formik.touched.firstName && Formik.errors.firstName ? (
                    <small className="text-danger">{Formik.errors.firstName}</small>
                  ) : null}
                </div>
                <div className="form-group">
                  <input type="text"
                    name="lastName"
                    placeholder="Last Name"
                    id="lastName"
                    className={Formik.touched.lastName && Formik.errors.lastName ? "form-control is-invalid" : "form-control"}
                    value={Formik.values.lastName}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                  />
                  {Formik.touched.lastName && Formik.errors.lastName ? (
                    <small className="text-danger">{Formik.errors.lastName}</small>
                  ) : null}
                </div>
                <div className="form-group">
                  <input type="text"
                    name="userName"
                    placeholder="User Name"
                    id="userName"
                    className={Formik.touched.userName && Formik.errors.userName ? "form-control is-invalid" : "form-control"}
                    value={Formik.values.userName}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                  />
                  {Formik.touched.userName && Formik.errors.userName ? (
                    <small className="text-danger">{Formik.errors.userName}</small>
                  ) : null}
                </div>
                <div className="form-group">
                  <input type="text"
                    name="email"
                    placeholder="Email Addresses"
                    id="email"
                    className={Formik.touched.email && Formik.errors.email ? "form-control is-invalid" : "form-control"}
                    value={Formik.values.email}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                  />
                  {Formik.touched.email && Formik.errors.email ? (
                    <small className="text-danger">{Formik.errors.email}</small>
                  ) : null}
                </div>
                <div className="form-group">
                  <input type="password"
                    name="password"
                    placeholder="Password"
                    id="password"
                    className={Formik.touched.password && Formik.errors.password ? "form-control is-invalid" : "form-control"}
                    value={Formik.values.password}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                  />
                  {Formik.touched.password && Formik.errors.password ? (
                    <small className="text-danger">{Formik.errors.password}</small>
                  ) : null}
                </div>
                <div className="form-group">
                  <input type="password"
                    name="confirmPassword"
                    placeholder="Password Confirm"
                    id="confirmPassword"
                    className={Formik.touched.confirmPassword && Formik.errors.confirmPassword ? "form-control is-invalid" : "form-control"}
                    value={Formik.values.confirmPassword}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                  />
                  {Formik.touched.confirmPassword && Formik.errors.confirmPassword ? (
                    <small className="text-danger">{Formik.errors.confirmPassword}</small>
                  ) : null}
                </div>
                <button className="btn-primary btn-block" >
                  <i class="fas fa-user-plus"></i>Sign Up
                </button>

              </form>
              <br />
              <p className="text-center">
                Already have an account? Login <Link to="/login">here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage;