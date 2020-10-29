import React from "react";
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import "./App.css";

import Card from "./components/Card";

function App() {

  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  return (
    <div className="App">
      <Card>
        <div className="content-app">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={
              Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string()
                  .max(8, 'Must be 8 characters or less')
                  .required('Required')
              })
            }
            // validate={values => {
            //   const errors = {};
            //   if (!values.email) {
            //     errors.email = 'Required';
            //   } else if (
            //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            //   ) {
            //     errors.email = 'Invalid email address';
            //   }
            //   return errors;
            // }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <label htmlFor="email">E-MAIL</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
                <button type="submit" disabled={isSubmitting}>
                  Login
                  </button>
              </Form>
            )}
          </Formik>
        </div>
      </Card>
    </div>
  );
}

export default App;
