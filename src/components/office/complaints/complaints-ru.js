import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserName} from "../../../utils/helpers";
import moment from "moment";
import Select from "../../common/Select";
import {t_getUsersComplaints, t_updateComplaintStatus} from "../../../redux/tracks";
import ReactTable from "../../common/ReactTable";
import styled from "styled-components";

const ComplaintsRu = (props) => {

    // const { history } = props
    const dispatch = useDispatch()
    const complaints = useSelector((store) => store.users.complaints_from_page)

    const columns = useMemo(
        () => [
            {
                Header: 'Пользователь',
                id: 'fio',
                accessor: ({ sender }) => getUserName(sender),
                Cell: ({ row: { original } }) => (
                    <div className="d-flex align-items-center">
                        <div style={{ width: '65%' }}>
                            {getUserName(original.sender)}
                        </div>
                    </div>
                )
            },
            {
                Header: 'Текст жалобы',
                accessor: 'text'
            },
            {
                Header: 'Контент',
                id: 'message',
                accessor: ({ message }) => message.text,
                Cell: ({ row: { original } }) => {
                    return (
                        <div className="d-flex align-items-center">
                            {original.message.text}
                        </div>
                    )
                }
            },
            {
                Header: 'Создано',
                id: 'created_at',
                accessor: ({ created_at }) => new Date(created_at).getTime(),
                Cell: ({ row: { original } }) => {
                    return (
                        <div className="d-flex align-items-center">
                            {moment(original.created_at).format(
                                'DD-MM-YYYY, HH:mm'
                            )}
                        </div>
                    )
                }
            },
            {
                Header: 'Статус',
                accessor: 'status',
                Cell: ({ row: { original } }) => {
                    return (
                        <div className="d-flex align-items-center">
                            <Select
                                value={original.status}
                                options={[
                                    'Received',
                                    'Under consideration',
                                    'Closed'
                                ]}
                                changeHandler={(status) =>
                                    dispatch(
                                        t_updateComplaintStatus({
                                            complaint_id: original._id,
                                            status
                                        })
                                    )
                                }
                                className="w-100"
                            />
                        </div>
                    )
                }
            }
        ],
        [dispatch]
    )

    const [loading, setLoading] = useState(false)
    const fetchIdRef = useRef(0)

    const fetchData = useCallback(
        async ({ pageSize, pageIndex }) => {
            const fetchId = ++fetchIdRef.current
            setLoading(true)
            await dispatch(
                t_getUsersComplaints({ page: pageIndex + 1, limit: pageSize })
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
                <Styles>
                    <ReactTable
                        columns={columns}
                        data={complaints ? complaints.docs : []}
                        fetchData={fetchData}
                        loading={loading}
                        pageCount={complaints ? complaints.totalPages : 0}
                        //getRowProps={({ original }) => {
                        //	return {
                        //		onClick: () =>
                        //			history.push(
                        //				'/users/info/' + original._id,
                        //				{ user: original }
                        //			),
                        //	}
                        //}}
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

export default ComplaintsRu;
