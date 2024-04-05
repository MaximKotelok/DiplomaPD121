import React from "react";
import styles from "./UsersComponents.module.css";
import "./UsersComponents.css";
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
import { useEffect } from "react";
import { getAllProductConfirm } from "../../../../../services/productConfirm";
import { ApiPath, STANDART_IMG, Success } from "../../../../../utils/Constants";
import CustomImgComponent from "../../../../Common/CustomImgComponent/CustomImgComponent";
import { getAllStatuses } from "../../../../../services/productStatus";
import PaginationComponent from "../../../../Common/PaginationComponent/PaginationComponent";
import BtnEditStatusModalUser from "./components/BtnEditStatusModalUser/BtnEditStatusModalUser";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";

const columns = [
  { id: "user", label: "Користувач", minWidth: 270 },
  { id: "email", label: "Пошта", minWidth: 270 },
  {
    id: "phoneNumber",
    label: "Мобільний номер",
    minWidth: 270,
    editable: true,
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Статус",
    minWidth: 230,
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
    user: "Артем Пивоваров",
    email: "artme@gmailc.com",
    phoneNumber: "+38 (067) 837 9412",
    status: "1",
  },
  {
    user: "Артем Пивоваров",
    email: "artme@gmailc.com",
    phoneNumber: "+38 (067) 837 9412",
    status: "3",
  },
  {
    user: "Артем Пивоваров",
    email: "artme@gmailc.com",
    phoneNumber: "+38 (067) 837 9412",
    status: "2",
  },
  {
    user: "Артем Пивоваров",
    email: "artme@gmailc.com",
    phoneNumber: "+38 (067) 837 9412",
    status: "4",
  },
  {
    user: "Артем Пивоваров",
    email: "artme@gmailc.com",
    phoneNumber: "+38 (067) 837 9412",
    status: "4",
  },
  {
    user: "Артем Пивоваров",
    email: "artme@gmailc.com",
    phoneNumber: "+38 (067) 837 9412",
    status: "5",
  },
  {
    user: "Артем Пивоваров",
    email: "artme@gmailc.com",
    phoneNumber: "+38 (067) 837 9412",
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

export const UsersComponents = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [countOfPages, setCountOfPages] = React.useState(1);
  //const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [rows, setRows] = React.useState([]);
  const [statuses, setStatuses] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // useEffect(() => {
  //   init();
  // }, []);

  // async function init() {
  //   const res = await getAllProductConfirm(page);
  //   const statusesRes = await getAllStatuses();
  //   if (res.status === Success && statusesRes.status === Success) {
  //     //console.log(res);
  //     setStatuses(statusesRes.data);
  //     setRows(res.data.data);
  //     setCountOfPages(res.data.countOfPages);
  //     console.log(res);
  //   }
  // }
  // console.log(statuses);

  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} row`}>
        <div className="col-6">
          <SearchComponent />
        </div>

        <div className="col-6">
          <CheckedBox text="Показувати лише фарма-компанії?" />
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
                    {rows.map((row, index) => (
                      <TableRow className={`${styles["tb-user"]}`} key={index}>
                        <TableCell>
                          <CustomImgComponent
                            className={`${styles["img-product"]}`}
                            // src={`${ApiPath}${item.pathToPhoto}`}
                            src={``}
                          />{" "}
                          {row.user}
                        </TableCell>

                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phoneNumber}</TableCell>
                        <TableCell>
                          <div
                            className={`d-flex justify-content-between align-items-center`}
                          >
                            <div
                              className={`${styles["span-status-rozmir"]}`}
                              style={
                                {
                                  // backgroundColor: getStatusColor(row.status),
                                }
                              }
                            >
                              {/* {getStatusText(row.status)} */}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <BtnEditStatusModalUser />
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
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
