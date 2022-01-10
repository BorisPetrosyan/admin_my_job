import React from 'react'

// Import React Table
import {
    useTable,

    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    useGlobalFilter
} from 'react-table'

const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
}) => {
    const count = preGlobalFilteredRows.length

    return (
        <span>
            Поиск по всем полям кроме вложенных:{' '}
            <input
                value={globalFilter || ''}
                onChange={e => {
                    setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: '1.1rem',
                    border: '0'
                }}
            />
        </span>
    )
}

const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter }
}) => {
    const count = preFilteredRows.length

    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
            style={{ width: '100%' }}
            onClick={e => e.stopPropagation()}
        />
    )
}
// Create a default prop getter
const defaultPropGetter = () => ({})

const Table = ({ columns, data, getCellProps = defaultPropGetter }) => {
    const filterTypes = React.useMemo(
        () => ({
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            }
        }),
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state: { globalFilter },
        preGlobalFilteredRows,
        setGlobalFilter,
        flatColumns,
        rows
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes
        },

        useFilters,
        useGroupBy,
        useGlobalFilter,
        useSortBy,
        useExpanded
    )

    return (
        <div>
            Показывать колонки:&nbsp;
            {flatColumns?.slice(1).map(column => (
                <span key={column.id} style={{ marginRight: 20 }}>
                    <label>
                        <input
                            type="checkbox"
                            {...column.getToggleHiddenProps()}
                        />{' '}
                        {column.id}
                    </label>
                </span>
            ))}
            <br />
            <table {...getTableProps()}>
                <thead>
                    <tr>
                        <th
                            colSpan={flatColumns?.length}
                            style={{
                                textAlign: 'left'
                            }}
                        >
                            <GlobalFilter
                                preGlobalFilteredRows={preGlobalFilteredRows}
                                globalFilter={globalFilter}
                                setGlobalFilter={setGlobalFilter}
                            />
                        </th>
                    </tr>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                    <div style={{ maxWidth: '100%' }}>
                                        {column.canFilter
                                            ? column.render('Filter')
                                            : null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell, id) =>
                                    id === 0 ? (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    ) : (
                                        <td
                                            {...cell.getCellProps([
                                                getCellProps(cell)
                                            ])}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table
