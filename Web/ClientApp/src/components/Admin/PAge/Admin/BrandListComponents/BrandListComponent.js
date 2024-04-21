import React from "react";
import styles from "./BrandListComponents.module.css";
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
import { ApiPath, STANDART_IMG, Success } from "../../../../../utils/Constants";
import CustomImgComponent from "../../../../Common/CustomImgComponent/CustomImgComponent";
import { getAllStatuses } from "../../../../../services/productStatus";
import PaginationComponent from "../../../../Common/PaginationComponent/PaginationComponent";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
import BtnEditBrandModal from "./components/BtnEditStatusModal/BtnEditStatusModal/BtnEditBrandModal";
import { getAllBrandForAdmin, deleteBrand } from "../../../../../services/brand";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";

const columns = [
  { id: "name", last: false, label: "Бренд", width: 1100 },
  { id: "country", last: false, label: "Країна", width: 1200 },
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

export const BrandListComponent = () => {
  const classes = useStyles();
  const { paramPage } = useParams();
  const [page, setPage] = React.useState(paramPage);
  const [countOfPages, setCountOfPages] = React.useState(1);
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    let res = await getAllBrandForAdmin(page);
    if (res.status === Success) {
      let page = paramPage ? paramPage : 1;
      if (page > res.data.countOfPages) {
        res = await getAllBrandForAdmin(res.data.countOfPages);
        page = res.data.countOfPages;
      } else if (page < 1) {
        res = await getAllBrandForAdmin(1);
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
                const res = await getAllBrandForAdmin(page, text);
                if (res.status === Success) {
                  //console.log(res);
                  setRows(res.data.data);
                  setCountOfPages(res.data.countOfPages);
                }
              }}
            />
          </div>

          <div className="col-6 d-flex align-items-center justify-content-end ">
            <Link
              to="/admin/addBrand"
              className={`btn btn-primary ${styles["add-button"]}`}
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
                {rows.map((brand, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell
                        className={`${styles["header-body-pharmacy"]}`}
                      >
                        <CustomImgComponent
                          className={`${styles["img-product"]}`}
                          src={`${ApiPath}${brand.pathToPhoto}`}
                        />{" "}
                        <span className={` ${styles["text-span-table"]}`}>
                          {brand.name}
                        </span>
                      </TableCell>
                      <TableCell
                        className={`${styles["header-body-pharmacy"]}`}
                      >
                        <span className={` ${styles["text-span-table"]}`}>
                          {brand.countryBrand.name}
                        </span>
                      </TableCell>

                      <TableCell>
                        <div className="d-flex  align-items-center justify-content-end">
                          <Link
                            className={`btn btn-primary ${styles["my-btn-edit"]} me-4`}
                            to={`/admin/UpdateBrand/${brand.id}`}
                          >
                            Оновити
                          </Link>
                          <button
                            className={`btn btn-danger ${styles["my-btn-delete"]}`}
                             onClick={async () => {
                               let res = await deleteBrand(brand.id);
                               if (res.status === Success) {
                                 window.location.reload();
                               } else {
                                 toast.error("Помилка");
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
              </TableBody>
            </Table>
          </TableContainer>
          <div className={`d-flex justify-content-end align-items-center`}>
            <PaginationComponent
              setContent={(a) => setRows(a)}
              getContent={async (page) => {
                const newUrl = `/admin/brandList/${page}`;
                window.history.pushState({}, "", newUrl);
                let res = await getAllBrandForAdmin(page);
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
