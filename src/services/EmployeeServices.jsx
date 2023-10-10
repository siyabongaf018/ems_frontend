import axios from "axios";

//declaring the base url 
const REST_API_BASE_URL = "http://localhost:8080/api/employees";

//this will retun all the employee from the database
export const ListEmployee = () => axios.get(REST_API_BASE_URL);

//this will add new employee to the databse. the post method acccept two parameter. 
// the url and the employee data which is passed using as an argument
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL,employee);
