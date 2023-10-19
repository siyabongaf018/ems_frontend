import React, { useEffect, useState } from "react";
import { ListEmployee, deleteEmployee } from "../services/EmployeeServices";
import { useNavigate } from "react-router-dom";
import { getAllDeparment } from "../services/DepartmentServices";

const ListEmployeeComponent = () => {
  const [employee, setEmployee] = useState([]);
  // const [departmentData, setDepartmentData] = useState([]);
  const navigate = useNavigate();
  /* ListEmployee() - this method is defined in employee service file. 
  it returns data from the database using axios.

  this method return a promise and set the response to the useState. 
  the() this takes a promise object

  response.data - this has the data from the database
  */
  useEffect(() => {
    getAllEmployee();
    // LoadDepartmentData();
  }, []);

  function getAllEmployee() {
    ListEmployee()
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => console.error(error));
  }

  //for department 
  // const LoadDepartmentData = () => {
  //   getAllDeparment()
  //     .then((response) => {
  //       setDepartmentData(response.data);
  //     })
  //     .catch((error) => console.error(error));
  // };

  const addNewEmployee = () => {
    navigate("/addEmployee");
  };

  const updateEmployee = (employeeId) => {
    navigate(`/editEmployee/${employeeId}`);
  };

  const deleteEmployeebyID = (employeeId) => {
    console.log(employeeId);
    deleteEmployee(employeeId)
      .then((response) => {
        getAllEmployee();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">List of Employee</h2>
      {/* buttong to add new employee mb-2 means margin bottom 2 */}
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className="table tale-striped table-bordered">
        <thead >
          <tr >
            <th>Employee id</th>
            <th>Employee Lirst Name</th>
            <th>Employee Last Name</th>
            <th>Employee email</th>
            {/* <th>Department</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((employee, index) => (
            <tr key={index}>      
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              {/* <td>{employee.departmentId}</td> */}
              <td>
                <button
                  className="btn mb-2"
                  onClick={() => updateEmployee(employee.id)}
                >
                  🖊
                </button>
                <button
                  className="btn mb-2"
                  onClick={() => deleteEmployeebyID(employee.id)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      { employee.length === 0 && <h2>No Employees</h2>
      }
     
    </div>
  );
};

export default ListEmployeeComponent;
