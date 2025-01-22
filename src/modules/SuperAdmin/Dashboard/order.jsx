import React from 'react';
import OrderTable from "../../../components/OrderTable";

const data = [
    { id: 1, customerName: 'Benjamn Franklin', orderId: 'WSX-12345364', price: 'N10,000', dateJoined: '30-10-24', status: 'Ongoing' },
    { id: 2, customerName: 'Daniel Ameachi', orderId: 'WSX-12345364', price: 'N20,000', dateJoined: '30-10-24', status: 'Completed' },
    { id: 3, customerName: 'Francias Muller', orderId: 'WSX-12345364', price: 'N10,000', dateJoined: '30-10-24', status: 'Completed' },
    { id: 4, customerName: 'Zuko Tariq', orderId: 'WSX-12345364', price: 'N50,000', dateJoined: '30-10-24', status: 'Completed' },
    { id: 5, customerName: 'Benjamin Frank', orderId: 'WSX-12345364', price: 'N10,000', dateJoined: '30-10-24', status: 'Completed' },
    { id: 6, customerName: 'Azuko Bent', orderId: 'WSX-12345364', price: '100,000', dateJoined: '30-10-24', status: 'Cancelled' },
];

const App = () => {

    return (
        <div className="min-h-screen">
            <OrderTable data={data} />
        </div>
    );
};

export default App;
