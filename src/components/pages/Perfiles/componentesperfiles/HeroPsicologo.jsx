import "./Hero.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function HeroPsicologo() {
  const userRows = [
    {
      id: 1,
      username: "Mary Rosamund",
      date: "1/05/2021",
      transaction: "$21.00",
    },
    {
      id: 2,
      username: "Jane Doe",
      date: "2/05/2021",
      transaction: "$22.00",
    },
    {
      id: 3,
      username: "Sherlock Watson",
      date: "3/05/2021",
      transaction: "$23.00",
    },
    {
      id: 4,
      username: "John Holmes",
      date: "4/05/2021",
      transaction: "$24.00",
    },
    {
      id: 5,
      username: "Andres Gonzales",
      date: "5/05/2021",
      transaction: "$24.00",
    },
    {
      id: 6,
      username: "Mycroft Lestrade",
      date: "6/05/2021",
      transaction: "$25.00",
    },
    {
      id: 7,
      username: "Jorge Perez",
      date: "7/05/2021",
      transaction: "$26.00",
    },
    {
      id: 8,
      username: "Mycroft Lestrade",
      date: "8/05/2021",
      transaction: "$27.00",
    },
    {
      id: 9,
      username: "Andres Gonzales",
      date: "9/05/2021",
      transaction: "$28.00",
    },
  ];

  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Nombre",
      width: 200,
    },
    { field: "date", headerName: "Fecha de consulta", width: 200 },
    {
      field: "transaction",
      headerName: "Pago Consulta",
      width: 180,
    },
    {
      field: "action",
      headerName: "Borrar",
      width: 150,
      renderCell: (params) => {
        return (
          <>
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
      <h1 className="titulo1">Agenda de Citas</h1>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={9}
        checkboxSelection
      />
    </div>
  );
}
