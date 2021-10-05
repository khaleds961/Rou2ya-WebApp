import { useEffect, useState } from "react";
import React from "react";
import { Card, Form } from "react-bootstrap";
import "./Student.css";
import API from "../../api";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import LoginStatus from "../../loginstatus";
import TeacherBlock from "../../TeacherBlock";

function TaddStudentPage(match) {
  const [Teachers, setTeachers] = useState([]);
  const [SelectedTeacher, setSelectedTeacher] = useState("nothing");
  const [Date, setDate] = useState([]);
  const [TimeFrom, setTimeFrom] = useState([]);
  const [TimeTo, setTimeTo] = useState([]);
  const [SubscribeStatus, setSubscribeStatus] = useState([]);

  // ALL  requests elements of add student //

  const firstname = match.location.state && match.location.state.FirstName;
  const lastname = match.location.state && match.location.state.LastName;
  const schoolname = match.location.state && match.location.state.SchoolName;
  const note = match.location.state && match.location.state.Note;
  const code = match.location.state && match.location.state.Code;
  const phone = match.location.state && match.location.state.Phone;

  // request off subscription //

  const status = SubscribeStatus;

  const history = useHistory();

  const getTeachers = async () => {
    const res = await API.get("allteacheruser");
    setTeachers(res.data);
    console.log(res);
  };

  const dealwithdata = async (id) => {
    setSelectedTeacher(id);
  };

  const Submit = async (e) => {
    e.preventDefault();

    let reqBodyStudent = {
      FirstName: firstname,
      LastName: lastname,
      SchoolName: schoolname,
      Note: note,
      Code: code,
      Phone: phone,
    };

    try {
      const res = await API.post("addstudent", reqBodyStudent);
      console.log("this add student");
      console.log(res);
      const res1 = await API.get(
        `getstudentidbycode/${match.location.state.Code}`
      );

      const studentid = res1.data[0].id_stud;
      const teacherid = parseInt(SelectedTeacher);
      const timefrom = TimeFrom;
      const timeto = TimeTo;
      const date = Date;

      // all requests of private sessions //

      let reqBodyPrivate = {
        StudentId: studentid,
        UserId: teacherid,
        TimeFrom: timefrom,
        TimeTo: timeto,
        Date: date,
      };

      // console.log(reqBodyPrivate);

      const res2 = await API.post(`addprivatesession`, reqBodyPrivate);
      const res3 = await API.get(`getprivsessid/${studentid}`);
      const privateSessionId = res3.data[0].id;

      // all requests of subscription  //

      let reqBodySubs = {
        Status: status,
        StudentId: studentid,
        PrivateSessionId: privateSessionId,
      };

      const res4 = await API.post("addsubs", reqBodySubs);
      console.log("hallo", res4);
    } catch (error) {
      console.log(" Error:", error);
    }

    history.push("/PrivateStudent");
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <>
      <LoginStatus />
<TeacherBlock/>
      <div style={{ margin: "auto", width: "max-content" }}>
        <form onSubmit={Submit}>
          <Card border="info" style={{ width: "24rem" }}>
            <Card.Header> نافذة معلومات</Card.Header>
            <Card.Body>
              <Card.Title style={{ marginBottom: "1.5rem" }}>
                {" "}
                : حصص خاصة{" "}
              </Card.Title>
              <div>
                <label htmlFor="" style={{ display: "block" }}>
                  : اختر الاستاذ
                </label>
                <select
                  id="box"
                  style={{ display: "block" }}
                  name="selectTeacher"
                  required
                  onChange={(e) => dealwithdata(e.target.value)}
                >
                  <option value="">None</option>
                  {Teachers.map((teachers_data) => {
                    return (
                      <option value={teachers_data.id} key={teachers_data.id}>
                        {teachers_data.username}
                      </option>
                    );
                  })}
                </select>
              </div>

              {SelectedTeacher != "nothing" ? (
                <div>
                  <div className="form-group">
                    <label> من الساعة</label>
                    <input
                      type="time"
                      class="form-control"
                      name="description"
                      onChange={(e) => setTimeFrom(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label> الى الساعة</label>
                    <input
                      type="time"
                      class="form-control"
                      name="description"
                      onChange={(e) => setTimeTo(e.target.value)}
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label> موعد الحصة </label>
                    <input
                      type="date"
                      id="dateofsession"
                      className="form-control"
                      required
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div class="form-group">
                    <p style={{ fontSize: "18px" }}>: الاشتراك </p>
                    <input
                      type="radio"
                      name="paid"
                      value={"تم الدفع"}
                      onChange={(e) => setSubscribeStatus(e.target.value)}
                      required
                    />{" "}
                    تم الدفع
                    <br />
                    <input
                      type="radio"
                      name="paid"
                      value={"لم يدفع بعد"}
                      onChange={(e) => setSubscribeStatus(e.target.value)}
                      required
                    />{" "}
                    لم يتم الدفع
                  </div>
                </div>
              ) : (
                <p> </p>
              )}
            </Card.Body>
            <div class="modal-footer">
              <Link to="/studentpage">
                <input
                  style={{ color: "white" }}
                  type="button"
                  class="btn btn-warning"
                  data-dismiss="modal"
                  value="الغاء"
                />
              </Link>

              <input type="submit" class="btn btn-success" value="اضافة" />
            </div>
            .
          </Card>
        </form>
      </div>
    </>
  );
}

export default TaddStudentPage;
