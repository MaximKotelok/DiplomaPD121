import React, { useState } from "react";
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
import BtnEditPharmacyModal from "./components/BtnEditStatusModal/BtnPharmacyModal";
import {
  getPharmaciesForAdmin,
  getCountOfPagesPharmaciesForAdmin,
  deletePharmacy,
  getPharmacyById,
} from "../../../../../services/pharmacy";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
} from "react-router-dom";
// import BtnModalPharmaCompanyModal from "./components/BtnModalPharmaCompanyModal/BtnModalPharmaCompanyModal";

import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { deletePharmaCompany } from "../../../../../services/pharmaCompany";
import { toast } from "react-toastify";

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
  const { paramPage } = useParams();
  const [page, setPage] = React.useState(paramPage);
  const [countOfPages, setCountOfPages] = React.useState(1);
  const [rows, setRows] = React.useState([]);
  const [isDisplayOnlyCompanies, setIsDisplayOnlyCompanies] =
    React.useState(false);
  const [search, setSearch] = React.useState("");
  const [emptyRowCount, setEmptyRowCount] = React.useState(0);

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeIndexPharmaCompany, setActiveIndexPharmaCompany] =
    useState(null);

  const handleMenuOpenPharmaCompany = (event, index) => {
    setAnchorEl(event.currentTarget);
    setActiveIndexPharmaCompany(index);
  };

  const handleMenuClosePharmaCompany = () => {
    setAnchorEl(null);
    setActiveIndexPharmaCompany(null);
  };

  const [anchorEl2, setAnchorEl2] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMenuOpen = (event, index) => {
    setAnchorEl2(event.currentTarget);
    setActiveIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl2(null);
    setActiveIndex(null);
  };

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
    reload(parseInt(paramPage ? paramPage : 1), search, isDisplayOnlyCompanies);
  }, []);

  async function reload(page, searchText, isDisplayOnlyCompanies) {
    setPage(page);
    let res = await getPharmaciesForAdmin(
      page,
      searchText,
      isDisplayOnlyCompanies
    );
    let resCountOfPages = await getCountOfPagesPharmaciesForAdmin(
      searchText,
      isDisplayOnlyCompanies
    );
    if (res.status === Success && resCountOfPages.status === Success) {
      setCountOfPages(resCountOfPages.data);
      if(resCountOfPages.data<page){
        const newUrl = `/admin/pharmacyList/${resCountOfPages.data}`;
        window.location.href = newUrl;
      }
      else if(page<1){
        const newUrl = `/admin/pharmacyList/1`;
        window.location.href = newUrl;
      }
      setRows(res.data);
    }

    
  }

  return (
    <div className={`${styles["row-parent"]}`}>

      <div className={`${styles["box-container"]} `}>
        <div className="row">
          <div className="col-6">
            <SearchComponent
              callback={(text) => {
                setSearch(text);
                reload(1, text, isDisplayOnlyCompanies);
              }}
            />
          </div>

          <div className="col-4">
            <CheckedBox
              text="Показувати лише фарма-компанії?"
              onChange={(value) => {
                setIsDisplayOnlyCompanies(value);
                reload(1, search, value);
              }}
            />
          </div>
          <div className="col-2">
            <Link
              to="/admin/AddPharmaCompany"
              state={{ pathToPharmacyTable: window.location.pathname }}
              className={`btn btn-primary ${styles["add-button"]}`}
            >
              Додати
            </Link>
          </div>
        </div>

        <Paper className={`${classes.root}`}>
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
                    <TableRow className="max-row-size">
                      <TableCell
                        colSpan={3}
                        className={`${styles["header-body-pharmacy"]}`}
                      >
                        <CustomImgComponent
                          className={`${styles["img-product"]}`}
                          src={`${ApiPath}${pharmacy.pathToPhoto}`}
                        />{" "}
                        {pharmacy.name}
                      </TableCell>
                      <TableCell colSpan={1}>
                        {/* <BtnModalPharmaCompanyModal id={pharmacy.id} /> */}
                        <div className="d-flex justify-content-end">
                          <div>
                            <IconButton
                              aria-label="account of current user"
                              aria-controls="menu-appbar"
                              aria-haspopup="true"
                              onClick={(event) =>
                                handleMenuOpenPharmaCompany(event, index)
                              }
                              color="inherit"
                            >
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
                                Boolean(anchorEl) &&
                                activeIndexPharmaCompany === index
                              }
                              onClose={handleMenuClosePharmaCompany}
                            >
                              <MenuItem onClick={handleMenuClosePharmaCompany}>
                                <Link
                                  className="btn btn-primary w-100"
                                  to={`/admin/UpdatePharmaCompany/${pharmacy.id}`}
                                  state={{
                                    pathToPharmacyTable:
                                      window.location.pathname,
                                  }}
                                >
                                  Оновити
                                </Link>
                              </MenuItem>
                              <MenuItem onClick={handleMenuClosePharmaCompany}>
                                <Link
                                  className={`btn btn-warning w-100 ${styles["btn-color"]}`}
                                  to={`/admin/addPharmacy/${pharmacy.id}`}
                                >
                                  Додати аптеку
                                </Link>
                              </MenuItem>

                              <MenuItem onClick={handleMenuClosePharmaCompany}>
                                <button
                                  className="btn btn-danger w-100"
                                  onClick={async () => {
                                    let res = await deletePharmaCompany(
                                      pharmacy.id
                                    );
                                    if (res.status === Success) {
                                      window.location.reload();
                                      toast.success(
                                        "Видалення аптеки пройшло успішно!"
                                      );
                                      window.location.reload();
                                    } else {
                                      toast.error("Виникла помилка!");
                                    }
                                  }}
                                >
                                  Видалити 
                                </button>
                              </MenuItem>
                            </Menu>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    {pharmacy.data.map((item, itemIndex) => {
                      return (
                        <TableRow
                          className={`${styles["tb-pharmacy"]}`}
                          key={itemIndex}
                        >
                          <TableCell>№ {item.pharmacy.id}</TableCell>
                          <TableCell>{item.pharmacy.address}</TableCell>
                          <TableCell>{`${item.pharmacy.openTime} - ${item.pharmacy.closeTime}`}</TableCell>
                          <TableCell>
                            <div className="d-flex align-items-center justify-content-end pe-3">
                              <div className="text-left w-100">

                                {item.pharmacist ? item.pharmacist : "НЕМАЄ"}
                              </div>
                              {/* <BtnEditPharmacyModal id={item.pharmacy.id} /> */}
                              <div>
                                <IconButton
                                  aria-label="account of current user"
                                  aria-controls="menu-appbar"
                                  aria-haspopup="true"
                                  // onClick={handleMenuPharmacy}
                                  onClick={(event) =>
                                    handleMenuOpen(event, item.pharmacy.id)
                                  }
                                  color="inherit"
                                >
                                  <MoreVertIcon
                                    style={{ color: "rgba(122, 122, 122, 1)" }}
                                  />
                                </IconButton>
                                <Menu
                                  id="menu-appbar"
                                  anchorEl={anchorEl2}
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
                                    Boolean(anchorEl2) &&
                                    activeIndex === item.pharmacy.id
                                  }
                                  onClose={handleMenuClose}
                                >
                                  <MenuItem onClick={handleMenuClose}>
                                    <Link
                                      className="btn btn-primary w-100"
                                      to={`/admin/UpdatePharmacy/${item.pharmacy.id}`}
                                    >
                                      Оновити
                                    </Link>
                                  </MenuItem>
                                  <MenuItem onClick={handleMenuClose}>
                                    <button
                                      className="btn btn-danger w-100"
                                      onClick={async () => {
                                        let res = await deletePharmacy(
                                          item.pharmacy.id
                                        );
                                        if (res.status === Success) {
                                          toast.success(                                            
                                            "Видалення аптеки пройшло успішно!"
                                          );
                                          window.location.reload();
                                        } else {
                                          toast.error("Помилка!");
                                        }
                                      }}
                                    >
                                      Видалити
                                    </button>
                                  </MenuItem>
                                </Menu>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
                const newUrl = `/admin/pharmacyList/${page}`;
                window.history.pushState({}, "", newUrl);
                let res = await getPharmaciesForAdmin(
                  page,
                  search,
                  isDisplayOnlyCompanies
                );
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
