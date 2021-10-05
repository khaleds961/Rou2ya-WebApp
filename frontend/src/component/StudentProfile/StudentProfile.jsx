import "./StudentProfile.css";
import SideNav from "../SideNav/SideNav";
import React, { useState, useEffect } from "react";
import API from "../../api";
import LoginStatus from "../../loginstatus";

export default function StudentProfile(props) {
  const [students, setstudents] = useState({});

  const fetchData = async (id) => {
    console.log("ok");
    await API.get(`joinstudentbyid/${id}`).then((res) => {
      setstudents(res.data.data[0]);
    });
  };

  useEffect(() => {
    fetchData(props.match.params.id);
  }, []);

  return (
    <>
      <LoginStatus />

      <SideNav />
      <div class="rt-container">
        <div class="col-rt-12">
          <div class="Scriptcontent">
            <div class="student-profile py-4" id="okey">
              <div class="container">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="card shadow-sm">
                      <div class="card-header bg-transparent text-center">
                        <h3>
                          {students.FirstName} {students.LastName}
                        </h3>
                      </div>
                      <div class="card-body">
                        <p class="mb-0">
                          <strong class="pr-1">رقم الطالب: </strong>
                          {students.StudentId}
                        </p>
                        <p class="mb-0">
                          <strong class="pr-1">الأستاذ المشرف: </strong>
                          {students.username}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-8">
                    <div class="card shadow-sm">
                      <div class="card-header bg-transparent border-0">
                        <h3 class="mb-0">
                          <i
                            class="bx bx-merge"
                            style={{ color: "#ee5e46" }}
                          ></i>{" "}
                          ملف الطالب
                        </h3>
                      </div>
                      <div class="card-body pt-0">
                        <table class="table table-bordered">
                          <tr>
                            <th style={{ width: "30%" }}>اسم المدرسة</th>
                            <td style={{ width: "2%" }}>:</td>
                            <td>{students.SchoolName}</td>
                          </tr>
                          <tr>
                            <th style={{ width: "30%" }}>رقم الهاتف </th>
                            <td style={{ width: "2%" }}>:</td>
                            <td>{students.Phone}</td>
                          </tr>
                          <tr>
                            <th style={{ width: "30%" }}>الرمز الشخصي</th>
                            <td style={{ width: "2%" }}>:</td>
                            <td>{students.Code}</td>
                          </tr>
                          <tr>
                            <th style={{ width: "30%" }}>نوع القراءة</th>
                            <td style={{ width: "2%" }}>:</td>
                            <td>{students.Type}</td>
                          </tr>
                          <tr>
                            <th style={{ width: "30%" }}>نوع الرواية</th>
                            <td style={{ width: "2%" }}>:</td>
                            <td>{students.Riwaya}</td>
                          </tr>
                          <tr>
                            <th style={{ width: "30%" }}>السورة </th>
                            <td style={{ width: "2%" }}>:</td>
                            <td>{students.Surah}</td>
                          </tr>
                          <tr>
                            <th style={{ width: "30%" }}>من الاية </th>
                            <td style={{ width: "2%" }}>:</td>
                            <td>{students.VerseFrom}</td>
                          </tr>
                          <tr>
                            <th style={{ width: "30%" }}>الى الاية </th>
                            <td style={{ width: "2%" }}>:</td>
                            <td>{students.VerseTo}</td>
                          </tr>
                          <tr>
                            <th style={{ width: "30%" }}>من الصفحة </th>
                            <td style={{ width: "2%" }}>:</td>
                            <td>{students.PageFrom}</td>
                          </tr>
                          <tr>
                            <th style={{ width: "30%" }}>الى الصفحة </th>
                            <td style={{ width: "2%" }}>:</td>
                            <td>{students.PageTo}</td>
                          </tr>
                          <tr>
                            <th style={{ width: "30%" }}>تاريخ اخر حصة </th>
                            <td style={{ width: "2%" }}>:</td>
                            <td>{students.Date}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div style={{ height: "26px" }}></div>
                    <div class="card shadow-sm">
                      <div class="card-header bg-transparent border-0">
                        <h3 class="mb-0">
                          <i
                            class="bx bxs-error-circle bx-flashing"
                            style={{ color: "#ee5e46" }}
                          ></i>{" "}
                          تنبيه
                        </h3>
                      </div>
                      <div class="card-body pt-0">
                        <p>
                          هذه المعلومات خاصة بالمنظمة ولا يحق لأي شخص استخدامها
                          أو استخدامها لأي غرض من الأغراض
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
