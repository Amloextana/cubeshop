import React, { useEffect, useState } from "react"

import Button from "../../../components/Button/Button"
import defComponent from "../../../assets/icons/flight.png"

import styles from "./componentinfo.module.scss"

import { cardInfoProps } from "../../../types"
import { DOMEN } from "../../../consts"
import { ComponentsMock } from "../../../consts"

type ComponentInfoProps = {
  id: string
}

const ComponentInfo: React.FC<ComponentInfoProps> = ({ id }) => {
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

  useEffect(() => {
    fetch(`${DOMEN}/components/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const component = data
        console.log(component)
        setInfo(component)
      })
      .catch((error) => {
        setMock(true)
        let filteredGroups: cardInfoProps | undefined = ComponentsMock.find(
          (group) => group.id == parseInt(id)
        )
        setInfo(filteredGroups)
        console.log("Ошибка при выполнении запроса:", error)
      })
  }, [])

  return (
    <div className={styles.componentinfo}>
      <div className={styles.componentinfo__image}>
        {info && info.image ? (
          <img
            className={styles.componentinfo__image_img}
            src={mock ? `${info.image}` : info.image}
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
          <Button>В корзину</Button>
        </div>
      </div>
    </div>
  )
}

export default ComponentInfo
