import { useEffect, useState } from 'react';
import {BrowserRouter, Route, Routes,Navigate} from 'react-router-dom'
import HomePage from './components/Pages/Home';
import Navbar from './components/Pages/Navbar';
import Footer from './components/Pages/Footer';
import AddCase from './components/Cases/AddCase';
import DisplayCaseDetails from './components/Cases/caseDetails';
import LawyerProfile from './components/Lawyers/lawyerProfile';
import ListLawyers from './components/Lawyers/listLawyers';
import Profile from './components/Users/userProfile';
import UserAuth from './components/userAuth';
import Dashboard from './components/Pages/Dashboard';
import LawyerDetails from './components/Lawyers/lawyerDetails';
// import { useEffect } from 'react';
function App() {
  const [user,setUser]=useState(null)
  useEffect(()=>{
    if(localStorage.getItem("user"))
      setUser(JSON.parse(localStorage.getItem('user')))
  },[localStorage,user])
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div>
      <Routes>
        <Route
          exact path="/"
          element={<HomePage/>}
          />
        <Route
          exact path="/addCases"
          element={<AddCase/>}
          />
        <Route
          exact path="/caseDetails"
          element={<DisplayCaseDetails/>}
          />
        <Route
          exact path="/lawyerDetails/:id"
          element={<LawyerDetails/>}
          />
        <Route
          exact path="/lawyerProfile"
          element={<LawyerProfile/>}
          />
        <Route
          exact path="/lawyersList"
          element={<ListLawyers/>}
          />
        <Route
          exact path="/profile"
          element={<Profile/>}
          />
        <Route
          exact path="/auth"
          element={<UserAuth/>}
          />
        <Route
          exact path="/dashboard"
          element={user ? <Dashboard/>:<UserAuth/>}
          />
      </Routes>
      </div>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
