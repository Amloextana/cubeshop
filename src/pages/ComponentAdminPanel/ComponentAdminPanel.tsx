import React from "react"
import ComponentEdit from "../../components/ComponentEdit/ComponentEdit"
import styles from "./componentadminpanel.module.scss"

const ComponentAdminPanel = () => {
  return (
    <div className={styles["component-edit_page"]}>
      <ComponentEdit />
    </div>
  )
}

export default ComponentAdminPanel
