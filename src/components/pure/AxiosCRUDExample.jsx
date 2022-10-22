import React from 'react';
import { login } from '../../services/axios-crud-service';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape(
  {
    // Validaciones. Email y password deben ser strings y son necesarios, el primero con el formato convencional para un correo.
    email: Yup.string().email('Formato inválido').required('Es necesario una dirección de correo'),
    password: Yup.string().required('Requiere una contraseña')
  }
);

const AxiosCRUDExample = () => {
  
  const authUser = (values) => {
    login(values.email,values.password)
      .then((response) => {
        if(response.data.token){
          alert(JSON.stringify(response.data.token));
          sessionStorage.setItem('token', response.data.token);
        }else{
          sessionStorage.removeItem('token');
          throw new Error('Login failure');
        }
      })
      .catch((error) => alert(`Hubo un error: ${error}`))
      .finally(() => console.log('Finalizado'));
  }

  const initialCredentials = {
    email: '',
    password: ''
  }
  
  return (
<div>
      <h4>Login Formik</h4>
      <Formik
        initialValues={ initialCredentials }
        validationSchema={ loginSchema }
        onSubmit={ async (values) => {
          authUser(values)
        }}
      >
  
        {({           
          values, 
          touched,
          errors, 
          isSubmitting, 
          handleChange, 
          handleBlur 
         }) => (

          <Form>
            <label htmlFor='email'>Correo</label>
            <Field id='email' name='email' placeholder='eve.holt@reqres.in' type='email' />
    
            {/* Error de correo */}
            {
              errors.email && touched.email && 
              (
                <ErrorMessage name='email' component='div'/>
              )
            }
<br/>
            <label htmlFor='password'>Contraseña</label>
            <Field id='password' type='password' name='password' placeholder='cityslicka' />
            <br/>
            {/* Error de password */}
            {
              errors.password && touched.password && 
              (
                <div>
                  <ErrorMessage name='password'/>
                </div>
              )
            }

            <button type='submit'>Enviar</button>

            {isSubmitting ? (<p>Ingresando tus credenciales...</p>) : null}

          </Form>
        )}

        

      </Formik>
    </div>
  );
}

export default AxiosCRUDExample;
