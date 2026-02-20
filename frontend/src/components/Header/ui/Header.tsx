import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { SearchComponent } from "../../SearchComponent";
import { User } from "../../../assets/icons/User";
import { Settings } from "../../../assets/icons/Settings";
import { Logout } from "../../../assets/icons/Logout";
import { useUserLogoutMutation } from "../../../redux/investmentsApi";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [logout] = useUserLogoutMutation();

  const logoutHandler = () => {
    logout({}).unwrap()
    navigate('/login')
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link to={"/"}>Investments</Link>
        <SearchComponent />
        <div className={styles.authWrapper}>
          <button
            className={styles.userBtn}
            onClick={() => navigate("/cabinet")}
          >
            <User />
          </button>
          {pathname.includes("cabinet") && (
            <div className={styles.userButtons}>
              <button
                className={styles.userBtn}
                onClick={() => navigate("/cabinet/settings")}
              >
                <Settings />
              </button>
              <button
                className={styles.userBtn}
                onClick={logoutHandler}
              >
                <Logout />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
