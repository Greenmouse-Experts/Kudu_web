import React from 'react';
import Transactions from "../../../components/Transaction";

const data = [
    { id: 1, transactionId: 'WSX-12345364', transactionType: 'Product Purchase', price: 'N10,000', dateJoined: '30-21-25', status: 'Ongoing' },
    { id: 2, transactionId: 'WSX-12345364', transactionType: 'Subscription', price: 'N20,000', dateJoined: '30-21-25', status: 'Completed' },
    { id: 3, transactionId: 'WSX-12345364', transactionType: 'Product Purchase', price: 'N10,000', dateJoined: '30-21-25', status: 'Completed' },
    { id: 4, transactionId: 'WSX-12345364', transactionType: 'Subscription', price: 'N50,000', dateJoined: '30-21-25', status: 'Completed' },
    { id: 5, transactionId: 'WSX-12345364', transactionType: 'Data Plan', price: 'N10,000', dateJoined: '30-21-25', status: 'Completed' },
    { id: 6, transactionId: 'WSX-12345364', transactionType: 'Airtime Plan', price: '100,000', dateJoined: '30-21-25', status: 'Cancelled' },
];

const App = () => {

    return (
        <div className="min-h-screen">
            <Transactions data={data} />
        </div>
    );
};

export default App;
