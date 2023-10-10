import React, { useEffect, useState } from "react";
import { ListEmployee } from "../services/EmployeeServices";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
 
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();
  /* ListEmployee() - this method is defined in employee service file. 
  it returns data from the database using axios.

  this method return a promise and set the response to the useState. 
  the() this takes a promise object

  response.data - this has the data from the database
  */
  useEffect(() => {
    ListEmployee()
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const addNewEmployee =() =>{
    navigate("/addEmployee");

  }

  return (
    <div className="container">
      <h2 className="text-center">List of Employee</h2>
      {/* buttong to add new employee mb-2 means margin bottom 2 */}
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
      <table className="table tale-striped table-bordered">
        <thead>
          <tr>
            <th>Employee id</th>
            <th>Employee Lirst Name</th>
            <th>Employee Last Name</th>
            <th>Employee email</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
