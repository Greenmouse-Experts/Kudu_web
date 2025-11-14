import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useGeoLocatorCurrency } from "../../../hooks/geoLocatorProduct";
import Loader from "../../../components/Loader";
import { formatNumberWithCommas } from "../../../helpers/helperFactory";
import { useNewFilters } from "../../../hooks/new_hooks";
import { useForm, Controller } from "react-hook-form";

const ProductListing = ({
  data,
  categories,
  pagination,
  onPageChange,
  subCategoriesArr,
  selectedCategory,
  isLoading,
}) => {
  const [subCategories, setSubCategories] = useState(subCategoriesArr || []);

  const currency = useGeoLocatorCurrency();
  const navigate = useNavigate();
  const { id } = useParams();

  const filters = useNewFilters();
  const capitalizeEachWord = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleSelectedSubId = (category) => {
    setSubCategories(category);
  };

  const handleNavigation = (id, name) => {
    navigate(`/products/categories/${id}/${name}`);
  };

  const initial_val = useEffect(() => {
    const defaults = JSON.parse(localStorage.getItem("filter_defaults"));
  }, []);

  const filter_form = useForm({
    defaultValues: {
      minPrice: initial_val?.minPrice || 0,
      maxPrice: initial_val?.maxPrice || 5000000,
    },
  });

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-(--breakpoint-xl) mx-auto">
      <aside className="lg:w-1/5 p-4 rounded-lg shadow-md bg-white mb-6 h-fit -mt-8 md:mt-0 lg:mb-0 lg:top-1">
        <h2 className="text-base font-semibold mb-4">Category</h2>
        {categories && categories.length > 0 && (
          <div>
            <ul>
              {[...categories]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category) => (
                  <li
                    key={category.id}
                    className="mb-4"
                    onClick={() => handleNavigation(category.id, category.name)}
                  >
                    <label
                      htmlFor={category.id}
                      className="text-base cursor-pointer w-full"
                    >
                      {category.name}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        )}
        {selectedCategory && <p className="text-base">{selectedCategory}</p>}

        {subCategories.length > 0 && (
          <div className="my-6">
            <h3 className="font-semibold mb-4">Sub Category</h3>
            <ul>
              {subCategories
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category) => (
                  <li key={category.id} className="mb-4">
                    <input
                      type="radio"
                      id={category.id}
                      name="subcategory"
                      onChange={() => handleSelectedSubId(category.name)}
                      checked={filters.setCategory === category.name}
                    />
                    <label htmlFor={category.id} className="ml-2">
                      {category.name}
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        )}

        <form
          onSubmit={filter_form.handleSubmit((data) => {
            console.log(data, filters.filters);
            filters.setFilters({
              minPrice: data.minPrice,
              maxPrice: data.maxPrice || 5000000,
            });
          })}
          className="mt-8"
        >
          <h3 className="font-semibold mb-4">Price ({currency[0].symbol}) </h3>

          <div className="w-full " data-theme="kudu">
            <input
              value={filter_form.watch("minPrice") || 0}
              onChange={(e) => filter_form.setValue("minPrice", e.target.value)}
              type="range"
              min={0}
              max={"5000000"}
              className="range w-full"
            />
            <div className="flex justify-between px-2.5 mt-2 text-xs">
              <span>|</span>
              <span>|</span>
            </div>
            <div className="flex justify-between px-2.5 mt-2 text-xs">
              <span>{filters.filters.min} </span>
              <span>5,000,000</span>
            </div>
          </div>
          <div className="mt-2 flex md:flex-col flex-col  justify-between gap-3 w-full">
            <div className="space-y-2 flex-1">
              <label htmlFor="" className="fieldset-label">
                Min Price
              </label>
            </div>
            <div className="space-y-2 flex-1">
              <label htmlFor="" className="fieldset-label">
                Max Price
              </label>
              <input
                {...filter_form.register("maxPrice")}
                type="number"
                id="title"
                placeholder="Max"
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-hidden placeholder-gray-400 text-sm mb-3"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3" data-theme="kudu">
            <button
              className="btn btn-primary  flex-1"
              type="submit"
              onClick={() => {
                // applyFilter;
              }}
            >
              APPLY
            </button>
            <Button
              type="button"
              onClick={() => {
                // clearFilter
              }}
              className="bg-white shadow-md border flex-1 text-black"
            >
              Clear
            </Button>
          </div>
        </form>
      </aside>

      <main className="lg:w-4/5 lg:pl-6 sm:pl-0">
        <div className="flex justify-between border items-center mb-6 bg-white p-5 rounded-md">
          <h1 className="text-xl font-bold">Products</h1>
        </div>

        {isLoading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <Loader />
          </div>
        ) : data.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.map((product) => {
                const isSoldOut = product.quantity === 0;
                const price = parseFloat(product?.price);
                const discountPrice = parseFloat(product?.discount_price);
                const currencySymbol = product?.store?.currency?.symbol || "₦";
                const hasValidDiscount =
                  discountPrice > 0 && discountPrice < price;

                const content = (
                  <div
                    key={product.id}
                    className={`bg-white shadow-lg p-1 border rounded-lg relative flex flex-col h-full ${
                      isSoldOut ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    <div className="flex justify-center relative h-[200px]">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                      {isSoldOut && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-md">
                          <span className="text-white font-semibold text-lg">
                            Sold Out
                          </span>
                        </div>
                      )}
                      <div className="absolute w-full mt-3">
                        <button
                          className={`absolute top-0 right-0 px-2 py-1 text-xs rounded font-medium text-white ${
                            product?.vendor?.isVerified || product.admin
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {product?.vendor?.isVerified || product.admin
                            ? "Verified"
                            : "Not Verified"}
                        </button>
                        <span
                          className={`absolute top-0 left-0 px-2 py-1 text-xs rounded font-medium text-white ${
                            product.condition === "brand_new"
                              ? "bg-[#34A853]"
                              : "bg-orange-500"
                          }`}
                        >
                          {capitalizeEachWord(
                            product.condition.replace(/_/g, " "),
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 flex flex-col justify-between grow">
                      <div>
                        <h3 className="text-base font-medium mt-1 leading-loose truncate whitespace-nowrap overflow-hidden w-full">
                          {product.name}
                        </h3>
                        {hasValidDiscount ? (
                          <div className="flex flex-col mt-2">
                            <p className="text-sm font-semibold leading-loose text-red-500 line-through">
                              {currencySymbol} {formatNumberWithCommas(price)}
                            </p>
                            <p className="text-sm font-semibold leading-loose">
                              {currencySymbol}{" "}
                              {formatNumberWithCommas(discountPrice)}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm font-semibold leading-loose">
                            {currencySymbol} {formatNumberWithCommas(price)}
                          </p>
                        )}
                        <div className="flex gap-2 mt-2">
                          <p className="text-sm text-kudu-roman-silver">
                            Qty Available: {product.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );

                return isSoldOut ? (
                  <div key={product.id} className="h-full">
                    {content}
                  </div>
                ) : (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className="h-full"
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
            <div className="flex justify-center mt-4 md:mt-10 space-x-4">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  onPageChange(pagination.page - 1);
                }}
                disabled={pagination.page === 1}
                className="px-4 py-2 bg-gray-200 rounded-sm disabled:opacity-50"
              >
                Previous
              </button>

              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  onPageChange(pagination.page + 1);
                }}
                disabled={pagination.page === pagination.total}
                className="px-4 py-2 bg-kudu-orange text-white rounded-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="w-full">
            <div className="empty-store">
              <div className="text-center">
                <img
                  src="https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736780988/Shopping_bag-bro_1_vp1yri.png"
                  alt="Empty Store Illustration"
                  className="w-80 h-80 mx-auto"
                />
              </div>
              <h1 className="text-center text-lg font-bold mb-4">
                No Product Found
              </h1>
              <div className="text-center text-black-100 mb-6 leading-loose text-sm">
                Oops! It looks like we don’t have products available in your
                region at the moment. <br></br>Please check back later or try
                browsing other categories.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductListing;
