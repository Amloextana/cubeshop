import React from "react"
import ComponentsTable from "../../components/ComponentsTable/ComponentsTable"
import styles from "./componentslist.module.scss"
const ComponentsList = () => {
  return (
    <div className={styles.componentslist_page}>
      <ComponentsTable />
    </div>
  )
}

export default ComponentsList
