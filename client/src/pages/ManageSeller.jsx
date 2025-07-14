import React, { useState } from "react";

const ManageSellers = () => {
  const [sellers, setSellers] = useState([
    { id: 1, name: "Seller A", status: "Pending" },
    { id: 2, name: "Seller B", status: "Approved" },
  ]);

  const handleApprove = (id) => {
    if (window.confirm("Approve this seller?")) {
      setSellers((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, status: "Approved" } : s
        )
      );
    }
  };

  const handleBlock = (id) => {
    if (window.confirm("Block this seller?")) {
      setSellers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-semibold ";
    if (status === "Approved") return base + "bg-green-200 text-green-800";
    if (status === "Pending") return base + "bg-yellow-200 text-yellow-800";
    return base + "bg-gray-200 text-gray-700";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Sellers</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border border-gray-300">ID</th>
              <th className="p-3 border border-gray-300">Name</th>
              <th className="p-3 border border-gray-300">Status</th>
              <th className="p-3 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr
                key={seller.id}
                className="border-t border-gray-300 hover:bg-gray-50 transition"
              >
                <td className="p-3 border border-gray-300">{seller.id}</td>
                <td className="p-3 border border-gray-300">{seller.name}</td>
                <td className="p-3 border border-gray-300">
                  <span className={getStatusBadge(seller.status)}>
                    {seller.status}
                  </span>
                </td>
                <td className="p-3 border border-gray-300 flex gap-3">
                  <button
                    disabled={seller.status === "Approved"}
                    onClick={() => handleApprove(seller.id)}
                    className={`px-4 py-1 rounded text-white text-sm ${
                      seller.status === "Approved"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    } transition`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleBlock(seller.id)}
                    className="px-4 py-1 rounded text-white text-sm bg-red-600 hover:bg-red-700 transition"
                  >
                    Block
                  </button>
                </td>
              </tr>
            ))}
            {sellers.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-500 font-medium"
                >
                  No sellers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSellers;
