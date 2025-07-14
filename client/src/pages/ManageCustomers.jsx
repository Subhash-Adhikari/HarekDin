import React, { useState } from "react";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([
    { id: 101, name: "Subash Adhikari", email: "subash@example.com" },
    { id: 102, name: "Sushant Pokhrel", email: "sushant@example.com" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Customers</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border border-gray-300">ID</th>
              <th className="p-3 border border-gray-300">Name</th>
              <th className="p-3 border border-gray-300">Email</th>
              <th className="p-3 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-t border-gray-300 hover:bg-gray-50 transition"
                >
                  <td className="p-3 border border-gray-300">{customer.id}</td>
                  <td className="p-3 border border-gray-300">{customer.name}</td>
                  <td className="p-3 border border-gray-300">{customer.email}</td>
                  <td className="p-3 border border-gray-300">
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="px-4 py-1 rounded text-white text-sm bg-red-600 hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-500 font-medium"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCustomers;
