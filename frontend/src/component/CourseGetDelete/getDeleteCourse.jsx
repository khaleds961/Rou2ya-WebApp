import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import API from "../../api";
import LoginStatus from "../../loginstatus";
import TeacherBlock from "../../TeacherBlock";

function GetCourses() {
  const [Course, setCourse] = useState([]);

  useEffect(async () => {
    getCourseInfo();
  }, []);

  const getCourseInfo = async () => {
    await API.get(`getcourses`)
      .then((res) => {
        // console.log(res.data);
        setCourse(res.data);

        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function DeleteCourseInfo(id) {
    await API.delete(`deletecourse/${id}`).catch((err) => {
      console.log(err);
    });
  }

  console.log(Course);

  return (
    <>
      <LoginStatus />
<TeacherBlock/>
      {Course.map((cours_data) => {
        return (
          <div className="CoursesCard">
            <div className="CoursecardImg">
              <img
                className="card_emp"
                alt="course img"
                height={250}
                width={250}
              />
            </div>
            <h1>hello </h1>
            <h3>{cours_data.CourseName}</h3>
            <br />

            <button
              onClick={() => {
                DeleteCourseInfo(cours_data.id);
              }}
            >
              Delete Course
            </button>
          </div>
        );
      })}
    </>
  );
}

export default GetCourses;
