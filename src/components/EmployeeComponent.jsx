import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeServices";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDeparment } from "../services/DepartmentServices";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  //adding department in the this component
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();
  //getting the id form the url
  const { id } = useParams();

  //useEffect to get departments
  useEffect(() => {
    getAllDeparment()
      .then((response) => {
        setDepartments(response.data);

      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //for errors
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: ""
  });

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setDepartmentId(response.data.departmentId);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const saveEmployee = (e) => {
    e.preventDefault();
   console.log(departments);
   console.log(departmentId);
    if (validateForm()) {
      const employee = { firstName, lastName, email,departmentId };
      console.log(employee);
      //check if id has value if true then we call the update function from service else we save the data to the database
      if (id) {
        updateEmployee(employee, id).then((response) => {
          console.log(response.data);
          navigate("/employee");
        });
      } else {
        //calling the createEmployee from ../services/EmployeeServices to perfom crud operation which is add to the database
        createEmployee(employee).then((response) => {
          console.log(response.data);
          navigate("/employee");
        });
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorCopy = { ...errors };

    if (firstName.trim()) {
      errorCopy.firstName = "";
    } else {
      errorCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorCopy.lastName = "";
    } else {
      errorCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      if (!email.toString().includes("@") || !email.toString().includes(".")) {
        errorCopy.email = "Enter valid email address";
        valid = false;
      } else {
        errorCopy.email = "";
      }
    } else {
      errorCopy.email = "Email is required";
      valid = false;
    }

    if (departmentId.trim()) {
      errorCopy.department = "";
    } else {
      errorCopy.department = "Department is required";
      valid = false;
    }

    setErrors(errorCopy);
    return valid;
  };

  const pageTitle = () => {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3 ">
          {pageTitle()}
          <div className="card-body">
            <form action="">
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee first Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {/* display the error message */}
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {/* display the error message */}
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">email:</label>
                <input
                  type="email"
                  placeholder="Enter Employee email address"
                  name="email"
                  value={email}
                  required
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* display the error message */}
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Select Department:</label>
                <select
                   className={`form-control ${errors.department ? "is-invalid" : ""}`}
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                >
                  <option value="">Select department</option>
                  
                  {departments.map((departmentOptions,index) => (
                    <option
                      key={index}
                      value={departmentOptions.id}
                    > 
                      {departmentOptions.departmentName}
                    </option>
                  ))}
                </select>
                {/* display the error message */}
                {errors.department && (
                  <div className="invalid-feedback">{errors.department}</div>
                )}
              </div>
              <button className="btn btn-success" onClick={saveEmployee}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
