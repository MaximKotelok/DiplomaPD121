import React, { useState } from "react";
import styles from "./ManufactureListComponents.module.css";
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
// import BtnEditBrandModal from "./components/BtnEditStatusModal/BtnEditStatusModal/BtnEditBrandModal";
import {
    getAllManufacturerForAdmin,
    deleteManufacturer,
} from "../../../../../services/manufacture";
import {
    BrowserRouter as Router,
    Route,
    Link,
    useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import ModalTostarStatusModal from "../../../Common/ModalTostarStatus/ModalTostarStatusModal";

const columns = [
    { id: "name", last: false, label: "Виробник", width: 1100 },
    { id: "country", last: false, label: "Країна, Місто", width: 500 },
    { id: "Address", last: false, label: "Адреса", width: 400 },
    { id: "Site", last: false, label: "Сайт", width: 400 },
    { id: "buttonEdit", last: true, label: "", width: 340 },
];

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        // maxHeight: 400,
    },
});

export const ManufactureListComponents = () => {
    const classes = useStyles();
    const { paramPage } = useParams();
    const [page, setPage] = React.useState(paramPage);
    const [countOfPages, setCountOfPages] = React.useState(1);
    const [rows, setRows] = React.useState([]);
    const [emptyRowCount, setEmptyRowCount] = React.useState(0);

    const [show, setShow] = useState(false);
    const [statusId, setStatusId] = useState(1);
    const [textMessage, setTextMessage] = useState("Помилка!!!");

    const handleShowModal = (id, textMessageFunc) => {
        setTextMessage(textMessageFunc);
        setStatusId(id);
        setShow(false); // Reset to false first
        setTimeout(() => {
            setShow(true);
        }, 0); // Use a timeout to ensure the state change is registered
    };

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
        let res = await getAllManufacturerForAdmin(page);
        if (res.status === Success) {
            let page = paramPage ? paramPage : 1;
            if (page > res.data.countOfPages) {
                res = await getAllManufacturerForAdmin(res.data.countOfPages);
                page = res.data.countOfPages;
            } else if (page < 1) {
                res = await getAllManufacturerForAdmin(1);
                page = 1;
            }
            setPage(parseInt(page));
            setRows(res.data.data);
            setCountOfPages(res.data.countOfPages);
        }
    }

    return (
        <div className={`${styles["row-parent"]}`}>
            <ModalTostarStatusModal
                show={show}
                text={textMessage}
                id={statusId}
                onClose={() => setShow(false)}
            />
            <div className={`${styles["box-container"]} `}>
                <div className="row">
                    <div className="col-6">
                        <SearchComponent
                            callback={async (text) => {
                                let page = 1;
                                setPage(1);
                                const res = await getAllManufacturerForAdmin(page, text);
                                if (res.status === Success) {
                                    setRows(res.data.data);
                                    setCountOfPages(res.data.countOfPages);
                                }
                            }}
                        />
                    </div>

                    <div className="col-6 d-flex align-items-center justify-content-end ">
                        <Link
                            to="/admin/AddManufacturer"
                            className={`btn btn-primary ${styles["add-button"]}`}
                            state={{ pathToManufacturerTable: window.location.pathname }}
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
                {rows.map((manufacturer, index) => (
                  <React.Fragment key={index}>
                    <TableRow className="max-row-size">
                      <TableCell
                        className={`${styles["header-body-pharmacy"]}`}
                      >
                        <span className={` ${styles["text-span-table"]}`}>
                          {manufacturer.name}
                        </span>
                      </TableCell>
                      <TableCell
                        className={`${styles["header-body-pharmacy"]}`}
                      >
                        <span className={` ${styles["text-span-table"]}`}>
                          {manufacturer.countryManufacture.name}
                        </span>
                      </TableCell>
                      <TableCell
                        className={`${styles["header-body-pharmacy"]}`}
                      >
                        <span className={` ${styles["text-span-table"]}`}>
                          {manufacturer.address}
                        </span>
                      </TableCell>
                      <TableCell
                        className={`${styles["header-body-pharmacy"]}`}
                      >
                        <span className={` ${styles["text-span-table"]}`}>
                          {manufacturer.urlSite}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="d-flex  align-items-center justify-content-between">
                          <Link
                            className={`btn btn-primary ${styles["my-btn-edit"]} me-2`}
                            to={`/admin/UpdateManufacturer/${manufacturer.id}`}
                                        state={{ pathToManufacturerTable: window.location.pathname }}
                                    >
                            Оновити
                          </Link>
                          <button
                            className={`btn btn-danger ${styles["my-btn-delete"]}`}
                            onClick={async () => {
                              let res = await deleteManufacturer(
                                manufacturer.id
                              );
                              if (res.status === Success) {
                                //toast.success("Успіх!");
                                handleShowModal(1, "Успіх!");
                                window.location.reload();
                              } else {
                                handleShowModal(2, "Помилка!");
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
                  <TableRow key={`empty-${index}`} className="max-row-size">
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
                const newUrl = `/admin/manufactureList/${page}`;
                window.history.pushState({}, "", newUrl);
                let res = await getAllManufacturerForAdmin(page);
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
