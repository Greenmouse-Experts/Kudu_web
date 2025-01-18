import React from 'react';
import useAppState from '../../../hooks/appState';

function AccountProfile() {
    const { user } = useAppState();

    return (
        <div className="bg-white rounded-lg">
            <h2 className="text-lg font-bold p-6">Profile</h2>
            <div className='w-full h-[1px] border' />

            <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-4">
                <div className="border rounded-lg">
                    <div className='flex justify-between p-4'>
                        <h3 className="text-lg font-semibold mb-2">Account Details</h3>
                    </div>
                    <div className='w-full h-[1px] -mt-3 border' />
                    <div className='flex flex-col gap-2 p-4'>
                        <p className='text-base font-semibold'>{user.firstName} {user.lastName}</p>
                        <p className='text-gray-500 font-[500]'>{user.email}</p>
                    </div>
                </div>

                <div className="border rounded-lg">
                    <div className='flex justify-between p-4'>
                        <h3 className="text-lg font-semibold mb-2">Address Book</h3>
                    </div>
                    <div className='w-full h-[1px] -mt-3 border' />
                    <div className='flex flex-col gap-2 p-4'>
                        <p className='text-base font-semibold'>Your default shipping address:</p>
                        <p className='text-gray-500 font-[500]'>No default shipping address available.</p>
                    </div>
                    <div className='p-4'>
                        <button className="text-sm text-kuduOrange font-semibold underline">ADD DEFAULT ADDRESS</button>
                    </div>
                </div>

                {user.accountType !== 'Customer' &&
                    <div className="border rounded-lg">
                        <div className='flex justify-between p-4'>
                            <h3 className="text-lg font-semibold mb-2">Subscription Plan</h3>
                        </div>
                        <div className='w-full h-[1px] -mt-3 border' />
                        <div className='flex flex-col gap-2 p-4'>
                            <p className='text-gray-500 font-[500]'>You are currently not subscribed to any of our plans.</p>
                        </div>
                        {/*<div className='p-4'>
                            <button className="text-sm text-kuduOrange uppercase font-semibold underline">Edit Newsletter Preferences</button>
                        </div>*/}
                    </div>
                }
            </div>
        </div>
    );
}

export default AccountProfile;