import React from 'react';
import ReviewTable from '../../../components/ReviewTable';
import { dateFormat } from '../../../helpers/dateHelper';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../hooks/modal';
import DeleteModal from '../../../components/DeleteModal';
import { Button } from '@material-tailwind/react';

const AllStore = ({ data, allData, paginate, refetch }) => {

    const navigate = useNavigate();

    const { openModal } = useModal();

    const fetchNew = (page) => {
        refetch(page)
    }


    const handleEditStore = (id) => {
        navigate(`edit/${id}`)
    }


    const handleDeleteModal = (id) => {
        openModal({
            size: "sm",
            content: <DeleteModal title={'Do you wish to delete this store?'} redirect={() => refetch(1)}
                api={`/vendor/store?storeId=${id}`} />
        })
    }

    const columns = [
        { key: 'name', label: 'Store Name' },
        { key: 'totalProducts', label: 'No. Product' },
        { 
            key: 'createdAt', 
            label: 'Date Created',
            render: (value) => dateFormat(value, "dd-MM-yyyy")
        }
    ];

    const actions = [
        {
            label: () => "View/Edit",
            onClick: (row) => handleEditStore(row.id)
        },
        {
            label: () => "Delete",
            onClick: (row) => handleDeleteModal(row.id)
        }
    ];



    return (
        <>
            <div className='All'>
                <div className="bg-white rounded-md w-full gap-5">
                    <ReviewTable
                        title="My Stores"
                        columns={columns}
                        data={data || []}
                        allData={allData || []}
                        exportData={true}
                        isLoading={false}
                        hasNumber={true}
                        actions={actions}
                        currentPage={paginate?.page || 1}
                        totalPages={paginate?.pages || 1}
                        onPageChange={fetchNew}
                    />
                    <div className="text-center text-black-100 mt-6 pb-6 leading-loose text-sm px-6">
                        <Button className='md:w-1/4 w-full bg-kuduOrange p-3' onClick={() => navigate('create')}>
                            Add New Store
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllStore;
