import "../list.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";

export default function Reference() {
  const [data, setData] = useState(userRows);
const url = "http://127.0.0.1:8000/api/all_references";
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))
  }, [])
  console.log(data.id);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "Reference Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {data.reference}
          </div>
        );
      },
    },
    { 
      field: "email", 
      headerName: "Date Added", 
      width: 200 },
    {
      field: "status",
      headerName: "Link",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Type",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
