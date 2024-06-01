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
import { ApiPath, STANDART_IMG, Success, itemsPerPageForAdmin } from "../../../../../utils/Constants";
import CustomImgComponent from "../../../../Common/CustomImgComponent/CustomImgComponent";
import { getAllStatuses } from "../../../../../services/productStatus";
import PaginationComponent from "../../../../Common/PaginationComponent/PaginationComponent";
import BtnEditStatusModalUser from "./components/BtnEditStatusModalUser/BtnEditStatusModalUser";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
import { getAllUsers } from "../../../../../services/user";
import DefaultUserPhoto from "../../../../../assets/images/user/user-photo-default.svg";
import { useParams } from "react-router";

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

const statuses = [
  {
    id: true,
    status: "Заблокований",
    color: "#FF3B30",
  },
  {
    id: false,
    status: "Активний",
    color: "#3BA42A",
  },
];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

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
  const { paramPage } = useParams();
  const [page, setPage] = React.useState(1);
  const [countOfPages, setCountOfPages] = React.useState(1);
  const [emptyRowCount, setEmptyRowCount] = React.useState(0);
  //const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  useEffect(() => {
    init(paramPage);
  }, []);

  useEffect(()=>{

    if(itemsPerPageForAdmin > rows.length){
      setEmptyRowCount(itemsPerPageForAdmin - rows.length)
    }else{
      setEmptyRowCount(0)
    }
  },[rows])

  async function init(paramPage) {
    let page = paramPage ? parseInt(paramPage):1;
    setPage(page)
    let res = await getAllUsers(page);
    if (res.status === Success) {
      setCountOfPages(res.data.countOfPages);
      setRows(res.data.data);
    }
  }

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
      <div className={`${styles["box-container"]} `}>
        <div className="col-6">
          <SearchComponent
            callback={async (text) => {
              let page = 1;
              setPage(1);
              const res = await getAllUsers(page, text);
              if (res.status === Success) {
                //console.log(res);
                setRows(res.data.data);
                setCountOfPages(res.data.countOfPages);
              }
            }}
          />
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
                <React.Fragment>
                  {rows.map((row, index) => (
                    <TableRow className={`${styles["tb-user"]} max-row-size`} key={index}>
                      <TableCell>
                        <CustomImgComponent
                          className={`${styles["img-product"]}`}
                          src={`${ApiPath}${row.pathToPhoto}`}
                          defaultSrc={DefaultUserPhoto}
                        />{" "}
                        {row.user}
                      </TableCell>

                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        {row.phoneNumber ? row.phoneNumber : "НЕМАЄ"}
                      </TableCell>
                      <TableCell>
                        <div
                          className={`d-flex justify-content-between align-items-center`}
                        >
                          <div
                            className={`${styles["span-status-rozmir"]}`}
                            style={{
                              backgroundColor: statuses.find(
                                (a) => a.id === row.isBanned
                              ).color,
                            }}
                          >
                            {statuses.find((a) => a.id === row.isBanned).status}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <BtnEditStatusModalUser
                          statuses={statuses}
                          id={row.id}
                          statusId={row.isBanned}
                          email={row.email}
                          changeStatus={(id) => {
                            setRows((prevRows) => {
                              const updatedRows = prevRows.map(
                                (row, rowIndex) => {
                                  if (rowIndex === index) {
                                    return { ...row, isBanned: id };
                                  }
                                  return row;
                                }
                              );

                              return updatedRows;
                            });
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
                {Array.from(Array(emptyRowCount)).map((_, index) => (
                    <TableRow key={`empty-${index}`} className="max-row-size empty-row">
                            <TableCell colSpan={columns.length}> 
                            
                            </TableCell>
                        </TableRow>
                    ))} 
              </TableBody>
            </Table>
          </TableContainer>
          <div className={`d-flex justify-content-end align-items-center`}>
            <PaginationComponent
              setContent={(a) => setRows(a)}
              getContent={async (page) => {
                const newUrl = `/admin/userList/${page}`;
                window.history.pushState({}, "", newUrl);
                let res = await getAllUsers(page);
                if (res.status === Success) {
                  return res.data.data;
                }
              }}
              allowAppend={false}
              page={page}
              setPage={setPage}
              countOfPages={countOfPages}
            />
          </div>
        </Paper>
      </div>
    </div>
  );
};
