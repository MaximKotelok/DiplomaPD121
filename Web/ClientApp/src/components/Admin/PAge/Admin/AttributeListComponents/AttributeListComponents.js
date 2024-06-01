import React, { useEffect, useState } from "react";
import styles from "./AttributeListComponents.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
import SearchComponent from "../../../../Common/SearchComponent/SearchComponent";
import { Link, useParams } from "react-router-dom";
import {
  ApiPath,
  STANDART_IMG,
  Success,
  itemsPerPageForAdmin,
} from "../../../../../utils/Constants";
import {
  getAllAttributesForAdmin,
  deleteAttribute,
} from "../../../../../services/attributes";
import PaginationComponent from "../../../../Common/PaginationComponent/PaginationComponent";
import { toast } from "react-toastify";

const columns = [
  { id: "name", last: false, label: "Назва", width: 1100 },
  { id: "index", last: false, label: "Індекс", width: 3200 },
  { id: "buttonEdit", last: true, label: "", width: 20 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    // maxHeight: 400,
  },
});

export const AttributeListComponents = () => {
  const classes = useStyles();
  const { paramPage } = useParams();
  const [page, setPage] = React.useState(paramPage);
  const [countOfPages, setCountOfPages] = React.useState(1);
  const [rows, setRows] = React.useState([]);
  const [emptyRowCount, setEmptyRowCount] = React.useState(0);


  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    if (itemsPerPageForAdmin > rows.length) {
      setEmptyRowCount(itemsPerPageForAdmin - rows.length);
    } else {
      setEmptyRowCount(0);
    }
  }, [rows]);

  async function init() {
    let res = await getAllAttributesForAdmin(page);
    if (res.status === Success) {
      let page = paramPage ? paramPage : 1;
      if (page > res.data.countOfPages) {
        res = await getAllAttributesForAdmin(res.data.countOfPages);
        page = res.data.countOfPages;
      } else if (page < 1) {
        res = await getAllAttributesForAdmin(1);
        page = 1;
      }
      setPage(parseInt(page));
      setRows(res.data.data);
      setCountOfPages(res.data.countOfPages);
    }
  }

  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} `}>
        <div className="row">
          <div className="col-6">
            <SearchComponent
              callback={async (text) => {
                let page = 1;
                setPage(1);
                const res = await getAllAttributesForAdmin(page, text);
                if (res.status === Success) {
                  setRows(res.data.data);
                  setCountOfPages(res.data.countOfPages);
                }
              }}
            />
          </div>

          <div className="col-6 d-flex  align-items-center justify-content-end">
            <Link to={"/admin/addAttribute"}
                state={{ pathToAttributeTable: window.location.pathname }}
                className={`${styles["btn-add"]}`}>
              Додати
            </Link>
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
                        width: column.width,
                        borderBottom: "none",
                      }}
                    >
                      <h6
                        className={` ${
                          column.last ? "" : styles["head-table"]
                        }`}
                      >
                        {column.label}
                      </h6>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((attibute, index) => (
                  <React.Fragment key={index}>
                    <TableRow className="max-row-size">
                      <TableCell>
                        {" "}
                        <span className={`${styles["text-table"]}`}>
                          {attibute.name}
                        </span>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <span className={`${styles["text-table"]}`}>
                          {attibute.index}
                        </span>
                      </TableCell>
                      <TableCell className="d-flex align-items-center justify-content-end">
                        <Link
                          to={`/admin/updateAttribute/${attibute.id}`}
                          state={{ pathToAttributeTable: window.location.pathname }}
                          className={`${styles["my-btn-edit"]} me-4`}
                        >
                          Оновити
                        </Link>
                        <button
                          className={`btn btn-danger ${styles["my-btn-delete"]}`}
                          onClick={async () => {
                            let res = await deleteAttribute(attibute.id);
                            if (res.status === Success) {
                              toast.success(1, "Успіх!");

                              window.location.reload();
                            } else {
                              toast.error(2, "Помилка!");
                            }
                          }}
                        >
                          Видалити
                        </button>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
                {Array.from(Array(emptyRowCount)).map((_, index) => (
                    <TableRow key={`empty-${index}`} className="max-row-size empty-row">
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
                const newUrl = `/admin/attributeList/${page}`;
                window.history.pushState({}, "", newUrl);
                let res = await getAllAttributesForAdmin(page);
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
