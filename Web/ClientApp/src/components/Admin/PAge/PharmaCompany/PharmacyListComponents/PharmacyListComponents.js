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
import SearchComponent from "../../../../Common/SearchComponent/SearchComponent";
import { useEffect } from "react";
import { getAllProductConfirm } from "../../../../../services/productConfirm";
import { ApiPath, STANDART_IMG, Success, itemsPerPageForAdmin } from "../../../../../utils/Constants";
import CustomImgComponent from "../../../../Common/CustomImgComponent/CustomImgComponent";
import { getAllStatuses } from "../../../../../services/productStatus";
import PaginationComponent from "../../../../Common/PaginationComponent/PaginationComponent";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
import BtnEditPharmacyModal from "./components/BtnEditStatusModal/BtnPharmacyModal";
import { deletePharmacy, getAllPharmaciesForAdmin, getAllPharmaciesForPharmaCompany } from "../../../../../services/pharmacy";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { PharmaCompanyPharmacyListPath } from "../../../../../utils/TablesPathes";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
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

export const PharmacyListForPharmaCompanyComponent = () => {
  const classes = useStyles();
  const { paramPage } = useParams();
  const [page, setPage] = React.useState(paramPage);
  const [countOfPages, setCountOfPages] = React.useState(1);
  const [rows, setRows] = React.useState([]);
  const [isDisplayOnlyCompanies, setIsDisplayOnlyCompanies] =
    React.useState(false);
  const [search, setSearch] = React.useState("");
  const [emptyRowCount, setEmptyRowCount] = React.useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeIndex, setActiveIndex] =
  React.useState(null);

  const handleMenuOpen= (event, index) => {
    setAnchorEl(event.currentTarget);
    setActiveIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveIndex(null);
  };


  useEffect(() => {
      init(parseInt(paramPage));
  }, []);

  useEffect(() => {

      if (itemsPerPageForAdmin > rows.length) {
          setEmptyRowCount(itemsPerPageForAdmin - rows.length)
      } else {
          setEmptyRowCount(0)

      }
  }, [rows])


  async function reloadData() {
    let page = 1;
    setPage(1);
    const res = await getAllPharmaciesForPharmaCompany(
      page,
      search,
      isDisplayOnlyCompanies
    );
    if (res.status === Success) {
      //console.log(res);
      setRows(res.data.data);
      setCountOfPages(res.data.countOfPages);
    }
  }

  useEffect(() => {
    reloadData();
  }, [search, isDisplayOnlyCompanies]);

  async function init(paramPage) {
    let page = paramPage ? paramPage : 1;
    setPage(page);
    let res = await getAllPharmaciesForPharmaCompany(page, "");
    if (res.status === Success) {
      if (page > res.data.countOfPages) {
        res = await getAllPharmaciesForPharmaCompany(res.data.countOfPages);
        page = res.data.countOfPages;
      } else if (page < 1) {
        res = await getAllPharmaciesForPharmaCompany(1);
        page = 1;
      }
      setPage(parseInt(page));
      setRows(res.data.data);
      setCountOfPages(res.data.countOfPages);
    }
  }
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
      <div className={`${styles["box-container"]} `}>
        <div className="row">
          <div className="col-6">
            <SearchComponent callback={setSearch} />
          </div>
          <div className="col-4">
          </div>

          <div className="col-2">
            <Link
              to="/admin/addPharmacy"
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

                  <React.Fragment>
                    {rows.map((item, itemIndex) => {
                      return (
                        <TableRow
                          className={`${styles["tb-pharmacy"]}`}
                          key={itemIndex}
                        >
                          <TableCell>№ {item.pharmacy.id}</TableCell>
                          <TableCell>{item.pharmacy.address}</TableCell>
                          <TableCell>{`${item.pharmacy.openTime} - ${item.pharmacy.closeTime}`}</TableCell>
                          <TableCell>
                            <div className="d-flex justify-content-between align-items-center">
                              {item.pharmacist ? item.pharmacist : "НЕМАЄ"}
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
                                          toast.success("Видалення аптеки пройшло успішно!");
                                          window.location.reload();
                                        } else {
                                          toast.error("Помилка");
                                        }
                                      }}
                                    >
                                      Видалити
                                    </button>
                                  </MenuItem>
                                </Menu>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
                const newUrl = `/admin/${PharmaCompanyPharmacyListPath}/${page}`;
                window.history.pushState({}, "", newUrl);
                let res = await getAllPharmaciesForPharmaCompany(page);
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
