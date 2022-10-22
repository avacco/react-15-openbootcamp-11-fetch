import React from 'react';
import { createUser, deleteUserByID, getAllPagedUsers, getAllUsers, getUserById, login, updateUserById } from '../../services/axios-crud-service';
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
  
  const initialCredentials = {
    email: '',
    password: ''
  }

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

  // Ejemplos CRUD
  const obtainAllUsers = () => {
    getAllUsers()
    .then((response) => {
      if(response.data && response.status === 200){
       alert(JSON.stringify(response.data.data));
      }else{
        throw new Error('No se han encontrado usuarios');
      }
    })
    .catch((error) => alert(`Algo se rompió: ${error}`))
  }

  const obtainAllPagedUsers = (page) => {
    getAllPagedUsers(page)
    .then((response) => {
      if(response.data && response.status === 200){
        alert(JSON.stringify(response.data.data));
      }else{
        throw new Error(`No se encontraron usuarios en la página ${page}`)
      }
    })
    .catch((error) => alert(`Algo se rompió: ${error}`))
  }

  const obtainUserByID = (id) => {
    getUserById(id)
    .then((response) => {
      if(response.data && response.status === 200){
        alert(JSON.stringify(response.data.data));
      }else{
        throw new Error('No se han encontrado el usuario');
      }
    })
    .catch((error) => alert(`Algo se rompió: ${error}`))
  }

  const createNewUser = (name, job) => {
    createUser(name,job)
    .then((response) => {
      if(response.status === 201){
        alert(JSON.stringify(response.data));
      }else{
        throw new Error('No se pudo crear el usuario');
      }
    })
    .catch((error) => alert(`Algo se rompió: ${error}`))
  }

  const updateUser = (id, name, job) => {
    updateUserById(id,name,job)
    .then((response) => {
      if(response.data && response.status === 200){
        alert(JSON.stringify(response.data));
      }else{
        throw new Error('No se ha actualizado el usuario');
      }
    })
    .catch((error) => alert(`Algo se rompió: ${error}`))
  }

  const deleteUser = (id) => {
    deleteUserByID(id)
    .then((response) => {
      if(response.status === 204){
        alert(`Usuario con id ${id} borrado`);
      }else{
        throw new Error('No se ha borrado el usuario');
      }
    })
    .catch((error) => alert(`Algo se rompió: ${error}`))
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
      <br/><br/>
      {/* Botones para prueba de respuestas de API */}
      <div>
            <button onClick={obtainAllUsers}>Obtener todos los usuarios con axios</button><br/>
            <button onClick={() => obtainAllPagedUsers(2)}>Obtener todos los usuarios paginados (página 2) con axios</button><br/>
            <button onClick={() => obtainUserByID(3)}>Obtener usuario por id (3) con axios</button><br/>
            <button onClick={() => createNewUser('morpheus', 'leader')}>Crear usuario con datos predeterminados</button><br/>
            <button onClick={() => updateUser(1,'morpheus', 'Developer')}>Actualiza usuario con datos predeterminados</button><br/>
            <button onClick={() => deleteUser(1)}>Borrar usuario por ID</button><br/>
      </div>
    </div>
    
  );
}

export default AxiosCRUDExample;
