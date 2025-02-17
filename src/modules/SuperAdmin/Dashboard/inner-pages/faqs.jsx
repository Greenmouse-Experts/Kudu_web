import React, { useEffect, useState } from "react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Loader from "../../../../components/Loader";
import { useGetFaqs } from "../../../../api/pages/faqs";
import FaqCategories from "../../../../components/inner-pages/faqs-category/FaqCategories";
import Faqs from "../../../../components/inner-pages/faqs/Faqs";

const App = () => {

  const { data:faqs, isLoading, refetch } = useGetFaqs();
  
  // const fetchData = async () => {
  //   try {
  //     const productRequest = new Promise((resolve, reject) => {
  //       mutate({
  //         url: '/admin/products',
  //         method: 'GET',
  //         headers: true,
  //         hideToast: true,
  //         onSuccess: (response) => resolve(response.data.data),
  //         onError: reject,
  //       });
  //     });

  //     const categoryRequest = new Promise((resolve, reject) => {
  //       mutate({
  //         url: '/admin/categories',
  //         method: 'GET',
  //         headers: true,
  //         hideToast: true,
  //         onSuccess: (response) => resolve(response.data.data),
  //         onError: reject,
  //       });
  //     });

  //     const [productsData, categories] = await Promise.all([
  //       productRequest,
  //       categoryRequest,
  //     ]);

  //     // Merge categories with products
  //     const mergedData = productsData.map((product) => {
  //       const category = categories.find(
  //         (cat) => cat.id === product.sub_category?.categoryId
  //       );
  //       return {
  //         ...product,
  //         category: category ? category.name : 'Unknown',
  //       };
  //     });

  //     setProducts(mergedData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []); // Only run once on mount

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <Faqs data={faqs} refetch={() => refetch()} />
      )}
    </div>
  );
};

export default App;
