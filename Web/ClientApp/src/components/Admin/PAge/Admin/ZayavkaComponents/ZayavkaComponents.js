import React from "react";
import styles from "./ZayavkaComponents.module.css";
import "./ZayavkaComponents.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import BtnEditStatusModal from "./components/BtnEditStatusModal/BtnEditStatusModal";
import SearchComponent from "../../../../Common/SearchComponent/SearchComponent";

const columns = [
  { id: "position", label: "Позиція", minWidth: 170 },
  { id: "category", label: "Категорія", minWidth: 170 },
  {
    id: "manufacture",
    label: "Виробник",
    minWidth: 170,
    editable: true,
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "price",
    label: "Ціна",
    minWidth: 120,
    editable: true,
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Статус",
    minWidth: 120,
    editable: true,
    // align: "right",
    format: (value) => value.toFixed(2),
  },
];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

const rows = [
  {
    name: "Аптека 1",
    data: [
      {
        position: "Полиця 1",
        category: "Вітаміни",
        manufacture: "Manufacturer 1",
        price: 200.5,
        status: "Не коректне",
        idstatus: "1",
      },
    ],
  },
  {
    name: "Аптека 2",
    data: [
      {
        position: "Полиця 3",
        category: "Вітаміни",
        manufacture: "Manufacturer 2",
        price: 150.75,
        status: "Не коректне",
        idstatus: "1",
      },
      {
        position: "Полиця 5",
        category: "Аналгетики",
        manufacture: "Manufacturer 3",
        price: 300.25,
        status: "На перевірці",
        idstatus: "2",
      },
      {
        position: "Полиця 7",
        category: "Пробіотики",
        manufacture: "Manufacturer 4",
        price: 120.9,
        status: "Коректне",
        idstatus: "3",
      },
    ],
  },
  {
    name: "Аптека 3",
    data: [
      {
        position: "Полиця 2",
        category: "Аналгетики",
        manufacture: "Manufacturer 5",
        price: 220.35,
        status: "На перевірці",
        idstatus: "2",
      },
    ],
  },

  // Додайте інші записи за потреби
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    // maxHeight: 400,
  },
});

export const ZayavkaComponents = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

 

  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} row`}>
        <div className="col-5">
          <SearchComponent />
        </div>

        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        borderBottom: "none",
                      }}
                    >
                      <h6 className={`${styles["head-table"]}`}>
                        {column.label}
                      </h6>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((pharmacy, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell
                        colSpan={12}
                        className={`${styles["header-body-pharmacy"]}`}
                      >
                        {pharmacy.name}
                      </TableCell>
                    </TableRow>

                    {pharmacy.data.map((item, itemIndex) => (
                      <TableRow
                        className={`${styles["tb-pharmacy"]}`}
                        key={itemIndex}
                      >
                        <TableCell>
                          <img
                            className={`${styles["img-product"]}`}
                            src="https://root.tblcdn.com/img/goods/8d1aab55-2c38-11ec-bacc-0050569aacb6/1/img_0.jpg?v=AAAAAAmKo34"
                          />{" "}
                          {item.position}
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.manufacture}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>
                          <div
                            className={`d-flex justify-content-between align-items-center`}
                          >
                            <div
                              className={`${
                                styles["span-status-color" + item.idstatus]
                              }
                            ${styles["span-status-rozmir"]}
                            `}
                            >
                              {item.status}
                            </div>
                            <BtnEditStatusModal text="hello" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={`d-flex justify-content-end align-items-center`}>
            <span className={`${styles["text-pagination"]}`}>{`${
              page + 1
            } з ${Math.ceil(rows.length / rowsPerPage)}`}</span>
            <TablePagination
              className=""
              component="div"
              count={-1}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[]}
              labelDisplayedRows={({ from, to }) => ""}
            />
          </div>
        </Paper>
      </div>
    </div>
  );
};
