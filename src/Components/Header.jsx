//Icons
import HomeIcon from "../Icons/HomeIcon";
import AddIcon from "../Icons/AddIcon";
import LogoutIcon from "../Icons/LogoutIcon";

//React Router
import { Link } from "react-router-dom";

//Framer Motion
import { motion } from "framer-motion";

const Header = (props) => {
  const logoutHandler = () => {
    props.getUser(null);
    props.getTodos([]);
  };

  return (
    <motion.header
      initial={{
        y: "-200px",
        // opacity: 0,
      }}
      animate={{
        y: 0,
        // opacity: 1,
        transition: {
          type: "spring",
          stiffness: "60",
        },
      }}
      className="flex items-center justify-between bg-dark p-5 rounded-lg mb-5"
    >
      <Link to="/">
        <h1 className="text-lg">ToDoPro</h1>
      </Link>
      {props.user && (
        <nav>
          <ul className="flex items-center">
            <span>
              <Link to="/">
                <li className="flex gap-2 text-sm items-center hover:bg-darkHover transition-all duration-200 mr-3  p-2 rounded cursor-pointer">
                  <HomeIcon />
                  <span>Home</span>
                </li>
              </Link>
            </span>
            <Link to="/add">
              <li className="flex gap-2 text-sm items-center hover:bg-darkHover transition-all duration-200 mr-3  p-2 rounded cursor-pointer">
                <AddIcon />
                <span>Add Todo</span>
              </li>
            </Link>
            <Link to="/sign-in">
              <li
                onClick={logoutHandler}
                className="flex gap-2 text-sm items-center hover:bg-darkHover transition-all duration-200  p-2 rounded cursor-pointer"
              >
                <LogoutIcon />
                <span>Logout</span>
              </li>
            </Link>
          </ul>
        </nav>
      )}
    </motion.header>
  );
};

export default Header;
