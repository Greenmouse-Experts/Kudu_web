import React from 'react';

function AccountProfile() {
    return (
        <div className="bg-white rounded-lg shadow">
            <h2 className="text-lg font-bold p-6">Profile</h2>
            <div className='w-full h-[1px] border' />

            <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-4">
                <div className="border rounded-lg">
                    <div className='flex justify-between p-4'>
                        <h3 className="text-lg font-semibold mb-2">Account Details</h3>
                        <span className='mt-2'><svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 14.25V18H3.75L14.81 6.94L11.06 3.19L0 14.25ZM17.71 4.04C17.8027 3.94749 17.8762 3.8376 17.9264 3.71663C17.9766 3.59565 18.0024 3.46597 18.0024 3.335C18.0024 3.20403 17.9766 3.07435 17.9264 2.95338C17.8762 2.83241 17.8027 2.72252 17.71 2.63L15.37 0.290003C15.2775 0.197299 15.1676 0.123751 15.0466 0.07357C14.9257 0.0233886 14.796 -0.00244141 14.665 -0.00244141C14.534 -0.00244141 14.4043 0.0233886 14.2834 0.07357C14.1624 0.123751 14.0525 0.197299 13.96 0.290003L12.13 2.12L15.88 5.87L17.71 4.04Z" fill="#FF6F22" />
                        </svg></span>
                    </div>
                    <div className='w-full h-[1px] -mt-3 border' />
                    <div className='flex flex-col gap-2 p-4'>
                        <p className='text-base font-semibold'>Victor Dwaelo</p>
                        <p className='text-gray-500 font-[500]'>designer@greenmousetech.com</p>
                    </div>
                </div>

                <div className="border rounded-lg">
                    <div className='flex justify-between p-4'>
                        <h3 className="text-lg font-semibold mb-2">Address Book</h3>
                        <span className='mt-2'><svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 14.25V18H3.75L14.81 6.94L11.06 3.19L0 14.25ZM17.71 4.04C17.8027 3.94749 17.8762 3.8376 17.9264 3.71663C17.9766 3.59565 18.0024 3.46597 18.0024 3.335C18.0024 3.20403 17.9766 3.07435 17.9264 2.95338C17.8762 2.83241 17.8027 2.72252 17.71 2.63L15.37 0.290003C15.2775 0.197299 15.1676 0.123751 15.0466 0.07357C14.9257 0.0233886 14.796 -0.00244141 14.665 -0.00244141C14.534 -0.00244141 14.4043 0.0233886 14.2834 0.07357C14.1624 0.123751 14.0525 0.197299 13.96 0.290003L12.13 2.12L15.88 5.87L17.71 4.04Z" fill="#FF6F22" />
                        </svg></span>
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

                <div className="border rounded-lg">
                    <div className='flex justify-between p-4'>
                        <h3 className="text-lg font-semibold mb-2">Newsletter Preferences</h3>
                        <span className='mt-2'><svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 14.25V18H3.75L14.81 6.94L11.06 3.19L0 14.25ZM17.71 4.04C17.8027 3.94749 17.8762 3.8376 17.9264 3.71663C17.9766 3.59565 18.0024 3.46597 18.0024 3.335C18.0024 3.20403 17.9766 3.07435 17.9264 2.95338C17.8762 2.83241 17.8027 2.72252 17.71 2.63L15.37 0.290003C15.2775 0.197299 15.1676 0.123751 15.0466 0.07357C14.9257 0.0233886 14.796 -0.00244141 14.665 -0.00244141C14.534 -0.00244141 14.4043 0.0233886 14.2834 0.07357C14.1624 0.123751 14.0525 0.197299 13.96 0.290003L12.13 2.12L15.88 5.87L17.71 4.04Z" fill="#FF6F22" />
                        </svg></span>
                    </div>
                    <div className='w-full h-[1px] -mt-3 border' />
                    <div className='flex flex-col gap-2 p-4'>
                        <p className='text-gray-500 font-[500]'>You are currently not subscribed to any of our newsletters.</p>
                    </div>
                    <div className='p-4'>
                        <button className="text-sm text-kuduOrange uppercase font-semibold underline">Edit Newsletter Preferences</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountProfile;