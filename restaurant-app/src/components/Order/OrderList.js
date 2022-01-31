import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Table from "../../layouts/Table";
import { TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function OrderList(props) {

    const [selectedDate, setSelectedDate] = useState(null)

    const [currentDate, setcurrentDate] = useState('')

    const { setOrderId, setOrderListVisibility, resetFormControls, setNotify } = props;

    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        var date = new Date().getDate()
        var month = new Date().getMonth() + 1
        var year = new Date().getFullYear()
        setcurrentDate(
        date + '/' + month + '/' + year
        )
    }, [])

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.ORDER).fetchAll()
            .then(res => {
                setOrderList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const showForUpdate = id => {
        setOrderId(id);
        setOrderListVisibility(false);
    }

    const deleteOrder = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            createAPIEndpoint(ENDPIONTS.ORDER).delete(id)
                .then(res => {
                    setOrderListVisibility(false);
                    setOrderId(0);
                    resetFormControls();
                    setNotify({ isOpen: true, message: 'Deleted successfully.' });
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order No.</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Payed With</TableCell>
                        <TableCell>Grand Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orderList.map(item => (
                            <TableRow key={item.orderMasterId}>
                                <TableCell
                                    onClick={e => showForUpdate(item.orderMasterId)}>
                                    {item.orderNumber}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item.orderMasterId)}>
                                    {item.customer.customerName}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item.orderMasterId)}>
                                    {item.pMethod}
                                </TableCell>
                                <TableCell
                                    onClick={e => showForUpdate(item.orderMasterId)}>
                                    {item.gTotal}
                                </TableCell>
                                <TableCell>
                                    <DeleteOutlineTwoToneIcon
                                        color="secondary"
                                        onClick={e => deleteOrder(item.orderMasterId)} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}
