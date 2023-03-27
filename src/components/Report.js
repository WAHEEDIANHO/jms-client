import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";

function Report({ data, api, pre, handleDelete }) {
  return (
    <tr>
      <td>
        <p className="text-muted mb-0">{`${data.firstname}, ${data.lastname} ${data?.othername}`}</p>
      </td>
      <td>
        <p className="text-muted mb-0">{data.phone}</p>
      </td>
      <td>
        <p className="text-muted mb-0">{data.address}</p>
      </td>
      {/* <td>
            <span className="badge bg-success rounded-pill d-inline">
              Active
            </span>
          </td> */}
      <td>{data.hasOwnProperty("role") ? data.role : data.crime}</td>
      <td>
        <EditBtn pre={pre} id={data._id} />
        {sessionStorage.getItem("isAdmin") === "true" ? (
          <DeleteBtn id={data._id} handleDelete={handleDelete} />
        ) : null}
      </td>
    </tr>
  );
}

export default Report;
