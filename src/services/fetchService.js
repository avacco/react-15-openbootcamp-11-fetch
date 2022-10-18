export const getAllUsers = async() => {
  
  let response = await fetch(`https://reqres.in/api/users`)
  // Retorna en JSON los datos
  return response.json();
}

export const getAllPagedUsers = async(page) => {
  let response = await fetch(`https://reqres.in/api/users?page=${page}`)
  return response.json();
}

export const getUserDetails = async(id) => {
  let response = await fetch(`https://reqres.in/api/users/${id}`)
  return response.json();
}

export const login = async(email, password) => {
  let body = {
    email,
    password,
  };
  

  let response = await fetch('https://reqres.in/api/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  return response.json();
}