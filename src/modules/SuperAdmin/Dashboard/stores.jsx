import React, { useEffect, useState } from 'react';
import AllStores from "../../../components/AllStore";
import useApiMutation from '../../../api/hooks/useApiMutation';
import Loader from '../../../components/Loader';

const App = () => {
    const [storesData, setAllStores] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);

    const { mutate } = useApiMutation();

    const fetchData = async (page) => {
        try {
            const storesRequest = new Promise((resolve, reject) => {
                mutate({
                    url: `/admin/general/stores?page=${page}`,
                    method: 'GET',
                    headers: true,
                    hideToast: true,
                    onSuccess: (response) => resolve(response.data),
                    onError: reject,
                });
            });
            const [stores] = await Promise.all([
                storesRequest,
            ]);

            setAllStores(stores.data)
            setPagination(stores.pagination);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchData(1);
    }, []);

    return (
        <div className="min-h-screen">
            {loading ? (
                <div className="w-full h-screen flex items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <AllStores data={storesData} paginate={pagination} refetch={(page) => fetchData(page)} />
            )
            }
        </div>
    );
};

export default App;
