import "../UserPage/UserPage.css";
import React, { useState } from "react";
import { useHistory } from "react-router";
import SideNav from "../SideNav/SideNav";
import { Link } from "react-router-dom";
import LoginStatus from "../../loginstatus";
import TeacherBlock from "../../TeacherBlock";

export default function AddClass(props) {
  const [CourseName, SetCourseName] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("CourseName", CourseName);
      let url = `//localhost:8000/api/addcourse`;
      await fetch(url, {
        method: "post",
        body: formData,
      });
    } catch (err) {
      setError(error);
    }
    history.push("/CoursePage");
  };

  return (
    <>
    <LoginStatus/>
      <SideNav />
      <TeacherBlock/>
      <div id="addEmployeeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <form onSubmit={handleSubmit}>
              <h4 className="headers">اضافة دورة جديدة</h4>
              <div class="modal-body">
                <div class="form-group">
                  <label>اسم الدورة</label>
                  <input
                    type="text"
                    class="form-control"
                    name="description"
                    onChange={(e) => SetCourseName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="modal-footer">
              <Link to="/classpage">
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
