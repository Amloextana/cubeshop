import { useState } from "react"
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
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState(""); // Use local state for search value

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

  const cardAddButtonClick = (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation()
    e.preventDefault()
    addComponentToApp(id)
  }



  const handleSelect = (selectedComponent: Component) => {
    dispatch(setDropdownValueName(selectedComponent.name))
    dispatch(setDropdownValueId(selectedComponent.id))
  }

  const search = () => {
    dispatch(setInputValue(searchValue));
  };

  return (
    <div className={styles.mainpage}>
      <div className={styles.container}>
        <div className={styles.mainpage__actions}>
          <div className={styles.mainpage__input}>
            <Input
              searchValue={searchValue}
              onChangeValue={(i) => setSearchValue(i)}
            />
            <Button onClick={search}>Поиск</Button>
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
