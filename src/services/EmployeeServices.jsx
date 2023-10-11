import axios from "axios";

//declaring the base url 
const REST_API_BASE_URL = "http://localhost:8080/api/employees";

//this will retun all the employee from the database
export const ListEmployee = () => axios.get(REST_API_BASE_URL);

//this will add new employee to the databse. the post method acccept two parameter. 
// the url and the employee data which is passed using as an argument
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL,employee);

// this will get the data for a specific employee with the provided id
export const getEmployee = ( employeeId) => axios.get(REST_API_BASE_URL + '/'+employeeId);

// this will get the data for a speci
export const updateEmployee = (employee, employeeId) => axios.put(REST_API_BASE_URL + '/'+employeeId,employee);

export const deleteEmployee = ( employeeId) => axios.delete(REST_API_BASE_URL + '/'+employeeId);

