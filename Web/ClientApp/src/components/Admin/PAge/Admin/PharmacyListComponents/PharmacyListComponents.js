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
import { ApiPath, STANDART_IMG, Success } from "../../../../../utils/Constants";
import CustomImgComponent from "../../../../Common/CustomImgComponent/CustomImgComponent";
import { getAllStatuses } from "../../../../../services/productStatus";
import PaginationComponent from "../../../../Common/PaginationComponent/PaginationComponent";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
import BtnEditPharmacyModal from "./components/BtnEditStatusModal/BtnPharmacyModal";
import { getPharmaciesForAdmin, getCountOfPagesPharmaciesForAdmin } from "../../../../../services/pharmacy";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import BtnModalPharmaCompanyModal from "./components/BtnModalPharmaCompanyModal/BtnModalPharmaCompanyModal";

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

  useEffect(()=>{
    reload(parseInt(paramPage?paramPage:1), search, isDisplayOnlyCompanies);
  },[])


  async function reload(page, searchText, isDisplayOnlyCompanies){    
    setPage(page);
    let res = await getPharmaciesForAdmin(page, searchText?searchText:search, isDisplayOnlyCompanies);
    let resCountOfPages = await getCountOfPagesPharmaciesForAdmin(searchText?searchText:search, isDisplayOnlyCompanies);
    if(res.status === Success 
      && resCountOfPages.status === Success
    ){
        setCountOfPages(resCountOfPages.data);
        setRows(res.data);
        
      }
  }

  console.log(rows)

  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} `}>
        <div className="row">
          <div className="col-6">
            <SearchComponent callback={(text)=>{
              setSearch(text);
              reload(1, text, isDisplayOnlyCompanies);
            }
          } />
          </div>

          <div className="col-4">
            <CheckedBox
              text="Показувати лише фарма-компанії?"
              onChange={(value)=>{
                setIsDisplayOnlyCompanies(value);
                reload(1, search, value);
              }}
            />
          </div>
          <div className="col-2">
            <Link
              to="/admin/AddPharmaCompany"
              state={{pathToPharmacyTable: window.location.pathname }}
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
                    <TableRow>
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
                        <div className="d-flex justify-content-end">
                          <BtnModalPharmaCompanyModal id={pharmacy.id} />
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
                            <div className="d-flex justify-content-between">
                              {item.pharmacist ? item.pharmacist : "НЕМАЄ"}
                              <BtnEditPharmacyModal id={item.pharmacy.id} />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
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
                let res = await getPharmaciesForAdmin(page, search, isDisplayOnlyCompanies);
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
