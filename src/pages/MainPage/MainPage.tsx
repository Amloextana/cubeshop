import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";


import Card from "../../components/Card/Card";
import DropDown from "../../components/Dropdown/Dropdown";
import SliderFilter from "../../components/Slider/Slider";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Skeleton from "../../components/Skeleton/Skeleton";

import styles from "./mainpage.module.scss";

import Component from "../../types";
import { cardInfoProps } from "../../types";
import { DOMEN, CATEGORIES } from "../../consts";
import { ComponentsMock } from "../../consts";

const MainPage = () => {
  const [items, setItems] = useState<cardInfoProps[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [sliderValues, setSliderValues] = useState([0, 10000]);
  const [categoryValue, setCategoryValue] = useState("Любая категория");

  const handleSliderChange = (values: number[]) => {
    setSliderValues(values);
  };

  const handleDropDownChange = (selectedComponent: Component) => {
    setCategoryValue(selectedComponent.name);
  };

  useEffect(() => {
    const params = searchValue
      ? `?search=${encodeURIComponent(searchValue)}&min_price=${
          sliderValues[0]
        }&max_price=${sliderValues[1]}&category=${encodeURIComponent(
          categoryValue
        )}`
      : `?min_price=${sliderValues[0]}&max_price=${
          sliderValues[1]
        }&category=${encodeURIComponent(categoryValue)}`;
    fetch(`${DOMEN}/components/${params}`) //!!!!!!!!!!!!!!!
      .then((response) => response.json())
      .then((data) => {
        const components = data.components;
        setItems(components);
        setIsLoading(false);
      })
      .catch(() => {
        createMock();
        setIsLoading(false);
      });
  }, [searchValue, sliderValues, categoryValue]);

  const createMock = () => {
    let filteredComponents: cardInfoProps[] = ComponentsMock.filter(
      (component) => component.available == true
    );

    if (searchValue) {
      filteredComponents = filteredComponents.filter((component) =>
        component.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (sliderValues) {
      filteredComponents = filteredComponents.filter(
        (component) =>
          component.price > sliderValues[0] && component.price < sliderValues[1]
      );
    }

    if (categoryValue != "Любая категория") {
      filteredComponents = filteredComponents.filter(
        (component) => component.category == categoryValue
      );
    }
    setItems(filteredComponents);
  };

  return (
    <div className={styles.mainpage}>
      <div className={styles.container}>

        <div className={styles.mainpage__actions}>
          <div className={styles.mainpage__input}>
            <Input onChangeValue={(i) => setSearchValue(i)} />
          </div>
          <div className={styles.mainpage__filters}>
            <DropDown
              onChangeValue={handleDropDownChange}
              components={CATEGORIES}
              defaultTitle="Категория"
            />
          </div>
        </div>

        <div className={styles.mainpage__inner}>
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((item: cardInfoProps) => (
                <Link
                  to={`/cubeshop/${item.id}`}
                  key={item.id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card key={item.id} {...item} />
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;