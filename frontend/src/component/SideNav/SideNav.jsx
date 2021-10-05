import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.png";
import "./SideNav.css";
import CookieService from "../../CookieService";
import { useHistory } from "react-router";

export default function SideNav() {
  let history = useHistory();
  const username = CookieService.get("UserName");
  const getToggle = () => {
    const showMenu = (headerToggle, navbarId) => {
      const toggleBtn = document.getElementById(headerToggle),
        nav = document.getElementById(navbarId);
      if (headerToggle && navbarId) {
        toggleBtn.addEventListener("click", () => {
          nav.classList.toggle("show-menu");
          toggleBtn.classList.toggle("bx-x");
        });
      }
    };
    showMenu("header-toggle", "navbar");
    const linkColor = document.querySelectorAll(".nav__link");

    function colorLink() {
      linkColor.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    }

    linkColor.forEach((l) => l.addEventListener("click", colorLink));
  };

  useEffect(() => {
    getToggle();
  }, []);

  const logoutevent = async (e) => {
    e.preventDefault();
    CookieService.remove("access_token");
    history.push("/");
  };

  return (
    <>
      <header className="header">
        <div className="header__container">
          <div class="header__toggle">
            <i class="bx bx-menu" id="header-toggle"></i>
          </div>

          <img alt="" class="header__img" />

          <div class="header__search">
            اهلا وسهلا <br/>
           {username}
          </div>
        </div>
      </header>

      <div class="nav" id="navbar">
        <nav class="nav__container">
          <div>
            <a href="#" class="nav_link nav_logo">
              <img
                class=" nav__icon logo"
                src={Logo}
                alt="Logo"
                style={{
                  width: "100px",
                  display: "block",
                  margin: "auto",
                }}
              />
              <span class="nav__logo-name">مركز رؤية التعليمي</span>
            </a>

            <div class="nav__list">
              <div class="nav__items">
                <h3 class="nav__subtitle"></h3>

                <Link to="/HomePage" class="nav__link active"
                style={{textDecoration:'none'}}>
                  <i class="bx bx-home nav__icon"></i>
                  <span class="nav__name">الصفحة الرئيسية</span>
                </Link>

                {CookieService.get("Role") != "teacher" ? (
                  <div class="nav__dropdown">
                    <Link to="/userpage" class="nav__link"
                    style={{textDecoration:'none'}}>
                      <i class="bx bx-user nav__icon"></i>
                      <span class="nav__name">الاعضاء</span>
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div class="nav__dropdown">
                <a href="#" class="nav__link" style={{textDecoration:'none'}}>
                  <i class="bx bx-group nav__icon "></i>
                  <span class="nav__name">الطلاب</span>
                  <i class="bx bx-chevron-down nav__icon nav__dropdown-icon"></i>
                </a>

                <div class="nav__dropdown-collapse">
                  <div class="nav__dropdown-content">
                    <Link to="/StudentPage" class="nav__dropdown-item"
                    style={{textDecoration:'none'}}>
                      طلاب الدورات
                    </Link>
                    <Link to="/PrivateStudent" class="nav__dropdown-item"
                    style={{textDecoration:'none'}}>
                      طلاب الخاص
                    </Link>
                  </div>
                </div>
              </div>

              <div class="nav__items">
                {CookieService.get("Role") != "teacher" ? (
                  <>
                    <div class="nav__dropdown">
                      <Link to="/classpage" class="nav__link"
                      style={{textDecoration:'none'}}>
                        <i class="bx bxs-school nav__icon"></i>
                        <div class="nav__name"> ادرارة الصفوف</div>
                      </Link>
                    </div>

                    <div class="nav__dropdown">
                      <Link to="/coursepage" class="nav__link"
                      style={{textDecoration:'none'}}>
                        <i class="bx bx-task nav__icon"></i>
                        <div class="nav__name"> الدورات</div>
                      </Link>
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div class="nav__dropdown">
                  <Link to="/privatesession" class="nav__link"
                  style={{textDecoration:'none'}}>
                    <i class="bx bx-briefcase-alt nav__icon "></i>
                    <span class="nav__name"> الحصص الخاصة</span>
                  </Link>
                </div>

                <div class="nav__dropdown">
                  <a href="#" class="nav__link">
                    <i class="bx bx-calendar-exclamation nav__icon "></i>
                    <span class="nav__name">الحضور</span>
                    <i class="bx bx-chevron-down nav__icon nav__dropdown-icon"></i>
                  </a>

                  <div class="nav__dropdown-collapse">
                    <div class="nav__dropdown-content">
                      <Link to="/attendance" class="nav__dropdown-item"
                      style={{textDecoration:'none'}}>
                        اخذ الحضور
                      </Link>
                      <Link to="/attendanceview" class="nav__dropdown-item"
                      style={{textDecoration:'none'}}>
                        عرض الحضور
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "50px" }}>
            <Link to="" class="nav_link nav_logout"
            style={{textDecoration:'none'}}
            onClick={logoutevent}>
              <i class="bx bx-log-out bx-tada nav__icon"></i>
              <span class="nav__name">تسجيل الخروج</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
