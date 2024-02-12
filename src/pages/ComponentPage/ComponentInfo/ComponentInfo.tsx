import React, { useEffect, useState } from "react"

import Button from "../../../components/Button/Button"
import defComponent from "../../../assets/icons/flight.png"

import styles from "./componentinfo.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { Response } from "../../../types"

import { cardInfoProps } from "../../../types"
import { DOMEN } from "../../../consts"
import { ComponentsMock } from "../../../consts"
import axios from "axios"
import { updateCart } from "../../../store/userSlice"
import { toast } from "react-toastify"

type ComponentInfoProps = {
  id: string
}

const ComponentInfo: React.FC<ComponentInfoProps> = ({ id }) => {
  const dispatch = useDispatch()
  const [mock, setMock] = useState(false)
  const [info, setInfo] = useState<cardInfoProps | undefined>({
    id: 0,
    title: "",
    category: "",
    description: "",
    price: 0,
    available: true,
    features: [""],
    image: "",
  })

  const getInfo = async () => {
    try {
      const responce = await axios(`http://localhost:8000/components/${id}/`, {
        method: "GET",
        // withCredentials: true,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          // Authorization: `Bearer ${cookies.get("access_token")}`,
        },
      })
      setInfo(responce.data)
    } catch (error) {
      setMock(true)
      let filteredGroups: cardInfoProps | undefined = ComponentsMock.find(
        (group) => group.id == parseInt(id)
      )
      setInfo(filteredGroups)
      console.log("Ошибка при выполнении запроса:", error)
    }
  }

  const addComponentToApp = async (id: number) => {
    try {
      const response: Response = await axios(
        `http://localhost:8000/components/${id}/add_to_application/`,
        {
          method: "POST",
          withCredentials: true,
        }
      )
      if (response.data) {
        dispatch(updateCart(response.data))
      }
      toast.success("Добавлено в корзину", {
        icon: "⚡",
      })
      //🛩⚡✅✈
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getInfo()
  }, [])

  const addComponentToCart = (id: number) => {
    addComponentToApp(id)
  }

  return (
    <div className={styles.componentinfo}>
      <div className={styles.componentinfo__image}>
        {info && info.image ? (
          <img
            className={styles.componentinfo__image_img}
            src={mock ? `../${info.image}` : info.image}
            alt="sssss"
          ></img>
        ) : (
          <img
            className={styles.componentinfo__image_img}
            src={defComponent}
            alt="aaa"
          ></img>
        )}
      </div>
      <div className={styles.componentinfo__common}>
        <div className={styles.componentinfo__common_text}>
          <div className={styles.componentinfo__common_title}>
            {info && info.title}
          </div>
          <div className={styles.componentinfo__common_subtitle}>
            {info && info.description}
          </div>
        </div>
        <div className={styles.componentinfo__common_actions}>
          <div className={styles.componentinfo__common_price}>
            {info && info.price} ₽
          </div>
          <Button onClick={() => addComponentToCart(Number(id))}>В корзину</Button>
        </div>
      </div>
    </div>
  )
}

export default ComponentInfo
