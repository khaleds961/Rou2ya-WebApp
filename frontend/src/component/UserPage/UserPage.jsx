import API from "../../api";
import React, { useEffect, useState } from "react";
import SideNav from "../SideNav/SideNav";
import "./UserPage.css";
import UserCard from "../UserCard/UserCard";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import LoginStatus from "../../loginstatus";
import TeacherBlock from '../../TeacherBlock';

export default function UserPage() {
  const [user, setUser] = useState([]);

  const getData = async () => {
    await API.get("getusers").then((res) => {
      const result = res.data;
      setUser(result);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteUser = async (id) => {
    const willDelete = await swal({
      title: "هل انت متأكد؟",
      text: "هل تريد حذف هذاالعضو؟",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      try {
        let res = await API.delete(`deleteuser/${id}`);
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
      <TeacherBlock/>

      <SideNav />
      <div class="container-xl adminpage">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-sm-6">
                  <h2>
                    ادارة <b>الأعضاء</b>
                  </h2>
                </div>
                <div class="col-sm-6">
                  <Link to="/adduser" class="btn " data-toggle="modal">
                    <i class="bx bxs-plus-circle bx-burst"></i>
                    <span>اضافة عضو جديد</span>
                  </Link>
                </div>
              </div>
            </div>

            <table class="table table-striped table-hover tests">
              <thead>
                <tr>
                  <th>اسم المستخدم</th>
                  <th>دور المستخدم</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {user.map((us) => (
                  <UserCard
                    key={us.id}
                    id={us.id}
                    username={us.username}
                    role={us.role}
                    delete={deleteUser}
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
