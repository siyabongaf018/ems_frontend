import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeComponent from "./components/EmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListDepartmentComponent from "./components/ListDepartmentComponent";
import DepartmentComponent from "./components/DepartmentComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter> 
      {/* header component here  */}
      <HeaderComponent /> 
        <Routes>
          <Route path="/" element={<ListEmployeeComponent />}></Route>
          {/* http://localhost:5173/employee */}
          <Route path="/employee" element={<ListEmployeeComponent />}></Route>
          {/* http://localhost:5173/addEmployee */}
          <Route path="/addEmployee" element={<EmployeeComponent />}></Route>
          {/* http://localhost:5173/editEmployee/1 */}
          <Route path="/editEmployee/:id" element={<EmployeeComponent />}></Route>

          {/* http://localhost:5173/department */}
          <Route path="/department" element={<ListDepartmentComponent />}></Route>
          {/* http://localhost:5173/addDepartment */}
          <Route path="/addDepartment" element={<DepartmentComponent />}></Route>
          {/* http://localhost:5173/editDepartment/1 */}
          <Route path="/editDepartment/:id" element={<DepartmentComponent />}></Route>


        </Routes>
      </BrowserRouter>
      {/* footer componente herer  <FooterComponent /> */}
    </>
  );
}

export default App;
