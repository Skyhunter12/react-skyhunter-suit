import axios from 'axios';

const axiosClient = axios.create();

let headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

axiosClient.defaults.headers['Content-Type']='application/json'
// axiosClient.defaults.headers['Accept']='application/json'
//All request will wait 2 seconds before timeout
// axiosClient.defaults.timeout = 2000;

// axiosClient.defaults.withCredentials = true;

export function getRequest(URL:string) {
    return axiosClient.get(`${URL}`).then(response => response);
  }
  
  export async function postRequest(URL:string, payload:any) {
    console.log("axios 22",URL, axiosClient)
    return await axiosClient.post(URL, payload).then(response => response);
  }
  
  export function patchRequest(URL:string, payload:Object) {
    return axiosClient.patch(URL, payload).then(response => response);
  }
  
  export function deleteRequest(URL:string) {
    return axiosClient.delete(URL).then(response => response);
  }