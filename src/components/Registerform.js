/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import {
  auth, createUserProfileDocument
} from '../firebase';

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

const RegisterForm = () => {
  return (
    <div>
      <Typography variant="h3" align="center">
        Create account
      </Typography>
      <Formik
        initialValues={{
          displayName: '',
          email: '',
          password: '',
          passwordConfirm: ''
        }}
        onSubmit={async (values, actions) => {
          try {
            const { email, password, displayName } = values;
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            createUserProfileDocument(user, { displayName });
          } catch (error) {
            console.error(error);
          } finally {
            actions.setSubmitting(false);
          }
        }}
        validationSchema={Yup.object().shape({
          displayName: Yup
            .string()
            .min(5, 'Must contain at least ${min} characters')
            .max(15, 'May contain no more than ${max} characters')
            .required('Required'),
          email: Yup
            .string()
            .email('Invalid email')
            .required('Required'),
          password: Yup
            .string()
            .min(8, 'Must contain at least ${min} characters')
            .required('Required'),
          passwordConfirm: Yup
            .string()
            .oneOf([Yup.ref('password'), null], "Passwords don't match!")
            .required('Required')
        })}
      >
        {(formData) => (
          <Form>
            <LayoutWrapper>
              <FormTextField
                name="displayName"
                type="text"
                placeholder="Display Name"
              />
              <FormTextField
                name="email"
                type="email"
                placeholder="Email"
              />
              <FormTextField
                name="password"
                type="password"
                placeholder="Password"
              />
              <FormTextField
                name="passwordConfirm"
                type="password"
                placeholder="Confirm Password"
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={formData.isSubmitting}
              >
                Register
              </Button>
            </LayoutWrapper>
            {/* <pre>{JSON.stringify(props.values, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
