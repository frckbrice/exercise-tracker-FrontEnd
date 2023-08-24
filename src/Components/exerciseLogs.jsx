import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const ExerciseLogs = () => {
  const [students, setStudents] = useState([]);
  const [logs, setLogs]= useState([]);

  useEffect(() => {
    (async () => {
      await axios("https://exercisetracker-thfk.onrender.com/api/students/")
        .then((response) => {
          console.log(response);
          setStudents(response.data.data);
        })
        .catch((err) => {
          console.log(
            "an error occurred while fetching data from database",
            err.message
          );
        });
    })();
  }, []);

  const getStudentExercisesLogs = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);
    const formEntries = Object.fromEntries(data.entries());

    console.log(formEntries);
    await fetch(`https://exercisetracker-thfk.onrender.com/api/students/${formEntries.id}/logs`)
      .then((data) => {
        data.json().then((resp) => {
          if (resp.count) {
            console.log(resp);
            setLogs(resp.log);
          }
        });
      })
      .catch((err) => {
        console.log("Failed to post data to database", err);
      });
  };
    console.log(logs);

  return (
    <div className="cardbody ">
      <Form
        action=""
        id="formRegister"
        className="form"
        onSubmit={getStudentExercisesLogs}
      >
        <label htmlFor="id">Select Student name</label>
        <select className="form-control" defaultValue={students[0]} name="id">
          {students.map((student, index) => (
            <option value={student._id} key={index}>
              {student.name}{" "}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="from">From &nbsp; &nbsp;(optional)*</label>
        <input
          type="date"
          className="form-control"
          placeholder="From (optional)*"
          name="from"
        />
        <br />
        <label htmlFor="to">TO &nbsp; &nbsp;(optional)*</label>
        <input
          type="date"
          className="form-control"
          placeholder="To (optional)*"
          name="to"
        />
        <br />
        <label htmlFor="limit">Limit (optional)*</label>
        <input
          type="number"
          className="form-control"
          placeholder="Limit "
          name="limit"
        />
        <br />

        <button className="formButton" type="submit">
          See logs
        </button>
      </Form>
      <hr />
      <div className="div-logs">
        {logs.map((log) => (
          <div key={log._id} className="div-display-logs">
            <span>description: {log.description}</span>
            <span>duration: {log.duration} </span>
            <span> date: {log.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

ExerciseLogs.propTypes = {
  students: PropTypes.array,
  formEntries: PropTypes.object,
  student: PropTypes.object,
};

export default ExerciseLogs;
