import React from 'react';
import UserTable from "../../../components/UserTable";
import useApiMutation from '../../../api/hooks/useApiMutation';
import { useEffect } from 'react';
import { useState } from 'react';
import Loader from '../../../components/Loader';

const App = () => {
  const { mutate } = useApiMutation();

  const [customers, setCustomersData] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const getCustomers = () => {
    mutate({
      url: `/admin/customers`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setCustomersData(response.data.data);
        setIsLoading(false);
      },
      onError: () => {
      }
    });
  }


  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className="min-h-screen">
      {loading ?
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
        :
        <UserTable data={customers} />
      }
    </div>
  );
};

export default App;
