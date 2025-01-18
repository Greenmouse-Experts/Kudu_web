import React, { Component } from 'react'
import PostProducts from "../../../components/PostProducts";

const data = [
    { id: 1, products: 'Nike Sneakers', category: 'Shoe', conditions: 'New', price: 'N10,000', quantity: '2', vendor: 'Hamzat Adekele' },
    { id: 2, products: '2010 Lexus ES 300', category: 'Car', conditions: 'Used', price: 'N20,000', quantity: '1' , vendor: 'Hamzat Abdul'},
    { id: 3, products: 'iPhone 16', category: 'Gadgets', conditions: 'Refurbished', price: 'N100,000', quantity: '2', vendor: 'Victor Chiko'},
    { id: 4, products: 'Balenciaga Runners', category: 'Shoe', conditions: 'Used', price: 'N70,000', quantity: '2', vendor: 'Mustapha Sodiq' },
    { id: 5, products: '2015 Mercedes C300', category: 'Car', conditions: 'New', price: 'N95,000', quantity: '1', vendor: 'Fawaz Rasheed' },
    { id: 6, products: 'Samsung Galaxy Fold', category: 'Gadgets', conditions: 'Brand New', price: 'N105,000', quantity: '5', vendor: 'Promise Ezima' },
    { id: 7, products: 'iPhone 16', category: 'Gadgets', conditions: 'Refurbished', price: 'N100,000', quantity: '2', vendor: 'Victor Chiko'},
    { id: 8, products: '2010 Lexus ES 300', category: 'Car', conditions: 'Used', price: 'N20,000', quantity: '1' , vendor: 'Hamzat Abdul'},
  ];
  
  const App = () => {
    return (
      <div className="min-h-screen">
        <PostProducts data={data} />
      </div>
    );
  };
  
  export default App;