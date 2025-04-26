import React, { useEffect, useState } from 'react';
import AdminAdverts from "../../../components/AdminAdverts";
import Loader from '../../../components/Loader';
import useApiMutation from '../../../api/hooks/useApiMutation';


const App = () => {

    const [advertData, setAllAdverts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({});

    const { mutate } = useApiMutation();

    const fetchData = async (page) => {
        setLoading(true)
        try {
            const advertRequest = new Promise((resolve, reject) => {
                mutate({
                    url: `/admin/general/adverts?page=${page}`,
                    method: 'GET',
                    headers: true,
                    hideToast: true,
                    onSuccess: (response) => resolve(response.data),
                    onError: reject,
                });
            });
            const [adverts] = await Promise.all([
                advertRequest,
            ]);

            setAllAdverts(adverts.data)
            setPagination(adverts.pagination);
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
            <AdminAdverts data={advertData} loading={loading} paginate={pagination} refetch={(page) => fetchData(page)} />
        </div>
    );
};

export default App;
