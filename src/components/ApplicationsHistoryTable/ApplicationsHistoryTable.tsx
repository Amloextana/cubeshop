import React, { useEffect, useState } from "react"
import { useTable, Column } from "react-table"
import axios from "axios"
import { Response } from "../../types"
import { useDispatch, useSelector } from "react-redux"
import styles from "./ApplicationsHistoryTable.module.scss"
import Cookies from "universal-cookie"
import { Link } from "react-router-dom"
import Button from "../Button/Button"
import { RootState } from "../../store/store"
import Component from "../../types"
import tick from "../../assets/icons/tick.png"
import close from "../../assets/icons/close.png"
import Input from "../Input/Input"
import {
  setAppDropdownValueId,
  setAppDropdownValueName,
  setAppInputValue,
} from "../../store/moderAppSlice"
import { applicationData } from "../../types"
import { STATUSES } from "../../consts"
import DropDown from "../Dropdown/Dropdown"
import { toast } from "react-toastify"
// declare module "date.d.ts"
import { DateRange, DateRangePicker } from "react-date-range"
import { ru } from "date-fns/locale"
import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import { RangeKeyDict } from "react-date-range"
import moment from "moment"

const cookies = new Cookies()
// interface DateRangeInterface {
//   selection: {
//     startDate: Date
//     endDate: Date
//   }
// }
const ApplicationsHistoryTable = () => {
  const [application, setApplication] = useState<applicationData[]>([])
  // const [applicationRange, setApplicationRange] = useState<applicationData[]>(
  //   []
  // )
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const isModerator = useSelector((state: RootState) => state.user.is_moderator)
  const dispatch = useDispatch()

  const selectedStatus = useSelector(
    (state: RootState) => state.moderApp.dropdown_value.id
  )
  const searchValue = useSelector(
    (state: RootState) => state.moderApp.input_value
  )
  const categoryValue = useSelector(
    (state: RootState) => state.moderApp.dropdown_value
  )

  const handleSelect = (selectedComponent: Component) => {
    dispatch(setAppDropdownValueName(selectedComponent.name))
    dispatch(setAppDropdownValueId(selectedComponent.id))
  }

  const fetchAppsData = async () => {
    try {
      const params = `?start_day=${startDate}&end_day=${endDate}&category=${encodeURIComponent(
        categoryValue.id
      )}`

      axios.defaults.withCredentials = true
      const response: Response = await axios(
        `http://localhost:8000/applications/${params}`,
        {
          method: "GET",
          //  credentials: 'include',
          withCredentials: true,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${cookies.get("access_token")}`,
          },
        }
      )
      if (response.status == 200) {
        const sortedApplications = response.data.sort(
          (a: { created_at: Date }, b: { created_at: Date }) => {
            const dateA = new Date(a.created_at).getTime()
            const dateB = new Date(b.created_at).getTime()
            return dateB - dateA // for descending order
          }
        )
        console.log(response.data)
        setApplication(sortedApplications)
      }
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const formApplication = async (application_id: number, status_id: number) => {
    try {
      const updatedData = {
        status: status_id,
      }

      const response: Response = await axios(
        `http://localhost:8000/applications/${application_id}/update_by_admin/`,
        {
          method: "PUT",
          data: updatedData,
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      )

      toast.success("Заказ оформлен", {
        icon: "🚀",
      })
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    // fetchAppsData()
    const intervalId = setInterval(() => {
      fetchAppsData()
    }, 1000)
    moment.locale("ru")
    return () => clearInterval(intervalId)
  }, [categoryValue, startDate, endDate])

  const data = application.filter((item) =>
    item.customer.email
      .toString()
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  )
  // const data = application

  const columns: Array<Column<{}>> = React.useMemo(
    () => [
      {
        Header: "№",
        accessor: "id",
      },
      {
        Header: "Статус",
        accessor: "status",
        Cell: ({ value }) => {
          let statusText = ""
          switch (value) {
            case 1:
              statusText = "Черновик"
              break
            case 2:
              statusText = "Удален"
              break
            case 3:
              statusText = "В работе"
              break
            case 4:
              statusText = "Завершен"
              break
            case 5:
              statusText = "Отклонен"
              break
            default:
              statusText = ""
          }
          return <span>{statusText}</span>
        },
      },
      {
        Header: "Дата создания",
        accessor: "created_at",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY HH:mm") : "пока пусто"}
          </span>
        ),
      },
      {
        Header: "Дата формирования",
        accessor: "formed_at",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY HH:mm") : "пока пусто"}
          </span>
        ),
      },
      {
        Header: "Дата завершения",
        accessor: "completed_at",
        Cell: ({ value }) => (
          <span>
            {value ? moment(value).format("DD.MM.YYYY HH:mm") : "пока пусто"}
          </span>
        ),
      },
      {
        Header: "Заказчик",
        accessor: "customer.email",
      },
      {
        Header: "Трекер",
        accessor: "delivery_token",
      },
      {
        Header: "Информация",
        Cell: ({ cell }) => (
          <Link
            style={{
              textDecoration: "underline",
              color: "black",
            }}
            to={`/cubeshop/application/${cell.row.values.id}`}
          >
            Подробнее&gt;
          </Link>
          // <Button onClick={() => console.log("aaa")}>Открыть</Button>
        ),
      },
      {
        Header: "Действие",
        accessor: "action",
        Cell: ({ row }) => (
          <div className={styles.moder_action}>
            {row.values.status === 3 ? (
              <>
                <img
                  onClick={() => formApplication(row.values.id, 4)}
                  className={styles.moder_action__button}
                  src={tick}
                ></img>
                <img
                  onClick={() => formApplication(row.values.id, 5)}
                  className={styles.moder_action__button}
                  src={close}
                ></img>
              </>
            ) : null}
          </div>
        ),
      },
    ],
    []
  )

  const initialState = {
    hiddenColumns: isModerator ? [""] : ["customer.email", "action"],
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, initialState })

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  }

  const handleSelectDateRange = (date: RangeKeyDict) => {
    if (
      !date.selection ||
      !date.selection.startDate ||
      !date.selection.endDate
    ) {
      return
    }

    // let filtered = applicationRange.filter((product) => {
    //   let productDate = new Date(product["created_at"])
    //   return (
    //     productDate >= date.selection.startDate &&
    //     productDate <= date.selection.endDate
    //   )
    // })
    setStartDate(date.selection.startDate)
    setEndDate(date.selection.endDate)
    // setApplication(filtered) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log(startDate)
    console.log(endDate)
  }
  return (
    <div className={styles.page_inner}>
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
      {isModerator && (
        <div className={styles.filters}>
          <div className={styles.filters__text}>
            <Input
              className={styles.input}
              searchValue={searchValue}
              onChangeValue={(i) => dispatch(setAppInputValue(i))}
            />
            <DropDown
              handleSelect={handleSelect}
              components={STATUSES}
              title={categoryValue.name}
            />
          </div>

          <div className={styles.filters__date}>
            <DateRange
              // locale={ru}
              showDateDisplay={false}
              className={styles.date}
              rangeColors={["#33cccc", "#3ecf8e", "#fed14c"]}
              ranges={[selectionRange]}
              onChange={handleSelectDateRange}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ApplicationsHistoryTable