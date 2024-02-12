import "./App.css"
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header"
import MainPage from "./pages/MainPage/MainPage"
import ComponentPage from "./pages/ComponentPage/ComponentPage"
import Breadcrumps from "./components/Breadcrumps/Breadcrumps"


function App() {
  return (
    <>
      <Header />
      <Breadcrumps />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/cubeshop/" element={<MainPage />} />
        <Route path="/cubeshop/:id" element={<ComponentPage />} />
      </Routes>
    </>
  )
}

export default App
