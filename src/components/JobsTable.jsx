import React from "react";
import ReviewTable from "./ReviewTable";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const JobsTable = ({ 
  data, 
  onEdit, 
  onDelete, 
  onAdd,
  onDeactivate,
  onRepost,
  loading,
  searchQuery,
  onSearchChange,
  currentPage,
  totalPages,
  onPageChange,
  totalItems
}) => {
  const navigate = useNavigate();
  const columns = [
    { key: "title", label: "Job Title" },
    { key: "location", label: "Location" },
    { key: "type", label: "Type" },
    { key: "status", label: "Status" },
    { key: "description", label: "Description" }
  ];

  const renderRow = (item) => ({
    title: (
      <span className="text-sm font-semibold text-gray-900">
        {item.title}
      </span>
    ),
    location: (
      <div className="flex items-center gap-2 text-sm text-orange-500">
        <FaMapMarkerAlt size={12} />
        <span>{item.location}</span>
      </div>
    ),
    type: (
      <div className="flex items-center gap-2 text-sm text-blue-500">
        <FaClock size={12} />
        <span>{item.jobType}</span>
      </div>
    ),
    status: (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        item.status === "active" 
          ? "bg-green-100 text-green-800" 
          : "bg-red-100 text-red-800"
      }`}>
        {item.status}
      </span>
    ),
    description: (
      <div className="max-w-sm">
        <div 
          className="text-sm text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: item?.description?.slice(0, 150) + "..." || "" }}
        />
      </div>
    )
  });

  const actions = [
    {
      label: () => "Edit",
      onClick: (row) => onEdit(row),
    },
    {
      label: () => "Delete", 
      onClick: (row) => onDelete(row.id),
    },
    {
      label: (row) => row.status === "active" ? "Close Job" : "Repost Job",
      onClick: (row) => row.status === "active" ? onDeactivate(row.id) : onRepost(row.id),
    },
    {
      label: () => "View Applicants",
      onClick: (row) => navigate(`applicants/${row.id}`),
    }
  ];

  const exportData = data?.map(item => ({
    Title: item.title || "",
    Location: item.location || "",
    "Job Type": item.jobType || "",
    Status: item.status || "",
    Description: item.description?.replace(/<[^>]*>/g, "") || "", // Strip HTML for export
    "Created At": new Date(item?.createdAt).toLocaleDateString()
  }));

  return (
    <ReviewTable
      columns={columns}
      data={data}
      renderRow={renderRow}
      actions={actions}
      loading={loading}
      disableInternalSearch={true}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search jobs..."
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      totalItems={totalItems}
      exportData={exportData}
      exportFilename="jobs"
      title="Job List"
      onAdd={onAdd}
      addButtonText="Add Job"
    />
  );
};

export default JobsTable;
