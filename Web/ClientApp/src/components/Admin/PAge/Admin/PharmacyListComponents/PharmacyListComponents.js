import React from "react";
import styles from "./PharmacyListComponents.module.css";
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
import { useEffect } from "react";
import { getAllProductConfirm } from "../../../../../services/productConfirm";
import { ApiPath, STANDART_IMG, Success } from "../../../../../utils/Constants";
import CustomImgComponent from "../../../../Common/CustomImgComponent/CustomImgComponent";
import { getAllStatuses } from "../../../../../services/productStatus";
import PaginationComponent from "../../../../Common/PaginationComponent/PaginationComponent";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";

const columns = [
  { id: "pharmacy", label: "Аптека", minWidth: 170 },
  { id: "address", label: "Адреса", minWidth: 170 },
  {
    id: "timeWorking",
    label: "Графік роботи",
    minWidth: 170,
    editable: true,
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "userEmail",
    label: "Користувач",
    minWidth: 120,
    editable: true,
    // format: (value) => value.toLocaleString("en-US"),
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
        pharmacyName: "№ 376",
        timeWorking: "09:00 - 21:00",
        addressPharmacy: "Львів. Вул . Городоцька 75",
        userEmail: "podoroznik376@gmail.com",
      },
    ],
  },
  {
    name: "Аптека 2",
    data: [
      {
        pharmacyName: "№ 376",
        timeWorking: "09:00 - 21:00",
        addressPharmacy: "Львів. Вул . Городоцька 75",
        userEmail: "podoroznik376@gmail.com",
      },
      {
        pharmacyName: "№ 376",
        timeWorking: "09:00 - 21:00",
        addressPharmacy: "Львів. Вул . Городоцька 75",
        userEmail: "podoroznik376@gmail.com",
      },
      {
        pharmacyName: "№ 376",
        timeWorking: "09:00 - 21:00",
        addressPharmacy: "Львів. Вул . Городоцька 75",
        userEmail: "podoroznik376@gmail.com",
      },
    ],
  },
  {
    name: "Аптека 3",
    data: [
      {
        pharmacyName: "№ 376",
        timeWorking: "09:00 - 21:00",
        addressPharmacy: "Львів. Вул . Городоцька 75",
        userEmail: "podoroznik376@gmail.com",
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

export const PharmacyListComponents = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [countOfPages, setCountOfPages] = React.useState(1);
  //const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [rows, setRows] = React.useState([]);
  const [statuses, setStatuses] = React.useState([]);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // useEffect(()=>{
  //   init();
  // },[]);

  // async function init(){
  //   const res = await getAllProductConfirm(page);
  //   const statusesRes = await getAllStatuses();
  //   if(res.status === Success && statusesRes.status === Success){
  //     //console.log(res);
  //     setStatuses(statusesRes.data);
  //     setRows(res.data.data);
  //     setCountOfPages(res.data.countOfPages)
  //     console.log(res)
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
                    <TableRow>
                      <TableCell
                        colSpan={12}
                        className={`${styles["header-body-pharmacy"]}`}
                      >
                        <CustomImgComponent
                          className={`${styles["img-product"]}`}
                          // src={`${ApiPath}${item.pathToPhoto}`}
                        />{" "}
                        {pharmacy.name}
                      </TableCell>
                    </TableRow>

                    {pharmacy.data.map((item, itemIndex) => {
                      return (
                        <TableRow
                          className={`${styles["tb-pharmacy"]}`}
                          key={itemIndex}
                        >
                          <TableCell>{item.pharmacyName}</TableCell>
                          <TableCell>{item.addressPharmacy}</TableCell>
                          <TableCell>{item.timeWorking}</TableCell>
                          <TableCell>{item.userEmail}</TableCell>
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
                ))}

                {/* {rows.map((pharmacy, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell
                        colSpan={12}
                        className={`${styles["header-body-pharmacy"]}`}
                      >
                        {pharmacy.name}
                      </TableCell>
                    </TableRow>

                    {pharmacy.data.map((item, itemIndex) => {
                      return (
                      <TableRow
                        className={`${styles["tb-pharmacy"]}`}
                        key={itemIndex}
                      >
                        <TableCell>
                          <CustomImgComponent
                          className={`${styles["img-product"]}`}
                          src={`${ApiPath}${item.pathToPhoto}`}/>
                          {" "}
                          {item.title}
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.manufacturer}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          <div
                            className={`d-flex justify-content-between align-items-center`}
                          >
                            <div
                              className={`
                            ${styles["span-status-rozmir"]}
                            `}
                            style={{backgroundColor: item.statusColor}}                            
                            >
                              {item.status}
                            </div>
                            <BtnEditStatusModal id={item.id} statusId={item.statusId} statuses={statuses} changeStatusProduct={(c)=>{
                              setRows((prevRows) => {
                                const updatedRows = prevRows.map((row, rowIndex) => {
                                  if (rowIndex === index) {
                                    const updatedData = row.data.map((rowData) => {
                                      if (rowData.id === item.id) {
                                        return {
                                          ...rowData,
                                          statusId: c.id,
                                          status: c.status,
                                          statusColor: c.color
                                        };
                                      }
                                      return rowData;
                                    });
                                    return {
                                      ...row,
                                      data: updatedData
                                    };
                                  }
                                  return row;
                                });
                                return updatedRows;
                              });
                              
                            }}/>
                          </div>
                        </TableCell>
                      </TableRow>
                    )})}
                  </React.Fragment>
                ))} */}
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
