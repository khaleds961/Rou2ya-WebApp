import CourseClasses from "./CourseClasses";
export default function (props) {
  return (
  
    <tr style={{width:'90%'}}>
      <td style={{width:'30%'}}>{props.CourseName}</td>
      <td>
        <CourseClasses CourseId={props.id} />
      </td>
      <td>
        <a
          href="#"
          class="delete"
          data-toggle="modal"
          onClick={() => props.delete(props.id)}
        >
          <i class="material-icons" data-toggle="tooltip" title="Delete">
            &#xE872;
          </i>
        </a>
      </td>
    </tr>
  );
}
