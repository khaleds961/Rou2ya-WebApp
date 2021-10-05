import "../UserPage/UserPage.css";
import React, { useState } from "react";
import { useEffect } from "react";
import SideNav from "../SideNav/SideNav";
import { useHistory } from "react-router";
import API from "../../api";
import "../AddStudent/Student.css";
import LoginStatus from "../../loginstatus";
import TeacherBlock from "../../TeacherBlock";
import { Link } from "react-router-dom";

export default function EditStudent(props) {
  let history = useHistory();

  const [Teachers, setTeachers] = useState([]);
  const [SelectedTeacher, setSelectedTeacher] = useState("nothing");
  const [SubscribeStatus, setSubscribeStatus] = useState([]);

  const [firstname, setFirstName] = useState(
    props.history.location.state && props.history.location.state.firstname
  );
  const [lastname, setLastName] = useState(
    props.history.location.state && props.history.location.state.lastname
  );
  const [Schoolname, setSchoolname] = useState(
    props.history.location.state && props.history.location.state.Schoolname
  );
  const [note, setNote] = useState(
    props.history.location.state && props.history.location.state.Note
  );
  const [code, setCode] = useState(
    props.history.location.state && props.history.location.state.Code
  );
  const [phone, setPhone] = useState(
    props.history.location.state && props.history.location.state.Phone
  );

  const getTeachers = async () => {
    const res = await API.get("allteacheruser");
    setTeachers(res.data);
    console.log(res);
  };

  const dealwithdata = async (id) => {
    setSelectedTeacher(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let reqBodyStudent = {
      FirstName: firstname,
      LastName: lastname,
      SchoolName: Schoolname,
      Note: note,
      Code: code,
      Phone: phone,
    };

    console.log("this is body request of student edit");
    console.log(reqBodyStudent);

    try {
      const res = await API.put(
        `editstudent/${props.history.location.state.Studid}`,
        reqBodyStudent
      );

      console.log("this edit student response");
      console.log(res);

      const res1 = await API.get(
        `getprivsessid/${props.history.location.state.Studid}`
      );
      const privateSessionId = res1.data[0].id;

      let reqBodySubs = {
        Status: SubscribeStatus,
        StudentId: props.history.location.state.Studid,
        PrivateSessionId: privateSessionId,
      };

      const res2 = await API.put(
        `editsubs/${props.history.location.state.StatusId}`,
        reqBodySubs
      );
    } catch (error) {
      console.log(error);
    }
    history.push("/PrivateStudent");
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <>
      <LoginStatus />
      <TeacherBlock />
      <SideNav />

      <div id="addEmployeeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <form onSubmit={handleSubmit}>
              <div class="modal-header">
                <h4 className="modal-title" style={{ margin: "auto" }}>
                  {" "}
                  تعديل معلومات الطالب
                </h4>
              </div>

              <div class="modal-body">
                <div class="form-group">
                  <label>اسم الطالب</label>
                  <input
                    autoComplete="off"
                    type="text"
                    class="form-control"
                    name="FirstName"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  {console.log(firstname)}
                </div>

                <div class="form-group">
                  <label>الشهرة</label>
                  <input
                    autoComplete="off"
                    type="text"
                    class="form-control"
                    name="LastName"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>المدرسة</label>
                  <input
                    autoComplete="off"
                    type="text"
                    class="form-control"
                    name="Schoolname"
                    value={Schoolname}
                    onChange={(e) => setSchoolname(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>ملاحظات</label>
                  <input
                    autoComplete="off"
                    type="text"
                    class="form-control"
                    name="Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>رمز الهاتف</label>
                  <input
                    autoComplete="off"
                    type="text"
                    class="form-control"
                    name="Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label>الهاتف</label>
                  <input
                    autoComplete="off"
                    type="tel"
                    maxLength="8"
                    class="form-control"
                    name="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label style={{ display: "block" }}>: الاشتراك </label>
                  <label htmlFor="paid" style={{ marginRight: "1.5rem" }}>
                    تم الدفع
                    <input
                      type="radio"
                      class="form-control"
                      name="piad"
                      style={{ height: "17px" }}
                      value={"تم الدفع"}
                      onChange={(e) => setSubscribeStatus(e.target.value)}
                      required
                    />
                  </label>

                  <label htmlFor="paid">
                    لم يدفع بعد
                    <input
                      type="radio"
                      class="form-control"
                      name="piad"
                      style={{ height: "17px" }}
                      value={"لم يدفع بعد"}
                      onChange={(e) => setSubscribeStatus(e.target.value)}
                      required
                    />
                  </label>
                </div>
              </div>

              <div class="modal-footer">
                <Link to="/PrivateStudent">
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
