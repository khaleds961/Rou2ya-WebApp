import React, { Component } from "react";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from "daypilot-pro-react";
import "./CalendarStyles.css";
import SideNav from "../SideNav/SideNav";
import API from "../../api";
import LoginStatus from "../../loginstatus";

const styles = {
  wrap: {
    display: "flex",
  },
  left: {
    marginRight: "10px",
  },
  main: {
    flexGrow: "1",
  },
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      viewType: "Week",
      durationBarVisible: true,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async (args) => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt(
          "Create a new event:",
          "Event 1"
        );
        dp.clearSelection();
        if (!modal.result) {
          return;
        }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result,
        });
      },
      eventDeleteHandling: "Update",
      onEventClick: async (args) => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("", args.e.text());
        if (!modal.result) {
          return;
        }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);
      },
    };
  }

  fetchData = async () => {
    await API.get(`joinstudentuser`).then((res) => {
      if (res.data) {
        let students = res.data;
        this.setState({ students: students });
      }
    });
  };

  async componentDidMount() {
    await this.fetchData();
    this.setState({
      events: this.state.students.map((item) => ({
        id: item.id_stud,
        text:
          "الاستاذ: " +
          item.username +
          " --> " +
          item.FirstName +
          " " +
          item.LastName,
        start: item.Date + "T" + item.TimeFrom + ":00",
        end: item.Date + "T" + item.TimeTo + ":00",
      })),
    });
  }

  render() {
    var { ...config } = this.state;
    return (
      <>
        <LoginStatus />
        <SideNav />

        <div style={styles.wrap}>
          <div style={styles.left}>
            <DayPilotNavigator
              selectMode={"week"}
              onTimeRangeSelected={(args) => {
                this.setState({
                  startDate: args.day,
                });
              }}
            />
          </div>
          <div style={styles.main}>
            <DayPilotCalendar
              {...config}
              ref={(component) => {
                this.calendar = component && component.control;
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Calendar;
