import { useEffect } from "react"
import { Link } from "react-router-dom"
import Card from "../../components/Card/Card"
import DropDown from "../../components/Dropdown/Dropdown"
import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"
import Skeleton from "../../components/Skeleton/Skeleton"
import { RootState } from "../../store/store"
import styles from "./mainpage.module.scss"
import { useDispatch, useSelector } from "react-redux"
import {
  setDropdownValueId,
  setDropdownValueName,
  setInputValue,
} from "../../store/filtersSlices"
import Component from "../../types"
import { cardInfoProps } from "../../types"
import {CATEGORIES } from "../../consts"

import axios from "axios"

import { updateCart } from "../../store/userSlice"
import { Response } from "../../types"
import { toast } from "react-toastify"
import { setCart } from "../../store/cartSlice"

interface MainPageProps {
  loading: boolean
}
const MainPage: React.FC<MainPageProps> = ({ loading }) => {
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
  const components = useSelector((state: RootState) => state.filter.components)

  const addComponentToApp = async (id: number) => {
    try {
      const response: Response = await axios(
        `http://localhost:8000/components/${id}/add_to_application/`,
        {
          method: "POST",
          withCredentials: true,
        }
      )
      console.log(response.data)
      if (response.data) {
        dispatch(updateCart(response.data.id))
        dispatch(setCart(response.data.components))
      }
      toast.success("Добавлено в корзину", {
        icon: "⚡",
      })
      //🛩⚡✅✈
    } catch (e) {
      console.log(e)
      toast.error("Сперва авторизируйтесь", {
        icon: "😕",
      })
    }
  }

  const currentCart = useSelector((state: RootState) => state.user.current_cart)
  const fetchCart = async () => {
    try {
      const response: Response = await axios(
        `http://localhost:8000/applications/${currentCart}`,
        {
          method: "GET",
          // withCredentials: true,
        }
      )
      console.log(response.data)
      const components = response.data.components
      dispatch(setCart(components))
    } catch (error) {
      console.log(error)
    }
  }

  const cardAddButtonClick = (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation()
    e.preventDefault()
    addComponentToApp(id)
    setTimeout(() => {
      fetchCart()
    }, 200)
  }
  useEffect(() => {
    fetchCart()
  }, [])

  const handleSelect = (selectedComponent: Component) => {
    dispatch(setDropdownValueName(selectedComponent.name))
    dispatch(setDropdownValueId(selectedComponent.id))
  }

  return (
    <div className={styles.mainpage}>
      <div className={styles.container}>

        <div className={styles.mainpage__actions}>
          <div className={styles.mainpage__input}>
            <Input
              searchValue={searchValue}
              onChangeValue={(i) => dispatch(setInputValue(i))}
            />
            <Button>Поиск</Button>
          </div>
          <div className={styles.mainpage__filters}>
            <DropDown
              handleSelect={handleSelect}
              components={CATEGORIES}
              title={categoryValue}
            />
          </div>
        </div>

        <div className={styles.mainpage__inner}>
          {loading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : components.map((item: cardInfoProps) => (
                <Link
                  to={`/cubeshop/${item.id}`}
                  key={item.id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card
                    onAddClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      cardAddButtonClick(item.id, e)
                    }
                    key={item.id}
                    {...item}
                  ></Card>
                </Link>
              ))}
        </div>
      </div>
    </div>
  )
}

export default MainPage