import React, { useEffect, useState } from "react";
import {
  getAllDeparment,
  deleteDeparmentById,
} from "../services/DepartmentServices";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ListDepartmentComponent = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    LoadDepartmentData();
  });
  const LoadDepartmentData = () => {
    getAllDeparment()
      .then((response) => {
        setDepartmentData(response.data);
      })
      .catch((error) => console.error(error));
  };
  const addNewDepartment = () => {
    navigate(`/addDepartment`);
  };

  const updateDepartment = (departmentId) => {
    navigate(`/editDepartment/${departmentId}`);
  };

  const onDeleteDepartmentbyID = (departmentId) => {
    console.log(departmentId);
    deleteDeparmentById(departmentId)
      .then((reposnse) => {
        LoadDepartmentData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">List of Departments</h2>
      {/* buttong to add new employee mb-2 means margin bottom 2 */}
      <button className="btn btn-primary mb-2" onClick={addNewDepartment}>
        Add Department
      </button>
      <table className="table tale-striped table-bordered">
        <thead>
          <tr>
            <th>Department id</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {departmentData.map((department, index) => (
            <tr key={index}>
              <td>{department.id}</td>
              <td>{department.departmentName}</td>
              <td>{department.departmentDescription}</td>
              <td>
                <button
                  className="btn mb-2"
                  onClick={() => updateDepartment(department.id)}
                >
                  🖊
                </button>
                <button
                  className="btn mb-2"
                  onClick={() => onDeleteDepartmentbyID(department.id)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {departmentData.length === 0 && <h2>No Departments</h2>}
    </div>
  );
};

export default ListDepartmentComponent;
