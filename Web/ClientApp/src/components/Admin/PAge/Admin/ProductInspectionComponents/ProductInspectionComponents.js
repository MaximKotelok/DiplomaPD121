import React from "react";
import styles from "./ProductInspectionComponents.module.css";
import "./ProductInspectionComponents.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
// import BtnEditStatusModal from "./components/BtnEditStatusModal/BtnEditStatusModal";
import SearchComponent from "../../../../Common/SearchComponent/SearchComponent";
import { useEffect } from "react";
import { getAllProductConfirm } from "../../../../../services/productConfirm";
import { ApiPath, STANDART_IMG, Success, itemsPerPageForAdmin } from "../../../../../utils/Constants";
import CustomImgComponent from "../../../../Common/CustomImgComponent/CustomImgComponent";
import { getAllStatuses } from "../../../../../services/productStatus";
import PaginationComponent from "../../../../Common/PaginationComponent/PaginationComponent";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import defaultImage from "../../../../../assets/images/product-card/defaultImg.png"

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
    id: "date",
    label: "Дата заявки",
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

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    // maxHeight: 400,
  },
});

export const ProductInspectionComponents = () => {
  const { paramPage } = useParams();
  const classes = useStyles();
  const [page, setPage] = React.useState(paramPage ? parseInt(paramPage) : 1);
  const [countOfPages, setCountOfPages] = React.useState(1);
  //const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [statuses, setStatuses] = React.useState([]);
  const [emptyRowCount, setEmptyRowCount] = React.useState(0);

  useEffect(() => {
    let tmpRows = rows.flatMap((a) => {
      if (a.data && a.data.length > 0) {
        return [null, ...a.data];
      } else {
        return [null];
      }
    });
    if (itemsPerPageForAdmin > tmpRows.length) {
      setEmptyRowCount(itemsPerPageForAdmin - tmpRows.length);
    } else {
      setEmptyRowCount(0);
    }
  }, [rows]);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    init();
  }, []);

  async function init() {
    let res = await getAllProductConfirm(page);
    const statusesRes = await getAllStatuses();
    if (res.status === Success && statusesRes.status === Success) {
      //console.log(res);
      let page = paramPage ? parseInt(paramPage) : 1;
      console.log(page);
      console.log(res.data.countOfPages);
      if (page > res.data.countOfPages) {
        res = await getAllProductConfirm(res.data.countOfPages);
        page = res.data.countOfPages;
      } else if (page < 1) {
        res = await getAllProductConfirm(1);
        page = 1;
      }
      setPage(page);
      setStatuses(statusesRes.data);
      setRows(res.data.data);
      setCountOfPages(res.data.countOfPages);
    }
  }

  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} `}>
        <div className="col-6">
          <SearchComponent
            callback={async (text) => {
              let page = 1;
              setPage(1);
              const res = await getAllProductConfirm(page, text);
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
              {rows.map((pharmacy, index) => (
                  <React.Fragment>
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
                            {/* <Link to={`/admin/detailProduct/${item.id}`}> */}
                              <CustomImgComponent
                                className={`${styles["img-product"]}`}
                                src={`${ApiPath}${item.pathToPhoto}`}
                                defaultSrc={defaultImage}
                              />{" "}
                              {item.title}
                            {/* </Link> */}
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
                                style={{ backgroundColor: item.statusColor }}
                              >
                                {item.status}
                              </div>
                            
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
                ))}
                {Array.from(Array(emptyRowCount)).map((_, index) => (
                  <TableRow
                        key={`empty-${index}`} className="max-row-size empty-row"
                  >
                    <TableCell colSpan={columns.length}></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={`d-flex justify-content-end align-items-center`}>
            <PaginationComponent
              setContent={(a) => setRows(a)}
              getContent={async (page) => {
                let res = await getAllProductConfirm(page);
                const newUrl = `/admin/zayavkaList/${page}`;
                window.history.pushState({}, "", newUrl);
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
