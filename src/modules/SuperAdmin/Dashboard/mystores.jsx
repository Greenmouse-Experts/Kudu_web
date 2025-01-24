import React from 'react';
import MyStores from "../../../components/MyStore";

const data = [
    { id: 1, storeName: 'Shoe Collection Store', vendorName: 'Chukka Uzo', price: 'N10,000', dateJoined: '30-21-25', status: 'Ongoing' },
    { id: 2, storeName: 'Shoe Collection Store', vendorName: 'Hamzat', price: 'N20,000', dateJoined: '30-21-25', status: 'Completed' },
    { id: 3, storeName: 'Shoe Collection Store', vendorName: 'Chukka Uzo', price: 'N10,000', dateJoined: '30-21-25', status: 'Completed' },
    { id: 4, storeName: 'Shoe Collection Store', vendorName: 'Hamzat', price: 'N50,000', dateJoined: '30-21-25', status: 'Completed' },
    { id: 5, storeName: 'Shoe Collection Store', vendorName: 'Adeleke', price: 'N10,000', dateJoined: '30-21-25', status: 'Completed' },
    { id: 6, storeName: 'Shoe Collection Store', vendorName: 'Abdulazeez', price: '100,000', dateJoined: '30-21-25', status: 'Cancelled' },
];

const App = () => {

    return (
        <div className="min-h-screen">
            <MyStores data={data} />
        </div>
    );
};

export default App;
