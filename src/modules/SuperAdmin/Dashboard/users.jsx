import React from 'react';
import UserTable from "../../../components/UserTable";

const data = [
  { id: 1, name: 'Chukka Uzo', email: 'testmail@gmail.com', userType: 'Vendor', dateJoined: '30-10-24', status: 'Verified' },
  { id: 2, name: 'Daniel Ameachi', email: 'testmail@gmail.com', userType: 'Customer', dateJoined: '30-10-24', status: 'Verified' },
  { id: 3, name: 'Francias Muller', email: 'testmail@gmail.com', userType: 'Vendor', dateJoined: '30-10-24', status: 'Verified' },
  { id: 4, name: 'Zuko Tariq', email: 'testmail@gmail.com', userType: 'Customer', dateJoined: '30-10-24', status: 'Verified' },
  { id: 5, name: 'Benjamin Frank', email: 'testmail@gmail.com', userType: 'Vendor', dateJoined: '30-10-24', status: 'Verified' },
  { id: 6, name: 'Azuko Bent', email: 'testmail@gmail.com', userType: 'Customer', dateJoined: '30-10-24', status: 'Un-Verified' },
];

const App = () => {
  return (
    <div className="min-h-screen">
      <UserTable data={data} />
    </div>
  );
};

export default App;
