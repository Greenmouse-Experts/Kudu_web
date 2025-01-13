import { useState } from 'react';

export default function UpdatedKYC() {
  const [formData, setFormData] = useState({
    storeName: '',
    cacRegistrationNumber: '',
    ninId: '',
    businessLocation: '',
    officeContactPhone: '',
    officeContactEmail: '',
    vatRates: '',
    state: '',
    currency: '',
    dateFormat: '',
    language: '',
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
    accountType: '',
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  return (
    <div className="bg-white rounded-lg w-full p-6">
      <h2 className="text-lg font-bold mb-2">Updated KYC</h2>
      <div className='w-full h-[5px] mb-4 border' />
      {/* Store Information */}
      <div className="mb-8">
        <h3 className="font-semibold text-black-500 mb-4">Store Information</h3>
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-sm font-medium mb-3">Store Name</label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              style={{ outline: "none", }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">CAC Registration Number</label>
            <input
              type="text"
              name="cacRegistrationNumber"
              value={formData.cacRegistrationNumber}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              style={{ outline: "none", }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">NIN ID</label>
            <input
              type="text"
              name="ninId"
              value={formData.ninId}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              style={{ outline: "none", }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">Business Location</label>
            <input
              type="text"
              name="businessLocation"
              value={formData.businessLocation}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              style={{ outline: "none", }}
            />
          </div>
          <div>
          <label className="block text-sm font-medium mb-3">VAT Rates</label>
            <input
              type="text"
              name="vatRates"
              value={formData.vatRates}
              style={{ outline: "none", }}
              className="border rounded p-2 w-full"
            />
          </div>
           {/* Upload Logo */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-3">Upload Your Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border rounded p-2 w-full"
            style={{ outline: "none", }}
          />
          {formData.logo && (
            <p className="text-sm text-gray-600 mt-2">Selected file: {formData.logo.name}</p>
          )}
        </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-8">
        <h3 className="font-semibold text-black-500 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-sm font-medium mb-3">Office Contact Phone</label>
            <input
              type="text"
              name="officeContactPhone"
              value={formData.officeContactPhone}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              style={{ outline: "none", }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">Office Contact Email</label>
            <input
              type="email"
              name="officeContactEmail"
              value={formData.officeContactEmail}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              style={{ outline: "none", }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
          <div>
            <label className="block text-sm font-medium mb-3">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              className="border rounded p-2 w-full"
              style={{ outline: "none", }}
            />
          </div>
        </div>
      </div>

      {/* Regional Information */}
      <div className="mb-6">
        <h3 className="font-semibold text-black-500 mb-4">Regional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-sm font-medium mb-3">Currency</label>
            <input
              type="text"
              name="currency"
              value={formData.currency}
              style={{ outline: "none", }}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">Date Format</label>
            <input
              type="text"
              name="dateFormat"
              value={formData.dateFormat}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              style={{ outline: "none", }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
        <div>
            <label className="block text-sm font-medium mb-3">Language</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              style={{ outline: "none", }}
              className="border rounded p-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* Bank Information */}
      <div className="mb-6">
        <h3 className="font-semibold text-black-500 mb-4">Bank Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <label className="block text-sm font-medium mb-3">Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              style={{ outline: "none", }}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-4">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              style={{ outline: "none", }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">Account Holder Name</label>
            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              style={{ outline: "none", }}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-3">Account Type</label>
            <input
              type="text"
              name="accountType"
              value={formData.accountType}
              style={{ outline: "none", }}
              className="border rounded p-2 w-full"
            />
          </div>
        </div>
      </div>

      <button className="bg-kuduOrange text-white py-2 px-6 rounded-lg">Submit</button>
    </div>
  );
}