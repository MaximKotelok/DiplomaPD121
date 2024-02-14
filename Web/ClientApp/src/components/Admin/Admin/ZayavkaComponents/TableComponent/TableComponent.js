import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  ChakraProvider,
  Heading,
  Icon,
  StylesProvider,
  Text,
} from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import "./Table.css";

import DATA from "./data";
// import EditableCell from "./components/EditableCell";
import StatusCell from "./components/StatusCell";
// import DateCell from "./components/DateCell";
import TextCell from "./components/TextCell";
import IconTextCell from "./components/IconTextCell";
import Filters from "./components/Filters";
import BtnModalTableCell from "./components/BtnModalTableCell";
import HdTextCell from "./components/HdTextCell";
// import SortIcon from "./components/icons/SortIcon";
import { ReactComponent as RightArrow } from "../../../../../assets/images/ArrowRight.svg";
import { ReactComponent as LeftArrow } from "../../../../../assets/images/ArrowLeft.svg";
import { StateInfos, Success } from "../../../../../utils/Constants";
import { getAllProductConfirm } from "../../../../../services/productConfirm";
import { getAllStatuses } from "../../../../../services/productStatus";

const columns = [
  // {
  //   accessorKey: "title",
  //   header: "Позиція",
  //   size: "20%",
  //   colSpan: 2,
  //   cell: HdTextCell,
  // },
  {
    accessorKey: "title",
    header: "Позиція",
    size: "20%",
    cell: IconTextCell,
  },
  {
    accessorKey: "date",
    header: "Дата заявки",
    size: "20%",
    cell: TextCell,
  },
  {
    accessorKey: "manafacturer",
    header: "Виробник",
    size: "20%",
    // cell: DateCell,
    cell: TextCell,
  },
  {
    accessorKey: "category",
    header: "Категорія",
    size: "20%",
    cell: TextCell,
  },
  {
    accessorKey: "status",
    header: "Статус",
    size: "20%",
    cell: StatusCell,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: BtnModalTableCell,
    
  },
];

const TableComponent = () => {
  const [data, setData] = useState(null);
  const [statuses, setStatuses] = useState(null);
  const [columnFilters, setColumnFilters] = useState([]);
  const [load, setLoad] = useState(StateInfos.LOADING);

  useEffect(() => {
    init();
  }, []);


  async function init() {
    let dataRes = await getAllProductConfirm();
    let statusesRes = await getAllStatuses();
    if (dataRes.status == Success && statusesRes.status == Success) {
      setData(dataRes.data);
      setStatuses(statusesRes.data);
      setLoad(StateInfos.LOADED);
      return;
    }


    setLoad(StateInfos.ERROR);
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                ...prev[rowIndex],
                [columnId]: value,
              }
              : row
          )
        ),
    },
    initialState: {
      pagination: {
        pageSize: 7, // Обмеження до 8 елементів на сторінку
      },
    },
  });
  function updateStatus(id, statusId) {
    const index = data.findIndex(a => a.id === id);
    
    if (index !== -1) {
      const updatedData = [...data]; 
      const element = updatedData[index];
      element.status = statuses.find(a => a.id === statusId).status;
      element.statusId = statusId;
      
      
      updatedData[index] = element;
      
      setData(updatedData);
    } else {
      console.error(`Элемент с id ${id} не найден`);
    }
  }
  

  function getActionsCell(cell){
    return (
      <Box className="td" w={cell.column.getSize()} key={cell.id}>
        {flexRender(
          cell.column.columnDef.cell, {
            ...cell.getContext(),
            statuses: statuses,
            activeStatus: data[cell.row.id].statusId,
            id: data[cell.row.id].id,
            updateStatus: updateStatus
        }
        )}
      </Box>
    )
  }

  function getStatusCell(cell){
    return (
      <Box className="td" w={cell.column.getSize()} key={cell.id}>
            {flexRender(
              cell.column.columnDef.cell, {
                ...cell.getContext(),
                status: data[cell.row.id].status,
                color: statuses.find(a=>a.id === data[cell.row.id].statusId).color
            }
            )}
          </Box>
    )
  }

  function getRegularCell(cell){
    return (
      <Box className="td" w={cell.column.getSize()} key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </Box>
    )
  }


  function getCell(row) {
    return row.getVisibleCells().map((cell) => {
      if (cell.column.id === "actions") {
        return getActionsCell(cell);          
      } 
      else if(cell.column.id === "status"){        
        return getStatusCell(cell)        
      }
      else {        
        return getRegularCell(cell);
      }
    })
  }

  if (load == StateInfos.LOADING) {
    return "Loading...";
  }

  return (
    <div className="products-area-wrapper tableView">
      <ChakraProvider>
        <StylesProvider>
          <Box>
            <Filters
              columnFilters={columnFilters}
              setColumnFilters={setColumnFilters}
            />

            <Box className="table">
              {table.getHeaderGroups().map((headerGroup) => (
                <Box className="tr" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Box className="th" w={header.getSize()} key={header.id}>
                      <Heading
                        className={`header-text ${header.column.columnDef.header ? "borde-hr" : ""
                          }`}
                        as="h4"
                        size="md"
                      >
                        {header.column.columnDef.header}
                      </Heading>
                    </Box>
                  ))}
                </Box>
              ))}
              {table.getRowModel().rows.map((row) => {
                return (

                  <Box className="tr" key={row.id}>
                    {getCell(row)}
                  </Box>
                )
              }
              )
              }
            </Box>



            <Box
              className="d-md-flex justify-content-end align-items-center"
            // style={{ display: "flex", alignItems: "center" }}
            >
              <Text mr={3}>
                {table.getState().pagination.pageIndex + 1} з{" "}
                {table.getPageCount()}
              </Text>
              <ButtonGroup isAttached>
                <Button
                  onClick={() => table.previousPage()}
                  isDisabled={!table.getCanPreviousPage()}
                  _hover={{ bg: "none" }}
                  bg={"none"}
                >
                  <LeftArrow />
                </Button>
                <Button
                  onClick={() => table.nextPage()}
                  isDisabled={!table.getCanNextPage()}
                  _hover={{ bg: "none" }}
                  bg={"none"}
                >
                  <RightArrow />
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
        </StylesProvider>
      </ChakraProvider>
    </div>
  );
};
export default TableComponent;
