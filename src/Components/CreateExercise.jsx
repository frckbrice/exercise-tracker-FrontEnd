import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

 const CreateExercise = () => {
  const [students, setStudents] = useState([]);

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

  const createExerciseFn = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);
    const formEntries = Object.fromEntries(data.entries());

    console.log(formEntries);
    await fetch(
      `https://exercisetracker-thfk.onrender.com/api/students/${formEntries.id}/exercises`,
      {
        method: "POST",
        body: JSON.stringify(formEntries),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, application/json, text/plain",
        },
        mode: "cors",
      }
    )
      .then((data) => {
        data.json().then((resp) => {
          if (resp) {
            console.log(resp);
            toast.success("Student added successfully");
          }
        });
      })
      .catch((err) => {
        console.log("Failed to post data to database", err);
      });
  };
  //
  return (
    <div className="cardbody">
      <Form
        action=""
        id="formRegister"
        className="toggleForm"
        onSubmit={createExerciseFn}
      >
        <select className="form-control" defaultValue={students[0]} name="id">
          {students.map((student, index) => (
            <option value={student._id} key={index}>
              {student.name}{" "}
            </option>
          ))}
        </select>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="description*"
          name="description"
        />
        <br />
        <input
          type="number"
          className="form-control"
          placeholder="duration* (mins.)"
          name = 'duration'
        />
        <br />
        <input
          type="date"
          className="form-control"
          placeholder="date (yyyy-mm-dd)"
          name="date"
        />
        <br />
        <button className="formButton" type="submit">
          create exercise
        </button>
      </Form>
    </div>
  );
};

CreateExercise.propTypes = {
  student: PropTypes.array,
};

export default CreateExercise;
