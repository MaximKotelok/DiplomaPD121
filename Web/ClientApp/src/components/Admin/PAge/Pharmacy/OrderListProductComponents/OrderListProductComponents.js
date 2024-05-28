import React, {useEffect} from "react";
import styles from "./OrderListProductComponents.module.css";
import "./OrderListProductComponents.css";
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
import CustomImgComponent from "../../../../Common/CustomImgComponent/CustomImgComponent";
import BtnEditStatusModalOrderList from "./components/BtnEditStatusModalOrderList/BtnEditStatusModalOrderList";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
import { getAllReservationsStatuses, getPharmacyReservations } from "../../../../../services/reservation";
import { Success, itemsPerPageForAdmin } from "../../../../../utils/Constants";
import PaginationComponent from "../../../../Common/PaginationComponent/PaginationComponent";

const columns = [
  { id: "fullName", label: "Ідентифікатор/Ім'я", minWidth: 220 },
  { id: "reservedTime", label: "Дата", minWidth: 200 },
  {
    id: "phoneNumber",
    label: "Мобільний номер",
    minWidth: 220,
    editable: true,
    // format: (value) => value.toLocaleString("en-US"),
  },
  { id: "priceAndCount", label: "Ціна (шт)", minWidth: 200 },
  {
    id: "status",
    label: "Статус",
    minWidth: 200,
    editable: true,
    // align: "right",
    format: (value) => value.toFixed(2),
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

export const OrderListProductComponents = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [rows, setRows] = React.useState([]);
  const [countOfPages, setCountOfPages] = React.useState(1);
  //const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [rows, setRows] = React.useState([]);
  const [statuses, setStatuses] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const [emptyRowCount, setEmptyRowCount] = React.useState(0);
  useEffect(() => {

    if (itemsPerPageForAdmin > rows.length) {
        setEmptyRowCount(itemsPerPageForAdmin - rows.length)
    } else {
        setEmptyRowCount(0)

    }
  },[rows]
  )

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(()=>{
    init();
  },[]);

  async function init(){
    let res = await getPharmacyReservations(page);
    let resReservationStatuses = await getAllReservationsStatuses();

    if(res.status === Success && resReservationStatuses.status === Success) {
      setRows(res.data.data);
      setCountOfPages(res.data.countOfPages);
      setStatuses(resReservationStatuses.data);
    }
  }
  async function refresh(page, search){
    let res = await getPharmacyReservations(page,search);
    if(res.status === Success){
      setPage(page)
      setRows(res.data.data)
    }
  }

  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} `}>
        <div className="col-6">
          <SearchComponent  callback={async (text)=>{
              setSearch(text);
              await refresh(1, text);
          }}/>
        </div>

        <div className="col-6"></div>

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
                <React.Fragment>
                  {rows.map((row, index) => (
                    <TableRow className={`${styles["tb-user"]}`} key={index}>
                      <TableCell>{row.fullName}</TableCell>
                      <TableCell>{row.reservedTime}</TableCell>
                      <TableCell>{row.phoneNumber}</TableCell>
                      <TableCell>{row.priceAndCount}</TableCell>

                      <TableCell>
                        <div
                          className={`d-flex justify-content-between align-items-center`}
                        >
                          <div
                            className={`${styles["span-status-rozmir"]}`}
                            style={
                              {
                                backgroundColor: statuses.find(status => status.id == row.status).color,
                              }
                            }
                          >
                            {statuses.find(status => status.id == row.status).status}
                            {/* {getStatusText(row.status)} */}
                          </div>
                          <BtnEditStatusModalOrderList id={row.id} statuses={statuses} changeStatus={(id)=>{
                            
                              setRows((prevRows) => {
                                const updatedRows = prevRows.map((row, rowIndex) => {
                                  if (rowIndex === index) {
                                    return {...row, status: id}                                    
                                  }
                                  return row;
                                });
                                
                                return updatedRows;
                              });
                              
                            }}/>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
                {Array.from(Array(emptyRowCount)).map((_, index) => (
                                    <TableRow key={`empty-${index}`} className="max-row-size">
                                        <TableCell colSpan={columns.length}>

                                        </TableCell>
                                    </TableRow>
                                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={`d-flex justify-content-end align-items-center`}>
            <PaginationComponent
              setContent={(a)=>setRows(a)}
              getContent={async (page)=>{
                let res = await getPharmacyReservations(page, search);
                if(res.status === Success){
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
