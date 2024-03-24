import {
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
// import SearchIcon from "./icons/SearchIcon";
// import search from "../../../../../../assets/images/BrandTmp.png";
import FilterPopover from "./FilterPopover";
import SearchComponent from "../../../../Common/SearchComponent/SearchComponent";

const Filters = ({ columnFilters, setColumnFilters }) => {
  const taskName = columnFilters.find((f) => f.id === "task")?.value || "";

  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );

  return (
    <HStack mb={2} >
     


    <SearchComponent/>
      


      {/* <FilterPopover
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      /> */}
    </HStack>
  );
};
export default Filters;
