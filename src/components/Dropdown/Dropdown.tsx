import { Dropdown } from "react-bootstrap";

import styles from "./dropdown.module.scss";
import { useState } from "react";

import Component from "../../types";

export type DropDownProps = {
  components: Component[];
  defaultTitle: string;
  onChangeValue: (selectedComponent: Component) => void; // Добавленный проп
};

const DropDown: React.FC<DropDownProps> = ({
  components,
  defaultTitle,
  onChangeValue,
}) => {
  const [title, setTitle] = useState<Component>(components[0]);

  const handleSelect = (selectedComponent: Component) => {
    setTitle(selectedComponent);
    onChangeValue(selectedComponent);
  };

  return (
    <Dropdown className={styles.dropdown}>
      <Dropdown.Toggle className={styles.dropdown__toggle}>
        {title ? title.name : defaultTitle}
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.dropdown__menu}>
        {components.map((component) => (
          <Dropdown.Item onClick={() => handleSelect(component)} key={component.id}>
            {component.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
