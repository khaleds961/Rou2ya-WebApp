import "../Attendance/Attendance.css";
import CourseList from "../CourseList";
import ClassCourse from "../ClassCourse";
import React, { useEffect, useState } from "react";
import SideNav from "../SideNav/SideNav";
import ViewStudentAttendance from "../ViewStudentAttendance";
import LoginStatus from "../../loginstatus";

export default function Attendance(props) {
  const [classs, setclass] = useState("");
  const [course, setcourse] = useState("");
  const [date, setDate] = useState("");
  const [students, setstudent] = useState([]);

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
                    <b> عرض الحضور</b>
                  </h2>
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
                students={students}
                onChange={(e) => {
                  setclass(e.target.value);
                }}
              />
             
              <input
                type="date"
                name="date"
                id="pickdate"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              ></input>
            </div>
            <table class="table table-striped table-hover tests">
              <thead>
                <tr>
                  <th class="ok">الاسم الأول</th>
                  <th>اسم الشهرة</th>
                  <th>الحضور</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <ViewStudentAttendance idClass={classs} created_at={date} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
