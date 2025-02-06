import React, { useEffect, useState } from 'react';
import AdminAdverts from "../../../components/AdminAdverts";
import Loader from '../../../components/Loader';
import useApiMutation from '../../../api/hooks/useApiMutation';


const App = () => {

    const [advertData, setAllAdverts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { mutate } = useApiMutation();

    const fetchData = async () => {
        try {
            const advertRequest = new Promise((resolve, reject) => {
                mutate({
                    url: '/admin/general/adverts',
                    method: 'GET',
                    headers: true,
                    hideToast: true,
                    onSuccess: (response) => resolve(response.data.data),
                    onError: reject,
                });
            });
            const [adverts] = await Promise.all([
                advertRequest,
            ]);

            setAllAdverts(adverts)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="min-h-screen">
            {loading ? (
                <div className="w-full h-screen flex items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <AdminAdverts data={advertData} refetch={fetchData} />
            )
            }
        </div>
    );
};

export default App;
