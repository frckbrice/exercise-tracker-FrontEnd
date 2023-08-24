import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to={"/createStudent"}>Create Student</Link>
        </li>
        <li>
          <Link to={"/createExercise"}>Create Exercise </Link>
        </li>
        <li>
          <Link to={"/exerciseLogs"}>Student&#39;s exercises log </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
