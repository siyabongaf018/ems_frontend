import axios from "axios";


const REST_API_BASE_URL = "http://localhost:8080/api/departments";
  
export const getAllDeparment =()=>  axios.get(REST_API_BASE_URL);

export const getDeparmentById =(departmentId)=>  axios.get(REST_API_BASE_URL +'/'+ departmentId);

export const createDepartment =(departmentDetails)=>  axios.post(REST_API_BASE_URL, departmentDetails);

export const updateDeparmentById =(departmentDetails,departmentId)=>  axios.put(REST_API_BASE_URL +'/'+ departmentId,departmentDetails);

export const deleteDeparmentById =(departmentId)=>  axios.delete(REST_API_BASE_URL +'/'+ departmentId);
