import Link from "next/link";
import styles from "./Header.module.css";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import LogoutButton from "./LogoutButton";
import HeaderUsername from "../Users/HeaderUsername";

const Header = () => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  return (
    <header className={styles.header}>
      <Navbar isAdmin={payload?.isAdmin || false} />
      <div className={styles.right}>
        {payload ? (
          <>
            <Link
              href={`/profile/${payload.id}`}
              className="text-blue-800 font-bold md:text-xl capitalize"
            >
              <span className={styles.welcome}>Welcome,</span>{" "}
              {/* {payload?.username} */}
              <HeaderUsername params={{ id: payload.id.toString() }} />
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link className={styles.btn} href={"/login"}>
              Login
            </Link>
            <Link className={styles.btn} href={"/register"}>
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
