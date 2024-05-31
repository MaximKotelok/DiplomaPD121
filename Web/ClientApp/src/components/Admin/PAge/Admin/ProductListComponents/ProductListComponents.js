import React, { useState } from "react";
import styles from "./ProductListComponents.module.css";
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
import BtnEditSeriaModal from "./components/BtnEditSeriaModal/BtnEditSeriaModal";
import {
  deleteProduct,
  getCountOfPagesForProductsAdmin,
  getProductsAdmin,
} from "../../../../../services/product";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  PharmaCompanyPharmacyListPath,
  PharmacyListPath,
  ProductListPath,
} from "../../../../../utils/TablesPathes";

import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ModalTostarStatusModal from "../../../Common/ModalTostarStatus/ModalTostarStatusModal";

import categoryEmpty from "../../../../../assets/images/category/category-empty-img.png"
import defaultImage from "../../../../../assets/images/product-card/defaultImg.png"

const columns = [
  { id: "position", label: "Позиція", minWidth: 230 },
  {
    id: "shortDescreiption",
    label: "Короткий опис",
    minWidth: 280,
    editable: true,
  },
  { id: "brend", label: "Бренд", minWidth: 230 },

  {
    id: "manafacture",
    label: "Виробник",
    minWidth: 230,
    editable: true,
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Дії",
    minWidth: 180,
    editable: true,
    // format: (value) => value.toLocaleString("en-US"),
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

export const ProductListComponents = () => {
  const classes = useStyles();

  const { paramPage } = useParams();
  const [countOfPages, setCountOfPages] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [rows, setRows] = React.useState([]);

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
  useEffect(() => {
    reload(paramPage?parseInt(paramPage):1);
  }, []);

  async function reload(page, searchText) {
    setPage(page);
    let queryPage = page;
    let resCountOfPages = await getCountOfPagesForProductsAdmin(
      searchText ? searchText : search
    );

    if(resCountOfPages.status === Success && resCountOfPages.data < queryPage){
      queryPage = resCountOfPages.data;
      setPage(resCountOfPages.data);
    }else if(resCountOfPages.status === Success && 1 > queryPage){
      queryPage = 1;
      setPage(1);
    }

    let res = await getProductsAdmin(queryPage, searchText ? searchText : search);

    if (res.status === Success && resCountOfPages.status === Success) {
      setCountOfPages(resCountOfPages.data);
      setRows(res.data);
    }
  }

  // const [authProduct, setAuthProduct] = React.useState(true);
  // const [anchorElProduct, setAnchorElProduct] = React.useState(null);
  // const openProduct = Boolean(anchorElProduct);

  // const handleChangeProduct = (event) => {
  //   setAuthProduct(event.target.checked);
  // };

  // const handleMenuProduct = (event) => {
  //   setAnchorElProduct(event.currentTarget);
  // };

  // const handleCloseProduct = () => {
  //   setAnchorElProduct(null);
  // };

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setActiveIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveIndex(null);
  };

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
      <ModalTostarStatusModal
        show={show}
        text={textMessage}
        id={statusId}
        onClose={() => setShow(false)}
      />
      <div className={`${styles["box-container"]} row`}>
        <div className="col-6">
          <SearchComponent
            callback={async (text) => {
              setSearch(text);
              await reload(1, text);
            }}
          />
        </div>

        {/* <CheckedBox text="Показувати лише фарма-компанії?" /> */}

        <div className="col-6 d-flex align-items-center justify-content-end ">
          <Link
            to="/admin/AddProduct"
            className={`btn btn-primary ${styles["add-button"]}`}
          >
            Додати
          </Link>
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
                {rows.map((category, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell
                        colSpan={12}
                        className={`${styles["header-body-pharmacy"]}`}
                      >
                        <CustomImgComponent
                          className={`${styles["img-category"]} ms-3`}
                          src={`${ApiPath}${category.categoryPathToPhoto}`}
                          defaultSrc={categoryEmpty}
                        />{" "}
                        {category.categoryTitle}
                      </TableCell>
                    </TableRow>

                    {category.data.map((item, itemIndex) => {
                      return (
                        <TableRow
                          className={`${styles["tb-product"]}`}
                          key={itemIndex}
                        >
                          <TableCell>
                            <div
                              className={`d-flex align-items-center ${styles["text-row-table"]}`}
                            >
                              <CustomImgComponent
                                className={`${styles["img-product"]} `}
                                src={`${ApiPath}${item.pathToPhoto}`}
                                defaultSrc={defaultImage}
                              />{" "}
                              <div>{item.title}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`${styles["text-row-table"]}`}>
                              {item.shortDescription}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`${styles["text-row-table"]}`}>
                              {item.brand}

                              {item.id}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`${styles["text-row-table"]}`}>
                              {item.manufacturer}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="d-flex justify-content-end pe-3">
                              <div>
                                <IconButton
                                  aria-label="account of current user"
                                  aria-controls="menu-appbar"
                                  aria-haspopup="true"
                                  onClick={(event) =>
                                    handleMenuOpen(event, item.id)
                                  }
                                  color="inherit"
                                >
                                  {/* <MoreVertIcon /> */}
                                  <MoreVertIcon
                                    style={{ color: "rgba(122, 122, 122, 1)" }}
                                  />
                                </IconButton>
                                <Menu
                                  id="menu-appbar"
                                  anchorEl={anchorEl}
                                  anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                  }}
                                  keepMounted
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                  }}
                                  open={
                                    Boolean(anchorEl) && activeIndex === item.id
                                  }
                                  onClose={handleMenuClose}
                                >
                                  <MenuItem onClick={handleMenuClose}>
                                    <Link
                                      className="btn btn-primary w-100"
                                      to={`/admin/updateProduct/${item.id}`}
                                    >
                                      Оновити
                                    </Link>
                                  </MenuItem>
                                  <MenuItem onClick={handleMenuClose}>
                                    <button
                                      className="btn btn-danger w-100"
                                      onClick={async () => {
                                        let res = await deleteProduct(item.id);
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
                                  </MenuItem>
                                </Menu>
                              </div>
                            </div>

                            {/* <div className="d-flex  align-items-center justify-content-end">
                              <Link
                                className={`btn btn-primary ${styles["my-btn-edit"]} me-1`}
                                to={`/admin/updateProduct/${item.id}`}
                              >
                                Оновити
                              </Link>
                              <button
                                className={`btn btn-danger ${styles["my-btn-delete"]}`}
                                onClick={async () => {
                                  let res = await deleteProduct(item.id);
                                  if (res.status === Success) {
                                    //toast.success("Успіх!");
                                    window.location.reload();
                                  } else {
                                    toast.error("Помилка");
                                  }
                                }}
                              >
                                Видалити
                              </button>
                            </div> */}
                          </TableCell>
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

                {Array.from(Array(emptyRowCount)).map((_, index) => (
                  <TableRow
                    key={`empty-${index}`}
                    className={`${styles["tb-product"]} empty-row`}
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
                let res = await getProductsAdmin(page, search);

                const newUrl = `/admin/${ProductListPath}/${page}`;
                window.history.pushState({}, "", newUrl);
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
