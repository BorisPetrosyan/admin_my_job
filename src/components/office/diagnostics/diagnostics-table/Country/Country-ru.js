import React, { useState, useMemo, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { t_load_users_from_page } from '../../../../../redux/tracks'
import { getUserName } from '../../../../../utils/helpers'
import ReactTable from '../../../../common/ReactTable'

// const { REACT_APP_SERVER } = process.env


const CountryRuTable = props => {
    const { history } = props
    const dispatch = useDispatch()
    const users = useSelector(store => store.users.from_page)

    const columns = useMemo(
        () => [
            {
                Header: 'N',
                id: '1',
                accessor: u => getUserName(u),
                Cell: ({ row: { id } }) => (
                    <div className="d-flex align-items-center">
                        <div style={{ width: '25%' }}>
                            {++id}
                        </div>
                    </div>
                )
            },
            {
                Header: 'Россия',
                id: '2',
                accessor: '-'
            },
            {
                Header: 'Краснодарский, Ставропольский край, Крым и Кавказ',
                id: '3',
                accessor: ''
            }
            ,
            {
                Header: 'Макс балл',
                id: '4',
                accessor: ''
            }
        ],
        []
    )

    const [loading, setLoading] = useState(false)
    const fetchIdRef = useRef(0)

    const fetchData = useCallback(
        async ({ pageSize, pageIndex }) => {
            const fetchId = ++fetchIdRef.current
            setLoading(true)
            await dispatch(
                t_load_users_from_page({ page: pageIndex + 1, limit: pageSize })
            )
            if (fetchId === fetchIdRef.current) {
                setLoading(false)
            }
        },
        [dispatch]
    )

    return (
        <div className="content">
            <div className="container-fluid">
                <div className="btn-bottom">
                    <Link to="" className="add-btn" />
                </div>
                <Styles>
                    <ReactTable
                        columns={columns}
                        data={users ? users.docs : []}
                        fetchData={fetchData}
                        loading={loading}
                        pageCount={users ? users.totalPages : 0}
                        getRowProps={({ original }) => {
                            return {
                                onClick: () =>
                                    history.push(
                                        '/users/info/' + original._id,
                                        { user: original }
                                    )
                            }
                        }}
                    />
                </Styles>
            </div>
        </div>
    )
}
const Styles = styled.div`
	padding: 30px 0;
	color: black;
	table {
		border-spacing: 0;
		border: 1px solid black;
		width: 100%;
		cursor: pointer;

		tr {
			:last-child {
				td {
					border-bottom: 0;
				}
			}
		}

		th,
		td {
			margin: 0;
			padding: 0.5rem;
			border-bottom: 1px solid black;
			border-right: 1px solid black;
			font-size: 12px;
		}
		tbody tr:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
		.table__image {
			margin-right: 10px;
		}
	}
	.pagination {
		padding: 0.5rem;
		justify-content: center;
	}
`
export default CountryRuTable;