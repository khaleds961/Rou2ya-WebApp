import React, { useState } from "react";
import SideNav from "../SideNav/SideNav";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import API from "../../api";
import "./AddUser.css";
import LoginStatus from "../../loginstatus";
import TeacherBlock from "../../TeacherBlock";

export default function AddUser() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let reqBody = {
      username: username,
      password: password,
      role: role,
    };
    try {
      await API.post("auth/register", reqBody);
    } catch (error) {
      console.log("Big Error:", error);
    }
    history.push("/userpage");
  };
  return (
    <>
          <LoginStatus />
<TeacherBlock/>
      <SideNav />
      <div id="addEmployeeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <form onSubmit={handleSubmit}>
              <h4 className="headers">اضافة مستخدم جديد</h4>
              <div class="modal-body">
                <div class="form-group">
                  <label>اسم المستخدم</label>
                  <input
                    type="text"
                    class="form-control tests"
                    name="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>كلمة المرور</label>
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></input>
                </div>

                <div class="form-group">
                <select
                  id="outline"
                  required
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                >
                  <option value="select">دور المستخدم</option>
                  <option value="teacher">استاذ</option>
                  <option value="admin">مشرف</option>
                </select>
                </div>

              </div>

              
              <div class="modal-footer">
                <Link to="/userpage">
                  <input
                    style={{color:'white'}}
                    type="button"
                    class="btn btn-warning"
                    data-dismiss="modal"
                    value="الغاء"
                  />
                </Link>

                <input type="submit" class="btn btn-success" value="اضافة" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
