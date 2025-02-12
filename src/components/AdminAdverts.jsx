import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import DeleteModal from './DeleteModal';
import { useModal } from '../hooks/modal';
import Table from './Tables';

const AdminAdverts = ({ data, paginate, refetch }) => {
    const navigate = useNavigate();
    const { openModal } = useModal();

    const handleRedirect = () => {
        refetch(paginate.page);
    };

    const handleDeleteModal = (id) => {
        openModal({
            size: "sm",
            content: <DeleteModal title={'Do you wish to delete this advert?'} redirect={handleRedirect}
                api={`/admin/adverts?advertId=${id}`} />
        })
    }

    return (
        <div className="min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg font-semibold text-black-700 mb-4">Adverts</h1>
                <Link
                    to="/admin/postadverts"
                    className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 text-center inline-block"
                >
                    Post New Advert
                </Link>
            </div>
            <div className="bg-white rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-black-700 mb-4">All Uploaded Adverts</h2>
                    <div className="flex gap-4">
                        <button className="bg-gray-200 px-4 py-2 rounded-md text-gray-600">
                            Export As
                        </button>
                        <button className="bg-gray-200 px-4 py-2 rounded-md text-gray-600">
                            Sort: Newest First
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">

                <Table
                        headers={[
                            { key: 'title', label: 'Advert Name' },
                            { key: 'media_url', label: 'Advert Image', render: (value) => (
                                <span>
                                        <img src={value} alt="Advert" className="w-10 h-10 object-cover mx-auto" />
                                </span>
                            ), },
                            {
                                key: 'vendor', label: 'Vendor Name'
                            },
                            { key: 'sub_category', label: 'Advert Category' },
                            {
                                key: 'duration', label: 'Duration'
                            },
                            {
                                key: 'status', label: 'Status', render: (value) => (
                                    <span
                                    className={`py-2 px-4 rounded-md text-sm capitalize ${value === 'approved'
                                        ? 'bg-green-100 text-green-600'
                                        : 'bg-red-100 text-red-600'
                                        }`}
                                >
                                    {value}
                                </span>
                        )
                            }
                        ]}
                        data={data}
                        transformData={(data) =>
                            data.map((item) => ({
                                ...item,
                                vendor: 'Administrator',
                                sub_category: item.sub_category.name
                            }))
                        }
                        actions={[
                            {
                                label: (row) => {
                                    return 'Edit';
                                },
                                onClick: (row) => navigate(`edit/${row.id}`),
                            },
                            {
                                label: (row) => {
                                    return 'Delete';
                                },
                                onClick: (row) => handleDeleteModal(row.id),
                            },
                        ]}
                        currentPage={paginate.page}
                        totalPages={paginate.pages}
                        onPageChange={(page) => fetchNew(page)}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminAdverts;
