import "./App.scss"
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"

export default function App() {

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
