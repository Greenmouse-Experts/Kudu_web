import React, { useState } from 'react';
import { useGetAllStoreQuery, useDeleteStoreMutation } from "../../../reducers/storeSlice"
import { dateFormat } from "../../../helpers/dateHelper";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from "react-toastify";
import AddNewProduct from './AddNewProduct';
import AddNewAuctionProduct from './AddNewAuctionProduct';
import CreateNewStore from './CreateNewStore';
import ProductTypeModal from './ProductTypeModal';


function Stores() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [storeId, setStoreId] = useState(null);
    const [delModal, setDelModal] = useState(false);
    const [addNewModal, setAddNewModal] = useState(false);
    const [addNewAuctionModal, setAddNewAuctionModal] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [xtates, setXtates] = useState([]);
    const [openAddNewProductOptionModal, setOpenAddNewProductOptionModal] = useState(null);
    const [editOrAddstore, setEditOrAddstore] = useState(null);
    const [deliveryOptions, setDeliveryOptions] = useState([]);

    const { data: stores, isLoading, isSuccess, isError, error } = useGetAllStoreQuery();
    const [deleteSto] = useDeleteStoreMutation();
    const {data} = useGetCurrenciesQuery();
    const {data: countri} = useGetCountriesQuery();
    const {data: categories} = useGetCategoriesQuery();

    useEffect(() => {
        if(data) setCurrencies(data)
        if(countri) setCountries(countri)
    }, [data, countri])

    useEffect(() => {
        var filteredCountry;
        if(selectedCountry !== null){
            filteredCountry = countries?.data?.filter((countryData) => (
                countryData.name ===  selectedCountry
            ))
        }
        
        filteredCountry && setXtates(filteredCountry[0].states)
    },[selectedCountry])

    const options = [
        'View/Edit',
        'Add Product',
        'Delete',
      ];

    const ITEM_HEIGHT = 30;

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    }; 

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setEditOrAddstore("add new")
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setDeliveryOptions([])
    };

    const handleAction = (option, id) => {
        setStoreId(id)
        option === "Delete" && setDelModal(true)
        option === "Add Product" && setOpenAddNewProductOptionModal(true)
        if(option === "View/Edit"){
            setIsModalOpen(true)
            setEditOrAddstore("edit")
        }
    }

    const openAddNewProductForm = () => {
        setAddNewModal(true)
        setOpenAddNewProductOptionModal(false)
    }

    const openAddNewAuctionProductForm = () => {
        setAddNewAuctionModal(true)
        setOpenAddNewProductOptionModal(false)
    }

    const handleCloseDelModal = () => {
        setDelModal(false)
    }

    const closeAddNewModal = () => {
        setAddNewModal(false)
        setAddNewAuctionModal(false)
    }

    const submitNewStore = (e) => {
        e.preventDefault()
    }

    const deleteStore = async () => {
        deleteSto(storeId)
        .then(res => {
            console.log(res)
            toast.success(res.data.message)
        }).catch(err => {
            console.log(err)
            toast.error(err)
        })
        setDelModal(false)
    }

    console.log(stores)

    return (
        <div className="bg-white rounded-lg w-full p-6">
            <h2 className="text-lg font-bold mb-2">My Store</h2>
            <div className="w-full h-[5px] mb-4 border" />
            {!stores ? (
                <div className="empty-store">
                    <div className="text-center">
                        <img
                            src="https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736780988/Shopping_bag-bro_1_vp1yri.png"
                            alt="Empty Store Illustration"
                            className="w-80 h-80 mx-auto"
                        />
                    </div>
                    <h1 className="text-center text-lg font-bold mb-4">Empty Store!</h1>
                    <div className="text-center text-black-100 mb-6 leading-loose text-sm">
                        Want to reach more customers? <br></br>Kudu lets you create and manage your own store.
                    </div>
                </div> 
            ):(
                <div className="overflow-x-auto mt-5">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className=" text-black-600 text-md font-medium">
                                <th className="py-6 px-4 text-left">#</th>
                                <th className="py-6 px-4 text-left">Store Name </th>
                                <th className="py-6 px-4 text-left">No. Product</th>
                                <th className="py-6 px-4 text-left">Date Created</th>
                                <th className="py-6 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stores.data.map((store, index) => (
                                <tr
                                    key={store.id}
                                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                        } text-gray-700 text-sm`}
                                >
                                    <td className="py-6 px-4 text-left">{index + 1}</td>
                                    <td className="py-6 px-4 text-left">{store.name}</td>
                                    <td className="py-6 px-4 text-left">{store.totalProducts}</td>
                                    <td className="py-6 px-4 text-left">{dateFormat(store.createdAt, "dd-MM-YYY")}</td>
                              
                                    <td className="py-3 px-4 text-left">
                                         <IconButton
                                            aria-label="more"
                                            id="long-button"
                                            aria-controls={open ? 'long-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="long-menu"
                                            MenuListProps={{
                                                'aria-labelledby': 'long-button',
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            slotProps={{
                                                paper: {
                                                    style: {
                                                        maxHeight: ITEM_HEIGHT * 4.5,
                                                        width: '10ch',
                                                        boxShadow: '0px 0px 4px rgba(126, 126, 126, 0.2)'
                                                    },
                                                },
                                            }}
                                        >
                                            {options.map((option) => (
                                                <MenuItem 
                                                    key={option} 
                                                    selected={option === 'Pyxis'} 
                                                    onClick={handleClose}
                                                    sx={{
                                                        fontSize: '10px',
                                                      }}
                                                >
                                                    <li onClick={() => handleAction(option, store.id, index, store.name)}>
                                                        {option}
                                                    </li>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <button
                className="bg-kuduOrange hover:bg-kuduDarkGrey text-white py-2 px-4 text-sm rounded block mx-auto"
                onClick={handleOpenModal}
            >
                Add New
            </button>

            {isModalOpen && (
                <CreateNewStore 
                    deliveryOptions={deliveryOptions}
                    setDeliveryOptions={setDeliveryOptions}
                    handleCloseModal={handleCloseModal} 
                    currencies={currencies}
                    countries={countries}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    xtates={xtates}
                    submitNewStore={submitNewStore}
                    editOrAddstore={editOrAddstore}
                    storeId={storeId}
                />
            )}

            {addNewModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-[100]">
                    <div className="bg-white rounded-lg w-11/12 h-[95%] max-w-screen-md overflow-y-auto scrollbar-none"> 
                        <AddNewProduct 
                            closeAddNewModal={closeAddNewModal} 
                            stores={stores}
                            categories={categories}
                        />
                    </div>
                </div>
            )}

            {addNewAuctionModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-[100]">
                    <div className="bg-white rounded-lg w-11/12 h-[95%] max-w-screen-md overflow-y-auto scrollbar-none"> 
                        <AddNewAuctionProduct
                            closeAddNewModal={closeAddNewModal} 
                            stores={stores}
                            categories={categories}
                        />
                    </div>
                </div>
            )}

            {delModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-[100]">
                    <div className="bg-white p-8 rounded-lg w-5/12 max-w-screen-md mx-auto">
                        <h1 className="text-center font-large">
                            Are you sure you want to delete this store
                        </h1>
                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-kuduDarkGrey hover:bg-gray-400 text-white text-sm py-2 px-4 rounded mr-2"
                                onClick={handleCloseDelModal}
                            >
                                Cancel
                            </button>
                            <button className="bg-kuduOrange hover:bg-kuduDarkGrey text-white text-sm py-2 px-4 rounded"
                                onClick={deleteStore}
                            >
                                Delete Store
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {openAddNewProductOptionModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-[100]">
                 <div className="bg-white p-8 rounded-lg w-5/12 max-w-screen-md mx-auto">
                    <ProductTypeModal 
                        openAddNewAuctionProductForm={openAddNewAuctionProductForm}
                        openAddNewProductForm={openAddNewProductForm}
                    />
                 </div>
             </div>
            )}
        </div>
    );
}

export default Stores;