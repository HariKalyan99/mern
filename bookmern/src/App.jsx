import React from "react"
// import axios from 'axios'
import {Route, Routes} from 'react-router-dom'
import Createbooks from "./pages/Createbooks"
import Deletebooks from "./pages/Deletebooks"
import Editbooks from "./pages/Editbooks"
import Home from "./pages/Home"
import Showbook from "./pages/Showbook"

function App() {



  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/books/create" element={<Createbooks />} />
      <Route path="/books/details/:id" element={<Showbook/>} />
      <Route path="/books/delete/:id" element={<Deletebooks />} />
      <Route path="/books/edit/:id" element={<Editbooks/>} />
    </Routes>
  )
}

export default App
