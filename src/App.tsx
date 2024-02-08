import "./App.css"
import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header"
import MainPage from "./pages/MainPage/MainPage"
import ComponentPage from "./pages/ComponentPage/componentPage"
import Breadcrumps from "./components/Breadcrumps/Breadcrumps"
import RegPage from "./pages/RegPage/RegPage"
import AuthPage from "./pages/AuthPage/AuthPage"
import ApplicationsHistoryTable from "./components/ApplicationsHistoryTable/ApplicationsHistoryTable"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
// import store from "./store/store";
import Cookies from "universal-cookie"
import { Response, cardInfoProps } from "./types"
import { updateCart, updateUser } from "./store/userSlice"
import React, { useState } from "react"
import Cart from "./components/Cart/Cart"
import CartPage from "./pages/CartPage/CartPage"
import ApplicationsHistoryPage from "./pages/ApplicationsHistoryPage/ApplicationsHistoryPage"
import { RootState } from "./store/store"
import { setComponents } from "./store/filtersSlices"
import { setCart } from "./store/cartSlice"
import { ComponentsMock } from "./consts"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ComponentsList from "./pages/ComponentsList/ComponentsList"
import Sas from "./pages/sas"
import ComponentAdminPanel from "./pages/ComponentAdminPanel/ComponentAdminPanel"
const cookies = new Cookies()
function App() {
  const url = window.location.pathname.split("/").pop()
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const searchValue = useSelector(
    (state: RootState) => state.filter.input_value
  )
  const categoryValue = useSelector(
    (state: RootState) => state.filter.dropdown_value.name
  )
  const sliderValue = useSelector(
    (state: RootState) => state.filter.price_range
  )
  // const cart = useSelector((state: RootState) => state.cart.items.length)

  const login = async () => {
    try {
      const response: Response = await axios(
        "http://localhost:8000/user_info/",
        {
          method: "GET",
          withCredentials: true,
          // headers: {
          //   "Content-type": "application/json; charset=UTF-8",
          //   Authorization: `Bearer ${cookies.get("access_token")}`,
          // },
        }
      )
      console.log(response.data)
      dispatch(
        updateUser({
          is_authenticated: true,
          is_moderator: response.data["is_moderator"],
          user_id: response.data["user_id"],
          user_email: response.data["email"],
          current_cart: response.data["current_cart"],
        })
      )
    } catch {
      console.log("Пользоатель не авторизован!!!")
    }
  }

  const fetchData = async () => {
    try {
      const params = searchValue
      ? `?search=${encodeURIComponent(searchValue)}&category=${encodeURIComponent(categoryValue)}`
      : `?category=${encodeURIComponent(categoryValue)}`;
    

      const response = await axios(`http://localhost:8000/components/${params}`, {
        method: "GET",
        withCredentials: true,
        // headers: {
        //   "Content-type": "application/json; charset=UTF-8",
        //   Authorization: `Bearer ${cookies.get("access_token")}`,
        // },
      })
      console.log(response)
      const components = response.data.components
      if (response.data.app_id) {
        dispatch(updateCart(response.data.app_id))
      }
      dispatch(setComponents(components))
      setIsLoading(false)
      console.log(response.data.app_id)
      return response.data.app_id
    } catch (error) {
      createMock()
      setIsLoading(false)
    }
  }

  const currentCart = useSelector((state: RootState) => state.user.current_cart)

  const fetchCart = async (app_id: number) => {
    try {
      const response: Response = await axios(
        `http://localhost:8000/applications/${app_id}/`,
        {
          method: "GET",
          withCredentials: true,
        }
      )
      console.log(response.data)
      const components = response.data.components
      dispatch(setCart(components))
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (cookies.get("access_token")) {
      login()
      // fetchCart()
    }
  })
  React.useEffect(() => {
    handleSmt()
    // const cartId = await fetchData()
  })
  const handleSmt = async () => {
    const cartId = await fetchData()
    await fetchCart(cartId)
  }

  const createMock = () => {
    let filteredComponents: cardInfoProps[] = ComponentsMock.filter(
      (component) => component.available == true
    )

    if (searchValue) {
      filteredComponents = filteredComponents.filter((component) =>
        component.title.includes(searchValue)
      )
    }

    if (sliderValue) {
      filteredComponents = filteredComponents.filter(
        (component) =>
          component.price > sliderValue[0] && component.price < sliderValue[1]
      )
    }

    if (categoryValue != "Любая категория") {
      filteredComponents = filteredComponents.filter(
        (component) => component.category == categoryValue
      )
    }
    dispatch(setComponents(filteredComponents))
  }
  return (
    <>
      <Header />
      <Breadcrumps />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/cubeshop/" replace />}
        />
        <Route
          path="/cubeshop/"
          element={<MainPage loading={isLoading} />}
        />
        <Route path="/cubeshop/:id" element={<ComponentPage />} />
        <Route
          path="/cubeshop/registration"
          element={<RegPage />}
        />
        <Route path="/cubeshop/auth" element={<AuthPage />} />
        <Route
          path="/cubeshop/history"
          element={<ApplicationsHistoryPage />}
        />
        <Route path="/cubeshop/cart" element={<CartPage />} />
        <Route
          path="/cubeshop/application/:id"
          element={<CartPage />}
        />
        <Route
          path="/cubeshop/components-list"
          element={<ComponentsList />}
        />
        <Route
          path="/cubeshop/components-list/:id"
          element={<ComponentAdminPanel />}
        />
      </Routes>
      <ToastContainer autoClose={1000} pauseOnHover={false} />
    </>
  )
}

export default App
