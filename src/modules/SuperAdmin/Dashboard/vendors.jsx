import React from 'react';
import useApiMutation from '../../../api/hooks/useApiMutation';
import { useEffect } from 'react';
import { useState } from 'react';
import Loader from '../../../components/Loader';
import VendorTable from '../../../components/VendorTable';

const App = () => {
  const { mutate } = useApiMutation();

  const [customers, setCustomersData] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const getVendors = () => {
    mutate({
      url: `/admin/vendors`,
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
    getVendors();
  }, []);

  return (
    <div className="min-h-screen">
      {loading ?
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
        :
        <VendorTable data={customers} />
      }
    </div>
  );
};

export default App;
