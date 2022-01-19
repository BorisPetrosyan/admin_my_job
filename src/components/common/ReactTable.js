import React from "react";

// Import React Table
import {
  useTable,
  useFilters,
  useGroupBy,
  useSortBy,
  useExpanded,
  usePagination,
  useGlobalFilter,
    useRowSelect
} from "react-table";

const pageSizeOptions = [5, 10, 20, 30, 40, 50, 100];

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;

  return (
    <span>
      Поиск по всем полям:{" "}
      <input
        value={globalFilter || ""}
        onChange={(e) => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
};

const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
      style={{ width: "100%" }}
      onClick={(e) => e.stopPropagation()}
    />
  );
};
// Create a default prop getter
const defaultPropGetter = () => ({});


const Table = ({
  tableType,
  columns,
  data,
  pageCount: controlledPageCount,
  fetchData,
  loading,
  getRowProps = defaultPropGetter,
  deps = [],
  initialState = { pageIndex: 0, pageSize: 10 },
  total = null,
}) => {
  const filterTypes = React.useMemo(
    () => ({
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
    flatColumns,
  } = useTable(
    {
      columns,
      data,
      initialState, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    // props,
    useFilters,
    useGroupBy,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,

  );

  React.useEffect(() => {
    console.log(
      "useEffect from React table works...",
      `pageIndex is : ${pageIndex}`,
      `pageSize is : ${pageSize}`
    );
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize, ...deps]);

  return (
    <div>
      <span className="hide_for_diagnostics">Показывать колонки:&nbsp;</span>

      {flatColumns?.map((column) => (

        <span key={column.id} style={{ marginRight: 20 }}>
          <label>
            <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
            {column.id}
          </label>
        </span>
      ))}
      <br />
      <table {...getTableProps()}>
        <thead>
          <tr>
            <th
              className="table__search"
              colSpan={flatColumns?.length}
              style={{
                textAlign: "left",
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>

          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (

                <th {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={
                      column.originalId === 'recommendedHeaderGreen' ? {color:"green",textAlign:'center'} :
                      column.originalId === 'recommendedHeaderOrange' ? {color:"orange",textAlign:'center'} :
                      column.originalId === 'recommendedHeaderRed' ? {color:"red",textAlign:'center'} :
                      column.originalId === 'preparationsHeaderGreen' ? {color:"green",textAlign:'center'} :
                      column.originalId === 'preparationsHeaderOrange' ? {color:"orange",textAlign:'center'} :
                      column.originalId === 'preparationsHeaderRed' ? {color:"red",textAlign:'center'} :
                      column.originalId === 'valueHeader'  ? {textAlign:"center"} : null
                    }

                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                  <div className="table__filter" style={{ maxWidth: "100%" }}>
                    {column.canFilter ? column.render("Filter") : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps([getRowProps(row)])}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
          <tr className="showing_result">
            {loading ? (
              <td colSpan="10000" style={{color:"red"}}>Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{" "}
                {total || controlledPageCount * pageSize} results
              </td>
            )}
          </tr>
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {pageSizeOptions.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table;
