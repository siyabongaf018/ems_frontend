import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createDepartment,
  getDeparmentById,
  updateDeparmentById,
} from "../services/DepartmentServices";

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    Name: "",
    Description: "",
  });

  useEffect(() => {
    if (id) {
      getDeparmentById(id)
        .then((response) => {
          setDepartmentName(response.data.departmentName);
          setDepartmentDescription(response.data.departmentDescription);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);


  const pageTitle = () => {
    if (id) {
      return <h2 className="text-center">Edit Department</h2>;
    } else {
      return <h2 className="text-center">Add Department</h2>;
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorCopy = { ...errors };

    if (departmentName.trim()) {
      errorCopy.Name = "";
    } else {
      errorCopy.Name = "Department name is required";
      valid = false;
    }

    if (departmentDescription.trim()) {
      errorCopy.Description = "";
    } else {
      errorCopy.Description = "Department Description is required";
      valid = false;
    }

    setErrors(errorCopy);
    return valid;
  };

  const saveDepartment = (e) => {
    e.preventDefault();

    // check if the form input has values
    if (validateForm()) {
      const department = { departmentName, departmentDescription };
      console.log(department);
      if (id) {
        updateDeparmentById(department, id)
          .then((response) => {
            console.log(response.data);
            console.log("Update");

            setDepartmentName("");
            setDepartmentDescription("");
            navigate("/department");
          })
          .catch((error) => console.error(error));
      } else {
        createDepartment(department)
          .then((response) => {
            console.log(response.data);
            console.log("create");

            setDepartmentName("");
            setDepartmentDescription("");
            navigate("/department");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3 ">
          {/* change the title of the page dynamically  */}
          {pageTitle()}
          <div className="card-body">
            {/* form to take handle dapartment data */}
            <form action="">
              <div className="form-group mb-2">
                <label className="form-label">Department Name:</label>
                <input
                  type="text"
                  placeholder="Enter Department Name"
                  name="departmentName"
                  value={departmentName}
                  className={`form-control ${
                    errors.Name ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
                {/* display the error message */}
                {errors.Name && (
                  <div className="invalid-feedback">
                    {errors.Name}
                  </div>
                )}
              </div>


              <div className="form-group mb-2">
                <label className="form-label">Department Description:</label>
                <input
                  type="text"
                  placeholder="Enter Department Description"
                  name="departmentDescription"
                  value={departmentDescription}
                  className={`form-control ${
                    errors.Description ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setDepartmentDescription(e.target.value)}
                />
                {/* display the error message */}
                {errors.Description && (
                  <div className="invalid-feedback">
                    {errors.Description}
                  </div>
                )}
              </div>

              {/* the submit button  */}
              <button className="btn btn-success" onClick={saveDepartment}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentComponent;
