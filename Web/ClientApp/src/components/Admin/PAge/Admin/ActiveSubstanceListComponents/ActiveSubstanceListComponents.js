import React, { useEffect, useRef, useState } from "react";
import styles from "./ActiveSubstanceListComponents.module.css";
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
import { NavLink, useParams } from "react-router-dom";
import AddActiveSubstanceModal from "./components/AddActiveSubstanceModal";
import { getActiveSubstancesCountOfPage, getActiveSubstancesPage, getAllActiveSubstances, updateActiveSubstanceStatus } from "../../../../../services/activeSubstance";
import { Success } from "../../../../../utils/Constants";
import  PaginationComponent from "../../../../Common/PaginationComponent/PaginationComponent";
import { toast } from "react-toastify";

const columns = [
  { id: "name", last: false, label: "Назва", width: 1100 },
  { id: "counProduct", last: false, label: "Кількість товару", width: 1200 },
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

export const ActiveSubstanceListComponents = () => {
  const {paramPage}=useParams();

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [countOfPages, setCountOfPages] = useState(0);
  
  const firstLoad = useRef(true);
  const classes = useStyles();
  useEffect(()=>{
    if(paramPage)
      reload(parseInt(paramPage));
    else
      reload(page);

  },[]);
  
  useEffect(()=>{
    if(!firstLoad.current)
      reload(1);
  },[search]);



  async function reload(page){
    setPage(page);
    const countOfPagesRes = await getActiveSubstancesCountOfPage("");
    const res = await getAllActiveSubstances(page, search);

    if(
      countOfPagesRes.status === Success &&
      res.status === Success
    ){
      setCountOfPages(countOfPagesRes.data);
      setRows(res.data)
    }
    if(firstLoad.current )
    firstLoad.current = false;
  }

  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} `}>
        <div className="row">
          <div className="col-6">
            <SearchComponent
              callback={async (text) => {
                setSearch(text);
                
              }}
            />
          </div>

          <div className="col-6 d-flex  align-items-center justify-content-end">
            {/* <CheckedBox text="Показувати лише фарма-компанії?" /> */}
            <AddActiveSubstanceModal />
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
                  {rows.map(item=>{
                    return (<TableRow className={`${styles["tb-pharmacy"]}`} key={item.id}>
                    <TableCell>
                      <span className={`${styles["text-table"]}`}>{item.title}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`${styles["text-number"]}`}>{item.countOfMedicines}</span>
                    </TableCell>
                    <TableCell className="d-flex align-items-center justify-content-between">
                      <CheckedBox value={!(item.isActive)} text="Неактивний" onChange={async(value)=>{
                        let res = await updateActiveSubstanceStatus(item.id, !value);
                        if(res.status === Success){
                          toast.success("Успіх")
                          return;
                        }
                        toast.error("Помилка")
                      }} />

                      <NavLink
                        to={`/admin/activeSubstance/${item.id}`}
                        className={`${styles["btn-edit"]}`}
                      >
                        Редагувати
                      </NavLink>
                    </TableCell>
                  </TableRow>)
                  })}
               
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
             <PaginationComponent
              setContent={(a)=>setRows(a)}
              getContent={async (page)=>{
                const newUrl = `/admin/activeSubstanceList/${page}`;
                window.history.pushState({}, '', newUrl);
                let res = await getAllActiveSubstances(page, search);
                if(res.status === Success){
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
