import APIRequest from "../utils/config/axios.config";

export function getRandomUser() {
  return APIRequest.get('/', { // https://randomuser.me/api/ - Trae lo que esta en baseURL en el config
    validateStatus: function(status) {
      return status < 500
    }
  }); 
}