import React from "react";
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
import { NavLink } from "react-router-dom";

const columns = [
  { id: "name", last: false, label: "Назва", width: 1100 },
  { id: "description", last: false, label: "Опис", width: 3200 },
  //   { id: "buttonEdit", last: true, label: "", width: 20 },
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

  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} `}>
        <div className="row">
          <div className="col-6">
            <SearchComponent
            //   callback={async (text) => {
            //     let page = 1;
            //     setPage(1);
            //     const res = await getAllPharmaciesForAdmin(page, text);
            //     if (res.status === Success) {
            //       //console.log(res);
            //       setRows(res.data.data);
            //       setCountOfPages(res.data.countOfPages);
            //     }
            //   }}
            />
          </div>

          <div className="col-6 d-flex  align-items-center justify-content-end">
            {/* <CheckedBox text="Показувати лише фарма-компанії?" /> */}
            <NavLink
              to={"/admin/attributeUpsert"}
              className={`${styles["btn-add"]}`}
            >
              Додати
            </NavLink>
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
                <React.Fragment key={1}>
                  <TableRow className={`${styles["tb-pharmacy"]}`}>
                    <TableCell>
                      {" "}
                      <span className={`${styles["text-table"]}`}>№1</span>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <span className={`${styles["text-table"]}`}> 2</span>
                    </TableCell>
                    <TableCell className="d-flex align-items-center justify-content-end">
                      <NavLink
                        to={"/admin/attributeUpsert/1"}
                        className={`${styles["btn-edit"]}`}
                      >
                        Редагувати
                      </NavLink>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
                {/* {rows.map((pharmacy, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell
                        colSpan={12}
                        className={`${styles["header-body-pharmacy"]}`}
                      >
                        <CustomImgComponent
                          className={`${styles["img-product"]}`}
                          // src={`${ApiPath}${item.pathToPhoto}`}
                        />{" "}
                        {pharmacy.name}
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
                              {item.pharmacist?item.pharmacist:"НЕМАЄ"}
                              <BtnEditPharmacyModal id={item.pharmacy.id}/>
                            </div>
                          </TableCell>
                          
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
                ))} */}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={`d-flex justify-content-end align-items-center`}>
            {/* <PaginationComponent 
              setContent={(a)=>setRows(a)}
              getContent={async (page)=>{
                const newUrl = `/admin/pharmacyList/${page}`;
                window.history.pushState({}, '', newUrl);
                let res = await getAllPharmaciesForAdmin(page);
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
