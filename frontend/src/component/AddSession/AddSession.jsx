import "../UserPage/UserPage.css";
import React, { useState } from "react";
import { useHistory } from "react-router";
import SideNav from "../SideNav/SideNav";
import StudentList from "../StudentList";
import TeacherList from "../TeacherList";
import { Link } from "react-router-dom";
import LoginStatus from "../../loginstatus";


export default function AddClass(props) {
  const [Student, setStudent] = useState("");
  const [Teacher, setTeacher] = useState("");
  const [Type, setType] = useState("");
  const [Riwaya, setRiwaya] = useState("");
  const [Surah, setSurah] = useState("");
  const [TimeFrom, setTimeFrom] = useState("");
  const [TimeTo, setTimeTo] = useState("");
  const [PageFrom, setPageFrom] = useState("");
  const [PageTo, setPageTo] = useState("");
  const [VerseFrom, setVerseFrom] = useState("");
  const [VerseTo, setVerseTo] = useState("");
  const [Note, setNote] = useState("");
  const [Date, setDate] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("StudentId", Student);
      formData.append("UserId", Teacher);
      formData.append("Type", Type);
      formData.append("Riwaya", Riwaya);
      formData.append("Surah", Surah);
      formData.append("TimeFrom", TimeFrom);
      formData.append("TimeTo", TimeTo);
      formData.append("PageFrom", PageFrom);
      formData.append("PageTo", PageTo);
      formData.append("VerseFrom", VerseFrom);
      formData.append("VerseTo", VerseTo);
      formData.append("Note", Note);
      formData.append("Date", Date);

      let url = `//localhost:8000/api/addprivatesession`;
      console.log('ok',TimeTo)
      await fetch(url, {
        method: "post",
        body: formData,
      });
    } catch (err) {
      setError(error);
    }
    history.push("/privatesession");
  };

  return (
    <>
    <LoginStatus/>
      <SideNav />
      <div id="addEmployeeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <form onSubmit={handleSubmit}>
            <div class="headers">
                <h4>اضافة حصة جديدة</h4>
              </div>
              <div class="modal-body">
                  
              <div class="form-group">
                  <StudentList onChange={(e) => setStudent(e.target.value)} />
                </div>

                <div class="form-group">
                  <TeacherList onChange={(e) => setTeacher(e.target.value)} />
                </div>

                <div class="form-group">
                  <select
                    id="outside"
                    value={Type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">القراءة</option>
                    <option value="اجازة" >
                        اجازة
                        </option>
                    <option value="غير اجازة">
                        غير اجازة
                        </option>
                  </select>
                </div>

                <div class="form-group">
                  <label> نوع الرواية</label>
                  <input
                    type="text"
                    class="form-control"
                    name="riwaya"
                    onChange={(e) => setRiwaya(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label> السورة</label>
                  <input
                    type="text"
                    class="form-control"
                    name="surah"
                    onChange={(e) => setSurah(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label> من الصفحة</label>
                  <input
                    type="text"
                    class="form-control"
                    name="pagefrom"
                    onChange={(e) => setPageFrom(e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label> الى الصفحة</label>
                  <input
                    type="text"
                    class="form-control"
                    name="pageto"
                    onChange={(e) => setPageTo(e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label> من الاية</label>
                  <input
                    type="text"
                    class="form-control"
                    name="versefrom"
                    onChange={(e) => setVerseFrom(e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label> الى الاية</label>
                  <input
                    type="text"
                    class="form-control"
                    name="verseto"
                    onChange={(e) => setVerseTo(e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label> ملاحظة</label>
                  <input
                    type="text"
                    class="form-control"
                    name="note"
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label> التاريخ</label>
                  <input
                    type="date"
                    class="form-control"
                    name="date"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label> من الساعة</label>
                  <input
                    type="time"
                    class="form-control"
                    name="TimeFrom"
                    //   value={description}
                    onChange={(e) => setTimeFrom(e.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label> الى الساعة</label>
                  <input
                    type="time"
                    class="form-control"
                    name="TimeTo"
                    //   value={description}
                    onChange={(e) => setTimeTo(e.target.value)}
                    required
                  />
                </div>

              </div>
              <div class="modal-footer">
              <Link to="/privatesession">
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
