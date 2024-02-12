import cartSvg from "../../assets/icons/bag-2.svg"
import userSvg from "../../assets/icons/user.svg"
import hisSvg from "../../assets/icons/history2.svg"
import optList from "../../assets/icons/components.png"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { AnimatePresence, motion } from "framer-motion"

import styles from "./header.module.scss"
import { Link } from "react-router-dom"
import ProfileInfo from "../ProfileInfo/ProfileInfo"
import { RootState } from "../../store/store"

const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  const currentCart = useSelector((state: RootState) => state.user.current_cart)
  const location = useLocation()
  const cart = useSelector((state: RootState) => state.cart.items.length)
  const [v, sV] = useState(false)
  const isAuth = useSelector((state: RootState) => state.user.is_authenticated)
  const isModerator = useSelector((state: RootState) => state.user.is_moderator)
  const isCartEmpty = useSelector((state: RootState) => state.user.current_cart)
  useEffect(() => {
    console.log("header render")
  }, [cart])
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__logo}>
          <Link to={""} style={{ textDecoration: "none", color: "black" }}>
            <div>CubeShop</div>
          </Link>
        </div>

        <div className={styles.header__profile}>
          {isAuth && (
            <Link
              style={{ height: 27 }}
              to="/cubeshop/history"
            >
              <div className={styles.cart}>
                <img style={{ width: 27 }} src={hisSvg} alt="History" />
              </div>
            </Link>
          )}

          {location.pathname === "/cubeshop/" &&
            isAuth &&
            !isModerator &&
            (isCartEmpty != -1 ? (
              <Link
                to={`/cubeshop/application/${currentCart}`}
              >
                <div className={styles.cart}>
                  <img src={cartSvg} alt="Cart" />

                </div>
              </Link>
            ) : (
              <div className={styles.cart}>
                <img src={cartSvg} alt="Cart" style={{ opacity: "0.5" }} />
                {/* <div>{cart}</div> */}
              </div>
            ))}
          {isModerator && (
            <Link to="/cubeshop/components-list">
              <div className={styles.cart}>
                <img style={{ width: 30 }} src={optList} alt="Cart" />
              </div>
            </Link>
          )}

          <div
            className={styles.user}
            onClick={() => {
              sV(!v)
            }}
          >
      <div style={{ position: "relative", textAlign: "center" }}>
        <img src={userSvg} alt="User" style={{ cursor: "pointer" }} />
        <div className={styles.login}>{user.user_email}</div>
      </div>

            <AnimatePresence>
              {v && (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}
                  className={styles.profileInfoContainer}
                >
                  <ProfileInfo />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
