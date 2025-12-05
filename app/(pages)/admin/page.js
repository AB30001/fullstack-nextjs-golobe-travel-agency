"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Search, LogOut, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [tours, setTours] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [searchQuery, setSearchQuery] = useState("");
  const [toursLoading, setToursLoading] = useState(false);
  
  const [productCodesToAdd, setProductCodesToAdd] = useState("");
  const [productCodesToDelete, setProductCodesToDelete] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionResult, setActionResult] = useState(null);

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("adminAuth");
    if (savedAuth) {
      setIsAuthenticated(true);
      setPassword(savedAuth);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTours();
    }
  }, [isAuthenticated, pagination.page, searchQuery]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("adminAuth", password);
      } else {
        setAuthError(data.error || "Invalid password");
      }
    } catch (error) {
      setAuthError("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    sessionStorage.removeItem("adminAuth");
    setTours([]);
  };

  const fetchTours = async () => {
    setToursLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: "50",
        search: searchQuery,
      });

      const res = await fetch(`/api/admin/tours?${params}`, {
        headers: { "x-admin-password": password },
      });

      const data = await res.json();

      if (data.success) {
        setTours(data.tours);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setToursLoading(false);
    }
  };

  const handleAddTours = async () => {
    if (!productCodesToAdd.trim()) return;

    setActionLoading(true);
    setActionResult(null);

    const codes = productCodesToAdd
      .split(/[\n,\s]+/)
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    try {
      const res = await fetch("/api/admin/tours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ productCodes: codes }),
      });

      const data = await res.json();
      setActionResult({
        type: "add",
        success: data.success,
        message: data.message,
        results: data.results,
      });

      if (data.success) {
        setProductCodesToAdd("");
        fetchTours();
      }
    } catch (error) {
      setActionResult({
        type: "add",
        success: false,
        message: "Failed to add tours",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTours = async () => {
    if (!productCodesToDelete.trim()) return;

    setActionLoading(true);
    setActionResult(null);

    const codes = productCodesToDelete
      .split(/[\n,\s]+/)
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    try {
      const res = await fetch("/api/admin/tours", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ productCodes: codes }),
      });

      const data = await res.json();
      setActionResult({
        type: "delete",
        success: data.success,
        message: data.message,
        results: data.results,
      });

      if (data.success) {
        setProductCodesToDelete("");
        fetchTours();
      }
    } catch (error) {
      setActionResult({
        type: "delete",
        success: false,
        message: "Failed to delete tours",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteSingle = async (productCode) => {
    if (!confirm(`Delete tour with code ${productCode}?`)) return;

    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/tours", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ productCodes: [productCode] }),
      });

      const data = await res.json();
      if (data.success) {
        fetchTours();
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
    } finally {
      setActionLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
            </div>
            {authError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {authError}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Tour Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5 text-green-600" />
              Add Tours by Product Code
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter Viator product codes (e.g., 424330P3, 399370P3). 
              Separate multiple codes with commas, spaces, or new lines.
            </p>
            <textarea
              value={productCodesToAdd}
              onChange={(e) => setProductCodesToAdd(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-32 font-mono text-sm"
              placeholder="424330P3&#10;399370P3&#10;5260P10"
            />
            <button
              onClick={handleAddTours}
              disabled={actionLoading || !productCodesToAdd.trim()}
              className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {actionLoading ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
              Add Tours from Viator
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              Delete Tours by Product Code
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter product codes to remove from database.
              Separate multiple codes with commas, spaces, or new lines.
            </p>
            <textarea
              value={productCodesToDelete}
              onChange={(e) => setProductCodesToDelete(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent h-32 font-mono text-sm"
              placeholder="424330P3&#10;399370P3"
            />
            <button
              onClick={handleDeleteTours}
              disabled={actionLoading || !productCodesToDelete.trim()}
              className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {actionLoading ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : (
                <Trash2 className="h-5 w-5" />
              )}
              Delete Tours
            </button>
          </div>
        </div>

        {actionResult && (
          <div
            className={`mb-8 p-4 rounded-lg ${
              actionResult.success
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-start gap-3">
              {actionResult.success ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`font-medium ${actionResult.success ? "text-green-800" : "text-red-800"}`}>
                  {actionResult.message}
                </p>
                {actionResult.results && (
                  <div className="mt-2 text-sm">
                    {actionResult.results.added?.length > 0 && (
                      <div className="text-green-700">
                        <strong>Added:</strong>{" "}
                        {actionResult.results.added.map((t) => t.productCode).join(", ")}
                      </div>
                    )}
                    {actionResult.results.deleted?.length > 0 && (
                      <div className="text-green-700">
                        <strong>Deleted:</strong>{" "}
                        {actionResult.results.deleted.map((t) => t.productCode).join(", ")}
                      </div>
                    )}
                    {actionResult.results.skipped?.length > 0 && (
                      <div className="text-yellow-700">
                        <strong>Skipped:</strong>{" "}
                        {actionResult.results.skipped.map((t) => `${t.productCode} (${t.reason})`).join(", ")}
                      </div>
                    )}
                    {actionResult.results.failed?.length > 0 && (
                      <div className="text-red-700">
                        <strong>Failed:</strong>{" "}
                        {actionResult.results.failed.map((t) => `${t.productCode} (${t.reason})`).join(", ")}
                      </div>
                    )}
                    {actionResult.results.notFound?.length > 0 && (
                      <div className="text-yellow-700">
                        <strong>Not Found:</strong>{" "}
                        {actionResult.results.notFound.map((t) => t.productCode).join(", ")}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-lg font-semibold">
              All Tours ({pagination.total})
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPagination((p) => ({ ...p, page: 1 }));
                  }}
                  placeholder="Search tours..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={fetchTours}
                disabled={toursLoading}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <RefreshCw className={`h-5 w-5 ${toursLoading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tour
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Country
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {toursLoading ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                      Loading tours...
                    </td>
                  </tr>
                ) : tours.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      No tours found
                    </td>
                  </tr>
                ) : (
                  tours.map((tour) => (
                    <tr key={tour._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {tour.coverImage && (
                            <img
                              src={tour.coverImage}
                              alt=""
                              className="h-10 w-10 rounded object-cover"
                            />
                          )}
                          <div className="max-w-xs">
                            <div className="font-medium text-gray-900 truncate">
                              {tour.title}
                            </div>
                            <div className="text-xs text-gray-500">{tour.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {tour.productCode}
                        </code>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {tour.country}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {tour.rating > 0 ? `${tour.rating.toFixed(1)} (${tour.reviews})` : "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        ${tour.price}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDeleteSingle(tour.productCode)}
                          disabled={actionLoading}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                          title="Delete tour"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {pagination.page} of {pagination.totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPagination((p) => ({ ...p, page: p.page - 1 }))}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
                  disabled={pagination.page >= pagination.totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
