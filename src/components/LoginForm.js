import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { auth } from '../firebase';

import FormTextField from './FormTextField';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > .MuiFormControl-root {
    height: 2rem;
  }

  && > * {
    margin: 1rem 0;
  }
`;

const LoginForm = () => {
  return (
    <div>
      <Typography variant="h3" align="center">
        Sign in
      </Typography>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={({ email, password }, actions) => {
          auth.signInWithEmailAndPassword(email, password)
            .catch((error) => {
              console.error(error.message);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
        validationSchema={Yup.object().shape({
          email: Yup
            .string()
            .email('Invalid Email')
            .required('Required'),
          password: Yup
            .string()
            .required('Required')
        })}
      >
        {(formData) => (
          <Form>
            <LayoutWrapper>
              <FormTextField
                name="email"
                type="email"
                placeholder="Email"
                fullWidth
              />
              <FormTextField
                name="password"
                type="password"
                placeholder="Password"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={formData.isSubmitting}
              >
                Log In
              </Button>
            </LayoutWrapper>
            {/* <pre>{JSON.stringify(props.values, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
