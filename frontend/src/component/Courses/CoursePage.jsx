import React, { useState, useEffect } from "react";
import API from "../../api";
import { Link } from "react-router-dom";
import SideNav from "../SideNav/SideNav";
import CourseCard from "../CourseCard";
import swal from "sweetalert";
import "./CoursePage.css";
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
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCourseInfo();
  }, []);
  async function DeleteCourseInfo(id) {
    const willDelete = await swal({
      title: "هل انت متأكد؟",
      text: "هل تريد حذف هذاالعضو؟",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        let res = await API.delete(`deletecourse/${id}`);
        const result = res.data.message;
        if (res.data.success) {
          await swal("تم خذفه", result, "success");
        } else {
          await swal("", result, "error");
        }
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <>
      <LoginStatus />
    <TeacherBlock/>
      <SideNav />
      <div class="container-xl adminpage">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6">
                  <h2>
                    ادارة <b>الدورات</b>
                  </h2>
                </div>
                <div class="col-sm-6">
                  <Link to="/addcourse" class="btn " data-toggle="modal">
                    <i class="bx bxs-plus-circle bx-burst"></i>
                    <span>اضافة دورة جديدة</span>
                  </Link>
                </div>
              </div>
            </div>

            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>اسم الدورة</th>
                  <th>اسم الصفوف لكل دورة</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Course.map((us) => (
                  <CourseCard
                    key={us.id}
                    id={us.id}
                    CourseName={us.CourseName}
                    delete={DeleteCourseInfo}
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

export default GetCourses;
