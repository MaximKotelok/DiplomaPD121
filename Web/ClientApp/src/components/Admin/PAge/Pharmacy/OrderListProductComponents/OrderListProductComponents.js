import React from "react";
import styles from "./OrderListProductComponents.module.css";
import "./OrderListProductComponents.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import SearchComponent from "../../../../Common/SearchComponent/SearchComponent";
import CustomImgComponent from "../../../../Common/CustomImgComponent/CustomImgComponent";
import BtnEditStatusModalOrderList from "./components/BtnEditStatusModalOrderList/BtnEditStatusModalOrderList";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";

const columns = [
  { id: "position", label: "Позиція", minWidth: 220 },
  { id: "dataOrder", label: "Дата", minWidth: 200 },
  {
    id: "phoneNumber",
    label: "Мобільний номер",
    minWidth: 220,
    editable: true,
    // format: (value) => value.toLocaleString("en-US"),
  },
  { id: "priceCount", label: "Ціна (шт)", minWidth: 200 },
  {
    id: "status",
    label: "Статус",
    minWidth: 200,
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
    position: "Артем Пивоваров",
    dataOrder: "05/02/2024",
    phoneNumber: "+38 (067) 837 9412",
    priceCount: "53(1шт)",
    status: "1",
  },
  {
    position: "Артем Пивоваров",
    dataOrder: "05/02/2024",
    phoneNumber: "+38 (067) 837 9412",
    priceCount: "1500(3шт)",
    status: "2",
  },
  {
    position: "Артем Пивоваров",
    dataOrder: "05/02/2024",
    phoneNumber: "+38 (067) 837 9412",
    priceCount: "500(2шт)",
    status: "3",
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

export const OrderListProductComponents = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [countOfPages, setCountOfPages] = React.useState(1);
  //const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [rows, setRows] = React.useState([]);
  const [statuses, setStatuses] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} row`}>
        <div className="col-6">
          <SearchComponent />
        </div>

        <div className="col-6"></div>

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
                <React.Fragment>
                  {rows.map((row, index) => (
                    <TableRow className={`${styles["tb-user"]}`} key={index}>
                      <TableCell>{row.position}</TableCell>
                      <TableCell>{row.dataOrder}</TableCell>
                      <TableCell>{row.phoneNumber}</TableCell>
                      <TableCell>{row.priceCount}</TableCell>

                      <TableCell>
                        <div
                          className={`d-flex justify-content-between align-items-center`}
                        >
                          <div
                            className={`${styles["span-status-rozmir"]} ${styles["span-status-color1"]}`}
                            style={
                              {
                                // backgroundColor: getStatusColor(row.status),
                              }
                            }
                          >
                            hello
                            {/* {getStatusText(row.status)} */}
                          </div>
                          <BtnEditStatusModalOrderList />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              </TableBody>
            </Table>
          </TableContainer>
          <div className={`d-flex justify-content-end align-items-center`}>
            {/* <PaginationComponent 
              setContent={(a)=>setRows(a)}
              getContent={async (page)=>{
                let res = await getAllProductConfirm(page);
                if(res.status === Success){
                  return res.data.data;
                }
              }}
              allowAppend={false}
              page={page}
              setPage={setPage}
              countOfPages={countOfPages}
              /> */}
          </div>
        </Paper>
      </div>
    </div>
  );
};
