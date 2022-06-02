import axios from 'axios';
import *  as constants from '../utils/constants';

const config = {
   api: 'https://petstore.swagger.io/v2/pet',
   options: {
     headers: { 'content-type': 'application/json' },
   },
 };

export const getPetsByStatus = (endpoint) => {
   return fetch(`${config.api}${endpoint}`, {
     ...config.options,
   })
     .then((response) => handleResponse(response))
     .then((response) => response)
     .catch((error) => {
       console.error(error);
       throw Error(error);
     });
 };

 export const deletePet = (endpoint) => {
  return fetch(`${config.api}${endpoint}`, {
    ...config.options,method:"DELETE"
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};

export const addPet = (pet,endpoint) => {
  return fetch(`${config.api}${endpoint}`, {
    ...config.options,method:"POST",body:JSON.stringify(pet)
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};

export const updatePet = (pet,endpoint) => {
  return fetch(`${config.api}${endpoint}`, {
    ...config.options,method:"PUT",body:JSON.stringify(pet)
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};

 const handleResponse = (response) => {
   if (response.status === 200) {
     return response.json();
   } else {
     throw Error(response.json() | 'error');
   }
 };

 export default { addPet,updatePet,getPetsByStatus,deletePet }


