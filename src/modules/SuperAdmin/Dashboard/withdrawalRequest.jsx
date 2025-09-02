import React from "react";
import useApiMutation from "../../../api/hooks/useApiMutation";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../../components/Loader";
import { dateFormat } from "../../../helpers/dateHelper";
import Table from "../../../components/ReviewTable";
import { useModal } from "../../../hooks/modal";
import DropZone from "../../../components/DropZone";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../api/apiFactory";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

const WithdrawalRequest = () => {
  const { mutate } = useApiMutation();

  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const { openModal, closeModal } = useModal();
  const status_mutate = useMutation({
    mutationFn: async (data) => {
      let resp = await apiClient.post("/admin/withdrawal/update/status", {
        ...data,
      });
    },
    onSuccess: () => {
      getRequests();
      closeModal();
      toast.success("Status updated successfully");
    },
  });
  const getRequests = () => {
    mutate({
      url: `/admin/withdrawals`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setWithdrawals(response.data.data);
        setIsLoading(false);
      },
      onError: () => {},
    });
  };

  useEffect(() => {
    getRequests();
  }, []);
  const handleDeclineModal = (bank) => {
    openModal({
      size: "md",
      content: (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let formData = new FormData(e.target);
              let note = formData.get("note");
              if (!note) {
                toast.error("Please enter a reason for decline");
                return;
              }
              let data = {
                id: bank.id,
                status: "declined",
                note,
              };
              status_mutate.mutate(data);
            }}
          >
            <h2 className="text-xl font-bold my-2">Reason for Decline</h2>
            <textarea
              className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm border border-gray-300"
              placeholder="Enter reason for decline"
              rows="4"
              id="note"
              name="note"
              onChange={(e) => {
                // You can store the reason in a state variable here
                // For example: setDeclineReason(e.target.value);
              }}
            ></textarea>
            <div className="flex w-full">
              <button
                disabled={status_mutate.isPending}
                className="ml-auto bg-kudu-orange text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Decline Request
              </button>
            </div>
          </form>
        </>
      ),
    });
  };
  const handleSubMitModal = (bank) => {
    openModal({
      size: "md",
      content: (
        <>
          <div>
            <h2 className="text-xl font-bold my-2">Upload Receipt</h2>
            {/* {JSON.stringify(bank)}*/}
            <div>
              <DropZone
                text={"Upload Receipt"}
                onUpload={(e) => {
                  console.log(e[0]);
                  let data = {
                    id: bank.id,
                    paymentReceipt: e[0],
                    status: "accepted",
                  };
                  status_mutate.mutateAsync(data);
                }}
              />
            </div>
            <div></div>
          </div>
        </>
      ),
    });
  };
  const handleViewModal = (bank) => {
    openModal({
      size: "md",
      content: (
        <>
          <div className="grid grid-cols-2 gap-1 px-4">
            <div className="">
              <label className="block text-sm font-medium mt-4">
                Bank Name
              </label>
              <div className="w-full p-2 rounded-lg focus:outline-hidden placeholder-gray-400 text-sm mb-1">
                {bank.bankInfo.bankName}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-medium mt-4">
                Account Number
              </label>
              <div className="w-full p-2 rounded-lg focus:outline-hidden placeholder-gray-400 text-sm mb-1">
                {bank.bankInfo.accountNumber}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-medium mt-4">
                Account Name
              </label>
              <div className="w-full p-2 rounded-lg focus:outline-hidden placeholder-gray-400 text-sm mb-1">
                {bank.bankInfo.accountName}
              </div>
            </div>
            <div className="">
              <label className="block text-sm font-medium mt-4">
                Swift Code
              </label>
              <div className="w-full p-2 rounded-lg focus:outline-hidden placeholder-gray-400 text-sm mb-1">
                {bank.bankInfo.swiftCode || "---"}
              </div>
            </div>

            <div className="">
              <label className="block text-sm font-medium mt-4">
                Routing Number
              </label>
              <div className="w-full p-2 rounded-lg focus:outline-hidden placeholder-gray-400 text-sm mb-1">
                {bank.bankInfo.routingNumber || "---"}
              </div>
            </div>

            <div className="">
              <label className="block text-sm font-medium mt-4">
                Bank Address
              </label>
              <div className="w-full p-2 rounded-lg focus:outline-hidden placeholder-gray-400 text-sm mb-1">
                {bank.bankInfo.bankAddress}
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full mt-5 gap-4">
            <button
              onClick={closeModal}
              className="bg-gray-300 text-black px-4 py-2 font-medium rounded-lg"
            >
              Cancel
            </button>
          </div>
        </>
      ),
    });
  };

  const parseBankInfo = (bankInfo) => {
    const params = bankInfo.split("?").reduce((acc, param) => {
      const [key, value] = param.split("=");
      if (key && value) acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
    return params;
  };

  return (
    <div className="min-h-screen">
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="rounded-md pb-2 w-full gap-5">
            <h2 className="text-lg font-semibold text-black-700 mb-4">
              Withdrawal Request
            </h2>
          </div>
          <div className="bg-white rounded-md p-6 w-full gap-5">
            <h2 className="text-lg font-semibold text-black-700">
              Withdrawal Request
            </h2>
            <div className="overflow-x-auto">
              <Table
                columns={[
                  { key: "name", label: "Name" },
                  { key: "amount", label: "Amount" },
                  { key: "currency", label: "Currency" },
                  {
                    key: "createdAt",
                    label: "Created On",
                    render: (value) => <>{dateFormat(value, "dd MMM yyyy")}</>,
                  },
                  {
                    key: "status",
                    label: "Status",
                    render: (value) => (
                      <span
                        className={`py-1 px-3 rounded-full text-sm capitalize ${
                          value === "accepted"
                            ? "bg-green-100 text-green-600"
                            : value == "declined"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {value == "accepted" ? "paid" : value}
                      </span>
                    ),
                  },
                ]}
                allData={withdrawals.map((item) => ({
                  ...item,
                  name: `${item.vendor.firstName} ${item.vendor.lastName}`,
                  bankInfo: parseBankInfo(item.bankInformation.bankInfo),
                }))}
                data={withdrawals.map((item) => ({
                  ...item,
                  name: `${item.vendor.firstName} ${item.vendor.lastName}`,
                  bankInfo: parseBankInfo(item.bankInformation.bankInfo),
                }))}
                exportData
                actions={[
                  {
                    label: (row) => {
                      return "View Bank Details";
                    },
                    onClick: (row) => handleViewModal(row),
                  },
                  {
                    label: (row) => {
                      return row.status != "accepted" ? "Update Status" : null;
                    },
                    onClick: (row) => handleSubMitModal(row),
                  },
                  {
                    label: (row) => {
                      return row.status != "declined" &&
                        row.status != "accepted"
                        ? "Decline"
                        : null;
                    },
                    onClick: (row) => handleDeclineModal(row),
                  },
                ]}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WithdrawalRequest;
