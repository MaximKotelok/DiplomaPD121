import React, { useState } from "react";
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
    accessorKey: "dataZayavka",
    header: "Дата заявки",
    size: "20%",
    cell: TextCell,
  },
  {
    accessorKey: "monafacture",
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
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);

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
                      className={`header-text ${
                        header.column.columnDef.header ? "borde-hr" : ""
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
            {table.getRowModel().rows.map((row) => (
              <Box className="tr" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Box className="td" w={cell.column.getSize()} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Box>
                ))}
              </Box>
            ))}
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
