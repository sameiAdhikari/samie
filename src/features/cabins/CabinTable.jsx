// import styled from "styled-components";
// import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import useCabins from "./useCabins";
import CabinRow from "./CabinRow";
import { Table } from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  if (cabins.length === 0) return <Empty resource="cabin" />;
  const filterValue = searchParams.get("discount") || "all";
  let filterCabin;
  // 1) this is for Filter logic
  if (filterValue === "all") filterCabin = cabins;
  if (filterValue === "no-discount")
    filterCabin = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filterCabin = cabins.filter((cabin) => cabin.discount > 0);

  // 2) this is for sort logic
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabin = filterCabin.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={cabins}
          // data={filterCabin}
          data={sortedCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
