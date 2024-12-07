
import { Routes, Route } from "react-router";
import Header from './Component/Header'

import Moviefeed from './Component/MovieFeed'
import Moviedetail from "./Component/Moviedetail";
function App() {
  return (
    <div>
      <Header/>
      <Routes>
      <Route path="/" element={<Moviefeed/>}></Route>
      <Route path="/movie/:id" element={<Moviedetail/>}></Route>
      </Routes>
    </div>
  )
}

export default App