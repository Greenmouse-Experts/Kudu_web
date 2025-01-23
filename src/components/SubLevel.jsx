import React from 'react';

const AdminEnd = ({ data }) => {
    return (
        <>
            <div className='All'>
                <div className="rounded-md pb-2 w-full gap-5">
                    <h2 className="text-lg font-semibold text-black-700 mb-4">Sub Admin</h2>
                </div>
                <div className="bg-white rounded-md p-6 w-full gap-5">
                    <h2 className="text-lg font-semibold text-black-700 mb-4">All Sub Admins</h2>
                    <div className="overflow-x-auto mt-5">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-black-600 text-md font-medium">
                                    <th className="py-6 px-4 text-left">#</th>
                                    <th className="py-6 px-4 text-left">Admin Name</th>
                                    <th className="py-6 px-4 text-left">Email</th>
                                    <th className="py-6 px-4 text-left">Phone Number</th>
                                    <th className="py-6 px-4 text-left">Date Joined</th>
                                    <th className="py-6 px-4 text-left">Status</th>
                                    <th className="py-6 px-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} text-gray-700 text-sm`}
                                    >
                                        <td className="py-6 px-4 text-left">{index + 1}</td>
                                        <td className="py-6 px-4 text-left">{user.firstName} {user.lastName}</td>
                                        <td className="py-6 px-4 text-left">{user.email}</td>
                                        <td className="py-6 px-4 text-left">{user.phone}</td>
                                        <td className="py-6 px-4 text-left">{dateFormat(user.createdAt, "dd-MM-YYY")}</td>
                                        <td className="py-6 px-4 text-left">
                                            <span
                                                className={`py-2 px-4 rounded-full text-sm capitalize ${user.status === 'active'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-red-100 text-red-600'}`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-left">
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="9" viewBox="0 0 32 9" fill="none">
                                                    {/* SVG paths */}
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminEnd;
