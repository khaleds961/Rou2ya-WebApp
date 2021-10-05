import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../api";
import SideNav from "../SideNav/SideNav";
import ClassCard from "../ClassCard";
import swal from "sweetalert";
import LoginStatus from "../../loginstatus";
import TeacherBlock from "../../TeacherBlock";

export default function ClassPage() {
  const [classes, setClasses] = useState([]);

  const fetchData = async () => {
    await API.get("joinclasscourse").then((res) => {
      console.log(res);
      const result = res.data;
      setClasses(result);
      console.log();
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteclass = async (id) => {
    const willDelete = await swal({
      title: "هل انت متأكد؟",
      text: "هل انت متأكد من حذف هذا الصف؟",
      icon: "warning",
      dangerMode: true,
    });
    if (willDelete) {
      try {
        let res = await API.delete(`deleteclass/${id}`);
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
  };

  return (
    <>
      <LoginStatus />
      <SideNav />
      <TeacherBlock/>
      <div class="container-xl adminpage">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6">
                  <h2>
                    ادارة <b>الصفوف</b>
                  </h2>
                </div>
                <div class="col-sm-6">
                  <Link to="/addclass" class="btn " data-toggle="modal">
                    <i class="bx bxs-plus-circle bx-burst"></i>
                    <span>اضافة صف جديد</span>
                  </Link>
                </div>
              </div>
            </div>

            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>اسم الصف</th>
                  <th>اسم الدورة</th>
                  <th> من الساعة</th>
                  <th>حتى الساعة</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cl) => {
                  return (
                    <ClassCard
                      key={cl.id}
                      id={cl.id}
                      className={cl.ClassName}
                      CourseName={cl.CourseName}
                      TimeFrom={cl.TimeFrom}
                      TimeTo={cl.TimeTo}
                      delete={deleteclass}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
