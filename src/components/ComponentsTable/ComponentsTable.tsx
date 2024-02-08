import axios from "axios"
import React, { useEffect, useState } from "react"
import { useTable, Column } from "react-table"
import componentData from "../../types"
import { Response } from "../../types"
import styles from "./componentstable.module.scss"
import Button from "../Button/Button"
import deleteIcom from "../../assets/icons/delete.png"
import editIcon from "../../assets/icons/edit.png"
import { Link } from "react-router-dom"

const ComponentsTable = () => {
  const [components, setComponents] = useState<componentData[]>([])

  const fetchComponents = async () => {
    try {
      axios.defaults.withCredentials = true
      const response: Response = await axios(`http://localhost:8000/components/`, {
        method: "GET",
        //   credentials: 'include',
        withCredentials: true,
        //   headers: {
        //     "Content-type": "application/json; charset=UTF-8",
        //     Authorization: `Bearer ${cookies.get("access_token")}`,
        //   },
      })
      if (response.status == 200) {
        setComponents(response.data.components)
      }
      console.log(response.data.components)
    } catch (e) {
      console.log(e)
    }
  }
  const columns: Array<Column<{}>> = React.useMemo(
    () => [
      {
        Header: "№",
        accessor: "id",
      },
      {
        Header: "Название",
        accessor: "title",
      },
      {
        Header: "Описание",
        accessor: "description",
      },
      {
        Header: "Статус",
        accessor: "available",
        Cell: ({ value }) => {
          let status = ""
          value == true ? (status = "В наличии") : (status = "Нет в наличии")
          return <span>{status}</span>
        },
      },
      {
        Header: "Действие",
        accessor: "action",
        Cell: ({ cell }) => (
          <div className={styles.moder_action}>
            <>
              <Link
                to={`/cubeshop/components-list/${cell.row.values.id}`}
              >
                <img
                  className={styles.moder_action__button}
                  src={editIcon}
                ></img>
              </Link>

              <img
                className={styles.moder_action__button}
                src={deleteIcom}
              ></img>
            </>
          </div>
        ),
      },
      {
        Header: "Изображение",
        accessor: "image",
        Cell: ({ value }) => {
          return <img style={{ width: 100 }} alt="aaa" src={value}></img>
        },
      },
    ],
    []
  )
  useEffect(() => {
    fetchComponents()
  }, [])

  const data = components

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  return (
    <>
      <div className={styles.content}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.addbutton}>
        <Link to={`/cubeshop/components-list/0`}>
          <Button style={{ position: 'absolute', left: 0 }} >Добавить новый компонент</Button>
        </Link>
      </div>
    </>
  )
}

export default ComponentsTable
