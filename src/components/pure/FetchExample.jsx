import React, {useState, useEffect} from 'react';
import { getAllUsers, getAllPagedUsers, getUserDetails, login } from '../../services/fetchService';

const FetchExample = () => {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [pages, setPages] = useState(2);
  const [totalUsers, setTotalUsers] = useState(12);
  const [usersPerPage, setUsersPerPage] = useState(6);

  useEffect(() => {
    obtainUsers();
  }, []);


  const obtainUsers = () => {
    getAllUsers()
      .then((response) => {
        console.log('Todos los usuarios ', response.data);
        setUsers(response.data);
        setPages(response.total_pages);
        setTotalUsers(response.total);
        setUsersPerPage(response.per_page);
      })
      .catch((error) => {
        alert(`Error al conseguir los usuarios: ${error}`);
      })
      .finally(() => {
        console.log('Usuarios obtenidos:');
        console.table(users); 
      })
  }

  const obtainPagedUsers = (page) => {
    getAllPagedUsers(page)
    .then((response) => {
      console.log('Todos los usuarios paginados', response.data);
      setUsers(response.data);
      setTotalUsers(response.total);
      setUsersPerPage(response.per_page);
      setPages(response.total_pages);
    })
    .catch((error) => {
      alert(`Error consiguiendo usuarios: ${error}`)
    })
    .finally(() => {
      console.log('Usuarios obtenidos:');
      console.table(users);
    });
  }

  const obtainUserDetails = (id) => {
    getUserDetails(id)
    .then((response) => {
      console.log('Usuario por id: ', response.data);
      setSelectedUser(response.data);
    })
    .catch((error) => {
      alert(`Error consiguiendo usuario: ${error}`)
    })
    .finally(() => {
      console.log('Usuario obtenido:');
      console.log(selectedUser.first_name);
      console.table(selectedUser);
    });
  }

  const authUser = () => {
    login("eve.holt@reqres.in","cityslicka")
      .then((response) => {
        console.log('TOKEN: ', response.token);
        sessionStorage.setItem('token',response.token)
      })
      .catch((error) => {
        alert(`Error al ingresar: ${error}`)
      })
      .finally(() => {
        console.log('Ingreso exitoso:');
      });
  }

  return (
    <div>
      <h2>
        Usuarios:
      </h2>
      {users.map((user, index) => 
      (<p onClick={() => obtainUserDetails(user.id)} key={index}>
        {user.first_name} {user.last_name}
      </p>)
      )}
      <p>Mostrando {usersPerPage} usuarios de {totalUsers}</p>
      <button onClick={() => obtainPagedUsers(1)}>1</button>
      <button onClick={() => obtainPagedUsers(2)}>2</button>
      <button onClick={() => authUser()}>Simular inicio sesion</button>
      <div>
        { selectedUser && (
        <div>
          <h3>Detalles de usuario:</h3>
          <p>Nombre: {selectedUser.first_name}</p>
          <p>Apellido: {selectedUser.last_name}</p>
          <p>Correo: {selectedUser.email}</p>
          <img alt='Avatar' src={selectedUser.avatar} style={{height:'50px', width:'50px'}}></img>
        </div>
        )}
        
      </div>
    </div>
  );
}

export default FetchExample;
