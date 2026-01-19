import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllStoreQuery,
  useGetCategoriesQuery,
  useDeleteProductMutation,
} from "../../../reducers/storeSlice";
import ProductTypeModal from "./ProductTypeModal";
import AddNewProduct from "./AddNewProduct";
import AddNewAuctionProduct from "./AddNewAuctionProduct";
import { toast } from "react-toastify";
import useApiMutation from "../../../api/hooks/useApiMutation";
import Loader from "../../../components/Loader";
import VendorMyProductsTable from "../../../components/VendorMyProductsTable";

const MyProducts = () => {
  const [openAddNewProductOptionModal, setOpenAddNewProductOptionModal] =
    useState(false);
  const [addNewModal, setAddNewModal] = useState(false);
  const [addNewAuctionModal, setAddNewAuctionModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [mergedProducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { mutate } = useApiMutation();

  const navigate = useNavigate();

  const { data: stores } = useGetAllStoreQuery({
    refetchOnMountOrArgChange: true,
  });
  const { data: categories } = useGetCategoriesQuery({
    refetchOnMountOrArgChange: true,
  });
  const [deleteProd] = useDeleteProductMutation();

  const handleOpenModal = () => {
    if (stores) {
      setOpenAddNewProductOptionModal(true);
    } else {
      toast.error("No stores found for this vendor");
    }
  };

  const openAddNewProductForm = () => {
    navigate("/profile/products/create");
    setOpenAddNewProductOptionModal(false);
  };

  const openAddNewAuctionProductForm = () => {
    navigate("/profile/auction-products/create");
    setOpenAddNewProductOptionModal(false);
  };

  const closeAddNewModal = () => {
    setAddNewModal(false);
    setAddNewAuctionModal(false);
  };

  const handleCloseDelModal = () => {
    setDelModal(false);
  };

  const openDelModal = (id) => {
    setProductId(id);
    setDelModal(true);
  };

  const deleteProduct = () => {
    deleteProd(productId)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
    setDelModal(false);
  };

  const handleEdit = (product) => {
    if (product.auctionStatus === "ongoing") {
      toast.error("Editing ongoing auction products is not permitted.");
      return;
    }
    navigate(
      product.auctionStatus
        ? `/profile/auction-products/edit/${product.id}`
        : `edit/${product.id}`,
    );
  };

  const getMyProducts = () => {
    mutate({
      url: `/vendor/vendors/products`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        getAuctionProducts(response.data.data);
      },
      onError: (error) => {
        // Handle 404 as empty state for products
        if (
          error.response?.status === 404 ||
          error.message?.includes("No products found")
        ) {
          console.log("No products found for vendor - showing empty state");
          getAuctionProducts([]);
        } else {
          console.error("Error fetching products:", error);
          setProducts([]);
          setLoading(false);
        }
      },
    });
  };

  const getAuctionProducts = (data) => {
    mutate({
      url: `/vendor/auction/products`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        const merged = [...(data || []), ...response.data.data];
        setProducts(merged);
        setLoading(false);
      },
      onError: (error) => {
        // Handle 404 as empty state for auction products
        if (
          error.response?.status === 404 ||
          error.message?.includes("No auction products found")
        ) {
          console.log("No auction products found for vendor");
          setProducts(data || []);
        } else {
          console.error("Error fetching auction products:", error);
          setProducts(data || []);
        }
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    getMyProducts();
  }, []);

  useEffect(() => {
    console.log(stores);
  }, [stores]);

  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <VendorMyProductsTable
          data={mergedProducts}
          loading={loading}
          onEdit={handleEdit}
          onDelete={openDelModal}
          onCreateProduct={handleOpenModal}
          hasStores={!!stores}
        />
      )}

      {addNewModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-100">
          <div className="bg-white rounded-lg w-11/12 md:w-3/5 h-[95%] max-w-(--breakpoint-md) overflow-y-auto scrollbar-none">
            <AddNewProduct
              closeAddNewModal={closeAddNewModal}
              stores={stores}
              categories={categories}
            />
          </div>
        </div>
      )}

      {addNewAuctionModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-100">
          <div className="bg-white rounded-lg w-11/12 h-[95%] max-w-(--breakpoint-md) overflow-y-auto scrollbar-none">
            <AddNewAuctionProduct
              closeAddNewModal={closeAddNewModal}
              stores={stores}
              categories={categories}
            />
          </div>
        </div>
      )}

      {openAddNewProductOptionModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-100">
          <div className="bg-white p-8 rounded-lg w-5/12 max-w-(--breakpoint-md) mx-auto">
            <ProductTypeModal
              openAddNewAuctionProductForm={openAddNewAuctionProductForm}
              openAddNewProductForm={openAddNewProductForm}
            />
          </div>
        </div>
      )}

      {delModal && (
        <div
          data-theme="kudu"
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-neutral/50 backdrop-blur-md  z-100"
        >
          <div className="bg-white p-8 rounded-lg w-5/12 max-w-(--breakpoint-md) mx-auto">
            <h1 className="text-center font-large">
              Are you sure you want to delete this product
            </h1>
            <div className="flex justify-center mt-4">
              <button
                className="bg-kudu-dark-grey hover:bg-gray-400 text-white text-sm py-2 px-4 rounded-sm mr-2"
                onClick={handleCloseDelModal}
              >
                Cancel
              </button>
              <button
                className="bg-kudu-orange hover:bg-kudu-dark-grey text-white text-sm py-2 px-4 rounded-sm"
                onClick={deleteProduct}
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProducts;
