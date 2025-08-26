import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./landing_page/home/HomePage";
import SignupPage from "./landing_page/signup/SignupPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./landing_page/login/LoginPage";
import StudentDetails from "./landing_page/StudentDetails/StudentDetails";
import TutorDetails from "./landing_page/Tutor/TutorDetails";
import ProtectedRoutes from "./components/ProtectedRoutes";
import TutorDash from "./dashboard/tutors/TutorDash";
import StudDash from "./dashboard/students/StudDash";
import Tutor from "./dashboard/students/Tutor"
import Student from "./dashboard/tutors/Student";
import EditStudent from "./components/EditStudent";
import EditTutor from "./components/EditTutor"
import AllStudents from "./dashboard/tutors/AllStudents";
import AllTutors from "./dashboard/students/AllTutors";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <HomePage/>

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/students" element={<TutorDash />} />
      <Route path="/tutors" element={<StudDash />} />
      {/* <Route path="/student-dashboard" element={<StudentDashboard />} /> */}
      <Route
        path="/student-details"
        element={
          <ProtectedRoutes>
            <StudentDetails />
          </ProtectedRoutes>
        }
      />
      {/* <Route path="/tutor-dashboard" element={<TutorDashboard />} /> */}
      <Route
        path="/tutor-details"
        element={
          <ProtectedRoutes>
            <TutorDetails />
          </ProtectedRoutes>
        }
      />
      <Route path="/tutor-dashboard" element={<TutorDash/>}/>
      <Route path="/student-dashboard" element={<StudDash/>}/>
       <Route
    path="/tutors/:id"
    element={
        <Tutor/>
    }
  />
  <Route path="/students/:id" element={<Student/>}/>
  {/* <Route path="/students/:id/edit" element={<EditStudent />} /> */}
  <Route path="/students/edit" element={<EditStudent />} />
  <Route path="/tutors/edit" element={<EditTutor />} />

  {/* <Route path="/tutors/:id/edit" element={<EditTutor/>} /> */}
  
    </Routes>
    
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
