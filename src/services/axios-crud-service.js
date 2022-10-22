import axios from "axios";

/**
 * Metodo de ingreso a endpoint de ReqRes
 * @param {string} email 
 * @param {string} password 
 */

export const login = (email, password) => {

  let body = {
    email: email,
    password: password
  }

  // Retorna la respuesta con una promesa
  return axios.post('https://reqres.in/api/login', body)
}

// Obtiene todos los usuarios
export const getAllUsers = () => {
  return axios.get('https://reqres.in/api/users');
}

// Obtiene todos los usuarios paginados
export const getAllPagedUsers = (page) => {
  return axios.get(`https://reqres.in/api/users?page=${page}`);
}

// Obtiene usuario por id
export const getUserById = (id) => {
  return axios.get(`https://reqres.in/api/users/${id}`);
}

// Crea usuario
export const createUser = (name, job) => {
  let body = {
    name: name,
    job: job
  }
  return axios.post('https://reqres.in/api/users',body);
}

// Actualiza usuario
export const updateUserById = (id, name, job) => {
  let body = {
    name: name,
    job: job
  }
  return axios.put(`https://reqres.in/api/users/${id}`,body);
}

// Borra usuario por id
export const deleteUserByID = (id) => {
  return axios.delete(`https://reqres.in/api/users/${id}`);
}


