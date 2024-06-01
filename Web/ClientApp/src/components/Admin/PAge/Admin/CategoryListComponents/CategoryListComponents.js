import React, { useState } from "react";
import styles from "./CategoryListComponents.module.css";
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
import {
  ApiPath,
  STANDART_IMG,
  Success,
  itemsPerPageForAdmin,
} from "../../../../../utils/Constants";
import CustomImgComponent from "../../../../Common/CustomImgComponent/CustomImgComponent";
import { getAllStatuses } from "../../../../../services/productStatus";
import PaginationComponent from "../../../../Common/PaginationComponent/PaginationComponent";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
// import BtnEditBrandModal from "./components/BtnEditStatusModal/BtnEditStatusModal/BtnEditBrandModal";
import {
  getAllCategoriesForAdmin,
  deleteCategory,
  getCountOfPagesAllCategoriesForAdmin,
} from "../../../../../services/category";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import ModalTostarStatusModal from "../../../Common/ModalTostarStatus/ModalTostarStatusModal";

import categoryEmpty from "../../../../../assets/images/category/category-empty-img.png"

const columns = [
  { id: "name", last: false, label: "Категорія", width: 1100 },
  { id: "recomended", last: false, label: "Рекомендована", width: 1200 },
  { id: "buttonEdit", last: true, label: "", width: 1400 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    // maxHeight: 400,
  },
});

export const CategoryListComponents = () => {
  const classes = useStyles();
  const { paramPage } = useParams();
  const [page, setPage] = React.useState(paramPage);
  const [countOfPages, setCountOfPages] = React.useState(1);
  const [rows, setRows] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const [emptyRowCount, setEmptyRowCount] = React.useState(0);
  useEffect(() => {
    if (itemsPerPageForAdmin > rows.length) {
      setEmptyRowCount(itemsPerPageForAdmin - rows.length);
    } else {
      setEmptyRowCount(0);
    }
  }, [rows]);
  useEffect(() => {
    if (paramPage) refresh(parseInt(paramPage));
    else refresh(1);
  }, []);

  async function refresh(page, searchText) {
    setPage(page);
    let queryPage = page;
    let resCount = await getCountOfPagesAllCategoriesForAdmin(
      searchText == "" || search ? searchText : search
    );

    if(resCount.status === Success && resCount.data<queryPage) {
      queryPage = resCount.data;
      setPage(resCount.data);
    }else if(resCount.status === Success && queryPage<1){
      queryPage = 1;
      setPage(1);
      
    }

    
    let res = await getAllCategoriesForAdmin(
      searchText == "" || search ? searchText : search,
      queryPage
    );
    if (res.status === Success && resCount.status === Success) {
      setCountOfPages(resCount.data);
      setRows(res.data);
    }
  }

  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} `}>
        <div className="row">
          <div className="col-6">
            <SearchComponent
              callback={async (text) => {
                setSearch(text);
                await refresh(1, text);
              }}
            />
          </div>

          <div className="col-6 d-flex align-items-center justify-content-end ">
            <Link
              to="/admin/addCategory"
              className={`btn btn-primary ${styles["add-button"]}`}
              state={{ pathToCategoryTable: window.location.pathname }}
            >
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
                {rows.map((category, index) => (
                  <React.Fragment key={index}>
                    <TableRow className={`${styles["tb-category"]}`}>
                      <TableCell
                        className={`${styles["header-body-pharmacy"]}`}
                      >
                        <CustomImgComponent
                          className={`${styles["img-product"]}`}
                          src={`${ApiPath}${category.pathToPhoto}`}
                          defaultSrc={categoryEmpty}
                        />{" "}
                        <span className={` ${styles["text-span-table"]}`}>
                          {category.title}
                        </span>
                      </TableCell>
                      <TableCell
                        className={`${styles["header-body-pharmacy"]}`}
                      >
                        {category.isRecomended && (
                          <span className={styles["div-statuc-category"]}>
                            Рекоендована
                          </span>
                        )}
                      </TableCell>

                      <TableCell>
                        <div className="d-flex  align-items-center justify-content-end">
                          <Link
                            className={`btn btn-primary ${styles["my-btn-edit"]} me-4`}
                            to={`/admin/updateCategory/${category.id}`}
                            state={{ pathToCategoryTable: window.location.pathname }}
                            >
                            Оновити
                          </Link>
                          <button
                            className={`btn btn-danger ${styles["my-btn-delete"]}`}
                            onClick={async () => {
                              let res = await deleteCategory(category.id);
                              if (res.status === Success) {
                                //toast.success("Успіх!");
                                toast.success("Успіх!");

                                window.location.reload();
                              } else {
                                toast.error("Помилка!");
                              }
                            }}
                          >
                            Видалити
                          </button>
                        </div>
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
                const newUrl = `/admin/categoryList/${page}`;
                window.history.pushState({}, "", newUrl);
                let res = await getAllCategoriesForAdmin(search, page);
                if (res.status === Success) {
                  return res.data;
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
