import "./Attendance.css";
import CourseList from "../CourseList";
import CourseCard from "../CourseCard";
import React, { useState, useEffect } from "react";
import StudentClass from "../StudentClass";
import ClassCourse from "../ClassCourse";
import SideNav from "../SideNav/SideNav";
import API from "../../api";
import moment from "moment";
import LoginStatus from "../../loginstatus";

export default function Attendance(props) {
  const [classs, setclass] = useState("");
  const [course, setcourse] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [status, setStatus] = useState("");

  const getStudentbyDate = async () => {
    await API.get(`studentattendance`).then((res) => {
      const result = res.data;
      setAttendance(result);
    });
  };

  const getData = async () => {
    await API.get(`studentbyclass/${classs}`).then((res) => {
      const result = res.data;
      setStudents(result);
    });
  };

  useEffect(() => {
    getData();
    getStudentbyDate();
  }, [classs]);

  let today = new Date();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var d = new Date();
  var dayName = days[d.getDay()];

  const handleClick = async (id, status) => {
    const datee = moment().format("YYYY-MM-DD");
    let reqBody = {
      StudentId: id,
      ClassId: classs,
      datee: datee,
      status: status,
    };
    setStatus("");
    console.log("before", attendance);
    try {
      const l = await API.post(`addattendance`, reqBody);

      if (l) {
        let attendance = [...students].filter((st) => st.id_stud !== id);
        setStudents(attendance);
      }
    } catch (error) {
      console.log("BIG Error : ", error);
    }
  };

  return (
    <>
      <LoginStatus />

      <SideNav />

      <div class="container-xl adminpage">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6">
                  <h2>
                    <b>الحضور اليومي</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <b>
                    {dayName +
                      "-" +
                      today.getFullYear() +
                      "-" +
                      (today.getMonth() + 1) +
                      "-" +
                      today.getDate()}
                  </b>
                </div>
              </div>
            </div>
            <div className="information">
              <CourseList
                onChange={(e) => {
                  setcourse(e.target.value);
                }}
              />

              <ClassCourse
                idCourse={course}
                onChange={(e) => {
                  setclass(e.target.value);
                }}
              />
            </div>
            <table class="table table-striped table-hover tests">
              <thead>
                <tr>
                  <th>الاسم الاول</th>
                  <th>اسم الشهرة</th>
                  <th>الحضور</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students
                  .filter((student) => {
                    return !attendance.find((item) => {
                      return item.StudentId === student.id_stud;
                    });
                  })
                  .map((student) => (
                    <StudentClass
                      FName={student.FirstName}
                      LName={student.LastName}
                      id={student.id_stud}
                      att={student.status}
                      handleClick={handleClick}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
