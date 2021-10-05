import React from "react";
import LoginStatus from "../../loginstatus";
import TeacherBlock from "../../TeacherBlock";
import GetCourses from "../CourseGetDelete/getDeleteCourse";

function Allcourses() {
  return (
    <div>
      <LoginStatus />
      <TeacherBlock/>
      <GetCourses />
    </div>
  );
}

export default Allcourses;
