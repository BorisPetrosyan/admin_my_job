import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { getUserName } from '../../../utils/helpers'

import ReactTable from './Table'

const Companies = props => {
	const { history } = props
	// const dispatch = useDispatch()
	const companies = useSelector(store => store.companies.data)

	const columns = useMemo(
		() => [
			{
				// Build our expander column
				Header: () => null, // No header, please
				id: 'expander', // Make sure it has an ID
				Cell: ({ ...row }) =>

					row.canExpand ? (
						<div
							{...row?.getExpandedToggleProps({
								style: {
									// We can even use the row.depth property
									// and paddingLeft to indicate the depth
									// of the row
									paddingLeft: `${row.depth * 2}rem`
								}
							})}
						>
							{row.depth}
							{row.isExpanded ? (
								<div className="arrow-bottom" />
							) : (
								<div className="arrow-right" />
							)}
						</div>
					) : (
						<div
							style={{
								paddingLeft: `${row.depth * 2}rem`
							}}
						>
							{row.depth}
						</div>
					)
			},
			{
				Header: 'Наименование',
				accessor: 'name'
			},
			{
				Header: 'Подразделения',
				id: 'subdivisions',
				accessor: c => c.subdivisions.map(s => s.name),
				Cell: ({ cell: { value } }) =>
					value.map((s, id) => <div key={id}>{s}</div>)
			},
			{
				Header: 'Сотрудники',
				id: 'users',
				accessor: c =>
					c.level === 1
						? c.users.map(u => getUserName(u))
						: c.users_this.map(u => getUserName(u)),
				Cell: ({ cell: { value } }) =>
					value.map((c, id) => <div key={id}>{c}</div>)
			},
			{
				Header: 'Сотрудников',
				id: 'users_length',
				accessor: c =>
					c.level === 1 ? c.users.length : c.users_this.length
			},
			{
				Header: 'Руководитель',
				id: 'head',
				accessor: c => (c.head ? getUserName(c.head) : '-')
			},
			{
				Header: 'Администратор',
				id: 'admin',
				accessor: c => (c.admin ? getUserName(c.admin) : '-')
			},
			{
				Header: 'Менеджер',
				id: 'manager',
				accessor: c => (c.manager ? getUserName(c.manager) : '-')
			}
		],
		[]
	)

	return (
		<div className="content">
			<div className="container-fluid">
				<div className="btn-bottom">
					<Link to="/companies/add" className="add-btn" />
				</div>
				<Styles>
					<ReactTable
						columns={columns}
						data={
							companies
								? companies.filter(c => c.level === 1)
								: []
						}
						getCellProps={({ row }) => {
							return {
								onClick: () =>
									history.push(`/companies/edit/${row.original._id}` , {
										company: row.original
									})
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
`
export default Companies
