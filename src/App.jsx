import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeComponent from "./components/EmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter> 
      {/* header component here  */}
      <HeaderComponent /> 
        <Routes>
          <Route path="/" element={<ListEmployeeComponent />}></Route>
          <Route path="/employee" element={<ListEmployeeComponent />}></Route>
          <Route path="/addEmployee" element={<EmployeeComponent />}></Route>

        </Routes>
      </BrowserRouter>
      {/* footer componente herer  <FooterComponent /> */}
    </>
  );
}

export default App;
