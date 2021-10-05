import { Link } from "react-router-dom";
import API from "../../api";
import React, { useState, useEffect } from "react";
import SideNav from "../SideNav/SideNav";
import LoginStatus from "../../loginstatus";

export default function EditUser(props) {
  const [type, settype] = useState("");
  const [riwaya, setriwaya] = useState("");
  const [surah, setsurah] = useState("");
  const [timefrom, settimefrom] = useState("");
  const [timeto, settimeto] = useState("");
  const [pagefrom, setpagefrom] = useState("");
  const [pageto, setpageto] = useState("");
  const [versefrom, setversefrom] = useState("");
  const [verseto, setverseto] = useState("");
  const [note, setnote] = useState("");
  const [date, setdate] = useState("");

  let fetchData = async (id) => {
    const url = `http://localhost:8000/api/getprivatesessionbyid/${id}`;
    const response = await fetch(url);
    let result = await response.json();
    settype(result[0].Type);
    setriwaya(result[0].Riwaya);
    setsurah(result[0].Surah);
    settimefrom(result[0].TimeFrom);
    settimeto(result[0].TimeTo);
    setpagefrom(result[0].PageFrom);
    setpageto(result[0].PageTo);
    setversefrom(result[0].VerseFrom);
    setverseto(result[0].VerseTo);
    setnote(result[0].Note);
    setdate(result[0].Date);

    console.log(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = props.match.params.id;
    let reqBody = {
      Type: type,
      Riwaya: riwaya,
      Surah: surah,
      TimeFrom: timefrom,
      TimeTo: timeto,
      VerseFrom: versefrom,
      VerseTo: verseto,
      PageFrom: pagefrom,
      PageTo: pageto,
      VerseFrom: versefrom,
      VerseTo: verseto,
      Note: note,
      Date: date,
    };
    await API.put(`editprivatesession/${id}`, reqBody);
    await props.history.push("/privatesession");
  };

  useEffect(() => {
    fetchData(props.match.params.id);
  }, []);

  return (
    <>
      <LoginStatus />

      <SideNav />
      <div id="editEmployeeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <form onSubmit={handleSubmit}>
              <div class="modal-header">
                <h4 class="modal-title">تعديل الحصة</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <select
                    id="outside"
                    value={type}
                    onChange={(e) => settype(e.target.value)}
                  >
                    <option value="">القراءة</option>

                    <option value="اجازة">اجازة</option>
                    <option value="غير اجازة">غير اجازة</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>الرواية</label>
                  <input
                    type="text"
                    class="form-control"
                    name="riwaya"
                    value={riwaya}
                    onChange={(e) => setriwaya(e.target.value)}
                  ></input>
                </div>

                <div class="form-group">
                  <label>السورة</label>
                  <input
                    type="text"
                    class="form-control"
                    name="surah"
                    value={surah}
                    onChange={(e) => setsurah(e.target.value)}
                  ></input>
                </div>

                <div class="form-group">
                  <label>من الساعة</label>
                  <input
                    type="time"
                    class="form-control"
                    name="timefrom"
                    value={timefrom}
                    onChange={(e) => settimefrom(e.target.value)}
                  ></input>
                </div>

                <div class="form-group">
                  <label>الى الساعة</label>
                  <input
                    type="time"
                    class="form-control"
                    name="timeto"
                    value={timeto}
                    onChange={(e) => settimeto(e.target.value)}
                  ></input>
                </div>

                <div class="form-group">
                  <label>من الصفحة</label>
                  <input
                    type="text"
                    class="form-control"
                    name="pagefrom"
                    value={pagefrom}
                    onChange={(e) => setpagefrom(e.target.value)}
                  ></input>
                </div>

                <div class="form-group">
                  <label>الى الصفحة</label>
                  <input
                    type="text"
                    class="form-control"
                    name="pageto"
                    value={pageto}
                    onChange={(e) => setpageto(e.target.value)}
                  ></input>
                </div>

                <div class="form-group">
                  <label>من الاية</label>
                  <input
                    type="text"
                    class="form-control"
                    name="versefrom"
                    value={versefrom}
                    onChange={(e) => setversefrom(e.target.value)}
                  ></input>
                </div>

                <div class="form-group">
                  <label>الى الاية</label>
                  <input
                    type="text"
                    class="form-control"
                    name="verseto"
                    value={verseto}
                    onChange={(e) => setverseto(e.target.value)}
                  ></input>
                </div>

                <div class="form-group">
                  <label>ملاحظة</label>
                  <input
                    type="text"
                    class="form-control"
                    name="note"
                    value={note}
                    onChange={(e) => setnote(e.target.value)}
                  ></input>
                </div>

                <div class="form-group">
                  <label>التاريخ</label>
                  <input
                    type="date"
                    class="form-control"
                    name="date"
                    value={date}
                    onChange={(e) => setdate(e.target.value)}
                  ></input>
                </div>
              </div>
              <div class="modal-footer">
                <Link to="/privatesession">
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
