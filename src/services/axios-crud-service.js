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