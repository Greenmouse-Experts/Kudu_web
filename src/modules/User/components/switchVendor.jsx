import { useDispatch } from 'react-redux';
import { Button } from '@material-tailwind/react';
import { useModal } from '../../../hooks/modal';

const SwitchVendorModal = ({children}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    return (
        <>
            <div className="w-full flex h-auto flex-col px-3 py-6 gap-3 -mt-3">
                <div className="flex gap-5 justify-center w-full">
                    <p className="font-semibold text-center text-lg">
                        Switch to Vendor Mode?
                    </p>
                </div>
                {children}
                <div className="flex justify-center mt-5 gap-4">
                    <Button
                        className="bg-red-500 text-white outline-none px-4 py-2 rounded-full"
                    >
                        Yes, Switch to Vendor
                    </Button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 text-black px-4 py-2 rounded-full"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default SwitchVendorModal;