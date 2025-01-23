import React from 'react';
import AdminAdverts from "../../../components/AdminAdverts";

const data = [
    {
        id: 1,
        advertName: 'Shoe Collection Store',
        advertImage: '/images/shoe.png', 
        vendorName: 'Chukka Uzo',
        advertCategory: 'Cars',
        duration: '30 Days',
        status: 'Suspended',
    },
    {
        id: 2,
        advertName: 'Car Showroom',
        advertImage: 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1737663473/kuduMart/image_fptdhe.png', 
        vendorName: 'Chukka Uzo',
        advertCategory: 'Cars',
        duration: '30 Days',
        status: 'Active',
    },
    {
        id: 3,
        advertName: 'Electronics Hub',
        advertImage: 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1737663474/kuduMart/image1_kuw7sy.png', 
        vendorName: 'Chukka Uzo',
        advertCategory: 'Electronics',
        duration: '30 Days',
        status: 'Active',
    },
    {
        id: 4,
        advertName: 'Furniture Store',
        advertImage: 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1737663473/kuduMart/image_fptdhe.png', 
        vendorName: 'Chukka Uzo',
        advertCategory: 'Furniture',
        duration: '30 Days',
        status: 'Active',
    },
    {
        id: 5,
        advertName: 'Book Store',
        advertImage: '/images/books.png', 
        vendorName: 'Chukka Uzo',
        advertCategory: 'Books',
        duration: '30 Days',
        status: 'Active',
    },
    {
        id: 6,
        advertName: 'Shoe Collection Store',
        advertImage: 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1737663473/kuduMart/image_fptdhe.png', 
        vendorName: 'Chukka Uzo',
        advertCategory: 'Cars',
        duration: '30 Days',
        status: 'Deactivated',
    },
];

const App = () => {
    return (
        <div className="min-h-screen">
            <AdminAdverts data={data} />
        </div>
    );
};

export default App;
