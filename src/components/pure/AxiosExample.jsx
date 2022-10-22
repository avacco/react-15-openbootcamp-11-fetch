import React, {useState, useEffect} from 'react';
import {getRandomUser} from '../../services/axios-service';

const AxiosExample = () => {
  

  
  const [user, setUser] = useState(null);

  const obtainUser = () => {
    getRandomUser()
    .then((response) => {
      if(response.status === 200){
        setUser(response.data.results[0]);
      }
    })
    .catch((error) => {
      alert(`Algo ha ido mal: ${error}`);
    })
  }

  return (
    <div>
      <h1>Ejemplo con Axios</h1>
      <p>Generar un nuevo usuario</p>
      <button onClick={() => obtainUser()}>Aleatorio</button>
      { user != null ?
        (
          <div>
            <h2>Datos:</h2> 
            <img alt='avatar' src={user.picture.large}></img>
            <h2>{user.name.title} {user.name.first} {user.name.last}</h2>
            <h3>{user.email}</h3>
          </div>
        )
        :
        (
          <div></div>
        )         
        
      }
    </div>
  );
}

export default AxiosExample;
