import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import Mainpage from "./component/MainPage/MainPage";
import Login from "./component/login/login";
import "./App.css";
import UserPage from "./component/UserPage/UserPage";
import AddUser from "./component/AddUser/AddUser";
import EditUser from "./component/EditUser/EditUser";
import ClassPage from "./component/ClassPage/ClassPage";
import Course from "./component/Courses/CoursePage";
import AllCourses from "./component/Courses/allcourses";
import AddCourse from "./component/AddCourse/AddCourse";
import AddClass from "./component/AddClass/AddClass";
import StudentPrivpage from "./component/StudentPage/StudentPrivatePage";
import TaddStudentPage from "./component/AddStudent/TaddStudentPage";
import PopupCourse from "./component/AddStudent/popupCourse";
import AddStudent from "./component/AddStudent/AddStudent";
import StudentPage from "./component/StudentPage/StudentPage";
import Attendance from "./component/Attendance/Attendance";
import ViewAttendance from "./component/ViewAttendance/ViewAttendance";
import PrivateSession from "./component/PrivateSession/PrivateSession";
import AddSession from "./component/AddSession/AddSession";
import EditSession from "./component/EditSession/EditSession";
import StudentProfile from "./component/StudentProfile/StudentProfile";
import EditPrivStudent from "./component/EditStudent/EditPrivStudent";
import EditStudent from "./component/EditStudent/EditStudent";

function App() {
  return (
    <div className="App">
      <div className="sans-serif">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Login IsRoleAdmin={false} />}
            />
            <Route
              path="/homepage"
              component={() => <Mainpage IsRoleAdmin={false} />}
            />
            <Route path="/userpage" component={UserPage} />
            <Route path="/adduser" component={AddUser} />
            <Route path="/edituser/:id" component={EditUser} />
            <Route path="/classpage" component={ClassPage} />
            <Route path="/coursepage" component={Course} />
            <Route path="/CoursesAll" component={AllCourses} />
            <Route path="/addCourse" component={AddCourse} />
            <Route path="/addclass" component={AddClass} />
            <Route path="/PrivateAddStudent" component={TaddStudentPage} />
            <Route path="/PrivateStudent" component={StudentPrivpage} />
            <Route path="/CourseAddStudent" component={PopupCourse} />
            <Route path="/addstudent" component={AddStudent} />
            <Route path="/StudentPage" component={StudentPage} />
            <Route path="/Attendance" component={Attendance} />
            <Route path="/attendanceview" component={ViewAttendance} />
            <Route path="/privatesession" component={PrivateSession} />
            <Route path="/addsession" component={AddSession} />
            <Route path="/editsession/:id" component={EditSession} />
            <Route path="/studentprofile/:id" component={StudentProfile} />
            <Route path="/editStudent" component={EditStudent} />
            <Route path="/editprivStudent" component={EditPrivStudent} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
