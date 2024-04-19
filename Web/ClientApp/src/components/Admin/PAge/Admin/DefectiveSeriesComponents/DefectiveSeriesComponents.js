import React from "react";
import styles from "./DefectiveSeriesComponents.module.css";
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
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
import BtnEditSeriaModal from "./components/BtnEditSeriaModal/BtnEditSeriaModal";

const columns = [
  { id: "position", label: "Серія", minWidth: 230 },
  { id: "brend", label: "Дата заборони", minWidth: 230 },

  {
    id: "manafacture",
    label: "Вирішення",
    minWidth: 230,
    editable: true,
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "shortDescreiption",
    label: "Причина",
    minWidth: 280,
    editable: true,
  },
];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

const rows = [
  {
    nameCategory: "Для тварин: Собаки",
    data: [
      {
        position: "тарілка",
        brend: "крутий бренд",
        seria: "SD354GR",
        artukul: "0239532",
      },
    ],
  },
  {
    nameCategory: "Вітаміни: вітамін B",

    data: [
      {
        position: "тарілка",
        brend: "крутий бренд",
        seria: "SD354GR",
        artukul: "0239532",
      },
      {
        position: "тарілка",
        brend: "крутий бренд",
        seria: "SD354GR",
        artukul: "0239532",
      },
      {
        position: "тарілка",
        brend: "крутий бренд",
        seria: "SD354GR",
        artukul: "0239532",
      },
    ],
  },
  {
    nameCategory: "Для тварин: Коти",

    data: [
      {
        position: "тарілка",
        brend: "крутий бренд",
        seria: "SD354GR",
        artukul: "0239532",
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

export const DefectiveSeriesComponents = () => {
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
      <div className={`${styles["box-container"]}  `}>
        <div className="row">
          <div className="col-6">
            <SearchComponent />
          </div>

          <div
            className={`col-6 d-flex align-items-center justify-content-end `}
          >
            <BtnEditSeriaModal />
            {/* <div className="d-flex align-items-center"> */}

            {/* <CheckedBox text="Показувати лише фарма-компанії?" /> */}
          </div>
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
                    {pharmacy.data.map((item, itemIndex) => {
                      return (
                        <TableRow
                          className={`${styles["tb-pharmacy"]}`}
                          key={itemIndex}
                        >
                          <TableCell>
                            <span className={`${styles["text-row-table"]}`}>
                              {item.position}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`${styles["text-row-table"]}`}>
                              {item.brend}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`${styles["text-row-table"]}`}>
                              {item.seria}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`${styles["text-row-table"]}`}>
                              {item.artukul}
                            </span>
                          </TableCell>
                          {/* <TableCell> */}
                          {/* <div className="d-flex align-items-center"> */}
                          {/* <BtnEditSeriaModal /> */}
                          {/* </div> */}
                          {/* </TableCell> */}
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
