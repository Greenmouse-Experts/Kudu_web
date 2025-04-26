import React, { useEffect, useState } from 'react';
import Transactions from "../../../components/Transaction";
import useApiMutation from '../../../api/hooks/useApiMutation';
import Loader from '../../../components/Loader';

const App = () => {

    const { mutate } = useApiMutation();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);


    const getTransactions = (page) => {
        setLoading(true);
        mutate({
            url: `/admin/transactions?page=${page}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setTransactions(response.data);
                setLoading(false);
            },
            onError: () => {
                setLoading(false)
            }
        });
    }

    useEffect(() => {
        getTransactions(1);
    }, []);

    return (
        <div className="min-h-screen">
            <Transactions data={transactions.data} loading={loading} paginate={transactions.pagination} fetchNew={(page) => getTransactions(page)} />
        </div>
    );
};

export default App;
