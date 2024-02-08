import { Dropdown } from "react-bootstrap"
import { useDispatch } from "react-redux"
import styles from "./dropdown.module.scss"
import {
  setDropdownValueId,
  setDropdownValueName,
} from "../../store/filtersSlices"
import Component from "../../types"

export type DropDownProps = {
  components: Component[]
  title: string
  handleSelect: (value: Component) => void
}

const DropDown: React.FC<DropDownProps> = ({
  components,
  title,
  handleSelect,
}) => {
  return (
    <Dropdown className={styles.dropdown}>
      <Dropdown.Toggle className={styles.dropdown__toggle}>
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.dropdown__menu}>
        {components.map((component) => (
          <Dropdown.Item onClick={() => handleSelect(component)} key={component.id}>
            {component.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropDown
