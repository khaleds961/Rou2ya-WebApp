import { Link } from "react-router-dom";
import API from "../../api";
import React, { useState, useEffect } from "react";
import SideNav from "../SideNav/SideNav";
import LoginStatus from "../../loginstatus";
import TeacherBlock from "../../TeacherBlock";

export default function EditUser(props) {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  let fetchData = async (id) => {
    const url = `http://localhost:8000/api/getusersbyid/${id}`;
    const response = await fetch(url);
    let result = await response.json();
    setusername(result[0] && result[0].username);
    setPassword(result[0] && result[0].password);
    console.log(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = props.match.params.id;
    let reqBody = {
      username: username,
      password: password,
    };
    const result = await API.put(`edituser/${id}`, reqBody);
    await props.history.push("/userpage");
    console.log(result);
  };

  useEffect(() => {
    fetchData(props.match.params.id);
  }, []);

  return (
    <>
      <LoginStatus />
    <TeacherBlock/>
      <SideNav />
      <div id="editEmployeeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <form onSubmit={handleSubmit}>
              <div class="modal-header">
                <h4 class="modal-title">تعديل المستخدم</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>اسم المستخدم</label>
                  <input
                    type="text"
                    class="form-control"
                    name="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>كلمة المرور</label>
                  <input
                    type="text"
                    class="form-control"
                    name="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <Link to="/userpage">
                  <input
                    style={{ color: "white" }}
                    type="button"
                    class="btn btn-warning"
                    data-dismiss="modal"
                    value="الغاء"
                  />
                </Link>

                <input type="submit" class="btn btn-success" value="حفظ" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
