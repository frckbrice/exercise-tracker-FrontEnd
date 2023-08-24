import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav">
      <ul>
        <Link to={"/createStudent"}>Create Student</Link>
        <Link to={"/createExercise"}>Create Exercise </Link>
        <Link to={"/exerciseLogs"}>Student&#39;s exercises log </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
