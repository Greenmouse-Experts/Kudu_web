import React, { useState, useMemo } from 'react';
import { dateFormat } from '../helpers/dateHelper';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { formatNumberWithCommas } from '../helpers/helperFactory';
import { useDebounce } from '../hooks/useDebounce';
import DeleteModal from './DeleteModal';
import { useModal } from '../hooks/modal';
import ReviewTable from './ReviewTable';

const SubscriptionTable = ({ data, refetch, loading }) => {
    const navigate = useNavigate();
    const { openModal } = useModal();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // Filter data based on search query
    const filteredData = useMemo(() => {
        if (!data) return [];
        
        if (!debouncedSearchQuery.trim()) {
            return data;
        }

        const query = debouncedSearchQuery.toLowerCase();
        return data.filter(item => 
            item?.name?.toLowerCase().includes(query) ||
            item?.currency?.symbol?.toLowerCase().includes(query) ||
            item?.price?.toString().includes(query)
        );
    }, [data, debouncedSearchQuery]);

    // Paginate filtered data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Reset to page 1 when search query changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchQuery]);

    const handleRedirect = () => {
        refetch();
    };

    const handleDeleteModal = (id) => {
        openModal({
            size: "sm",
            content: <DeleteModal title={'Do you wish to delete this subscription?'} redirect={handleRedirect}
                api={`/admin/subscription/plan/delete?planId=${id}`} />
        })
    }

    const handleSearchChange = (value) => {
        setSearchQuery(value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const columns = [
        { key: "name", label: "Plan Name" },
        { key: "userType", label: "User Type" },
        { key: "price", label: "Plan Price" },
        { key: "duration", label: "Plan Validity" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Actions" }
    ];

    const renderRow = (item) => ({
        name: (
            <span className="text-sm font-semibold text-gray-900">
                {item.name}
            </span>
        ),
        userType: (
            <span className="text-sm text-gray-600">
                Vendors
            </span>
        ),
        price: (
            <span className="text-sm text-gray-900">
                {item.currency ? item.currency.symbol : '₦'} {formatNumberWithCommas(item.price)}
            </span>
        ),
        duration: (
            <span className="text-sm text-gray-600">
                {item.duration} month(s)
            </span>
        ),
        status: (
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600">
                Active
            </span>
        ),
        actions: (
            <Menu placement="left">
                <MenuHandler>
                    <button className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="5" viewBox="0 0 32 9" fill="none">
                            <path d="M4.65341 7.26989C3.87689 7.26989 3.20928 6.99527 2.65057 6.44602C2.09186 5.88731 1.8125 5.21496 1.8125 4.42898C1.8125 3.65246 2.09186 2.98958 2.65057 2.44034C3.20928 1.88163 3.87689 1.60227 4.65341 1.60227C5.42992 1.60227 6.09754 1.88163 6.65625 2.44034C7.21496 2.98958 7.49432 3.65246 7.49432 4.42898C7.49432 4.94981 7.36174 5.42803 7.09659 5.86364C6.84091 6.28977 6.5 6.63068 6.07386 6.88636C5.64773 7.14205 5.17424 7.26989 4.65341 7.26989ZM15.9815 7.26989C15.205 7.26989 14.5374 6.99527 13.9787 6.44602C13.42 5.88731 13.1406 5.21496 13.1406 4.42898C13.1406 3.65246 13.42 2.98958 13.9787 2.44034C14.5374 1.88163 15.205 1.60227 15.9815 1.60227C16.758 1.60227 17.4257 1.88163 17.9844 2.44034C18.5431 2.98958 18.8224 3.65246 18.8224 4.42898C18.8224 4.94981 18.6899 5.42803 18.4247 5.86364C18.169 6.28977 17.8281 6.63068 17.402 6.88636C16.9759 7.14205 16.5024 7.26989 15.9815 7.26989ZM27.3097 7.26989C26.5331 7.26989 25.8655 6.99527 25.3068 6.44602C24.7481 5.88731 24.4688 5.21496 24.4688 4.42898C24.4688 3.65246 24.7481 2.98958 25.3068 2.44034C25.8655 1.88163 26.5331 1.60227 27.3097 1.60227C28.0862 1.60227 28.7538 1.88163 29.3125 2.44034C29.8712 2.98958 30.1506 3.65246 30.1506 4.42898C30.1506 4.94981 30.018 5.42803 29.7528 5.86364C29.4972 6.28977 29.1562 6.63068 28.7301 6.88636C28.304 7.14205 27.8305 7.26989 27.3097 7.26989Z" fill="#2D1967" />
                        </svg>
                    </button>
                </MenuHandler>
                <MenuList>
                    <MenuItem className="flex flex-col gap-3">
                        <span className="cursor-pointer w-full" onClick={() => navigate(`edit/${item.name}`)}>
                            Edit
                        </span>
                    </MenuItem>
                    <MenuItem className="flex flex-col gap-3">
                        <span className="cursor-pointer" onClick={() => handleDeleteModal(item.id)}>
                            Delete
                        </span>
                    </MenuItem>
                </MenuList>
            </Menu>
        )
    });

    const exportData = data?.map(item => ({
        "Plan Name": item.name || "",
        "User Type": "Vendors",
        "Plan Price": `${item.currency ? item.currency.symbol : '₦'} ${formatNumberWithCommas(item.price)}`,
        "Plan Validity": `${item.duration} month(s)`,
        Status: "Active",
        "Created At": new Date(item?.createdAt).toLocaleDateString()
    }));

    return (
        <div className="min-h-screen p-6">
            <ReviewTable
                columns={columns}
                data={paginatedData}
                renderRow={renderRow}
                loading={loading}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search subscriptions..."
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={filteredData.length}
                exportData={exportData}
                exportFilename="subscriptions"
                title="All Subscription Plans"
                onAdd={() => navigate('create')}
                addButtonText="Add New Subscription"
            />
        </div>
    );
  }, [data, debouncedSearchQuery]);

  // Paginate filtered data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Reset to page 1 when search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  const handleRedirect = () => {
    refetch();
  };

  const handleDeleteModal = (id) => {
    openModal({
      size: "sm",
      content: (
        <DeleteModal
          title={"Do you wish to delete this subscription?"}
          redirect={handleRedirect}
          api={`/admin/subscription/plan/delete?planId=${id}`}
        />
      ),
    });
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    { key: "name", label: "Plan Name" },
    { key: "maxAds", label: "Max Ads" },
    { key: "productLimit", label: "Product Limit" },
    // { key: "allowsServiceAds", label: "Allows Ads" },
    { key: "price", label: "Plan Price" },
    { key: "duration", label: "Plan Validity" },
    { key: "serviceAdsLimit", label: "Service Ads Limit" },
    { key: "currency", label: "currency" },
  ];

  const renderRow = (item) => ({
    name: (
      <span className="text-sm font-semibold text-gray-900">{item.name}</span>
    ),
    currenc: (
      <span className="text-sm font-semibold text-gray-900">{item.name}</span>
    ),
    userType: <span className="text-sm text-gray-600">Vendors</span>,
    price: (
      <span className="text-sm text-gray-900">
        {item.currency ? item.currency.symbol : "₦"}{" "}
        {formatNumberWithCommas(item.price)}
      </span>
    ),
    allowsServiceAds: <span className="text-sm text-gray-600">"ues"</span>,
    duration: (
      <span className="text-sm text-gray-600">{item.duration} month(s)</span>
    ),
    status: (
      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600">
        Active
      </span>
    ),
  });

  const exportData = data?.map((item) => ({
    "Plan Name": item.name || "",
    "User Type": "Vendors",
    "Plan Price": `${item.currency ? item.currency.symbol : "₦"} ${formatNumberWithCommas(item.price)}`,
    "Plan Validity": `${item.duration} month(s)`,
    Status: "Active",
    "Created At": new Date(item?.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="min-h-screen p-6">
      <ReviewTable
        columns={columns}
        data={paginatedData}
        renderRow={renderRow}
        loading={loading}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search subscriptions..."
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={filteredData.length}
        exportData={exportData}
        exportFilename="subscriptions"
        title="All Subscription Plans"
        onAdd={() => navigate("create")}
        addButtonText="Add New Subscription"
        actions={[
          {
            label: (row) => {
              return "Edit";
            },
            onClick: (row) => navigate(`edit/${row.name}`),
          },
          {
            label: (row) => {
              return "Delete";
            },
            onClick: (row) => handleDeleteModal(row.id),
          },
        ]}
      />
    </div>
  );
};

export default SubscriptionTable;
