import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api';

class TourDataService {

    getAll(){
        return axios.get(API_URL+"/tour" , {headers : authHeader()});
    }

    getPublished(){
        return axios.get(API_URL+"/tour/published" );
    }

    get(id){
        return axios.get(`${API_URL}/tour/${id}`, {headers : authHeader()});
    }

    getUser(id){
        return axios.get(`${API_URL}/tour/user/${id}`, {headers : authHeader()});
    }

    create(data){
      //  console.log(axios.post(API_URL+"/tour",data ,{headers : authHeader()}));
        return axios.post(`${API_URL}/tour`,data ,{headers : authHeader()});
    }

    update(id, data){
        return axios.put(`${API_URL}/tour/${id}`, data, {headers : authHeader()});
    }

    delete(id) {
        //console.log(axios.delete(`${API_URL}/tour/${id}`), {headers : authHeader()});
        return axios.delete(`${API_URL}/tour/${id}`, {headers : authHeader()});
    }

    deleteUser(id) {
        //console.log(axios.delete(`${API_URL}/tour/${id}`), {headers : authHeader()});
        return axios.delete(`${API_URL}/tour/user/${id}`, {headers : authHeader()});
    }
    
    deleteAll() {
        return axios.delete(`${API_URL}/tour`, {headers : authHeader()});
    }
    
    findByTitle(title) {
        return axios.get(`${API_URL}/tour?title=${title}`, {headers : authHeader()});
    }
}

export default new TourDataService;