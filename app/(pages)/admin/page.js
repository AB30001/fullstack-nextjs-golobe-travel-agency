"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Search, LogOut, RefreshCw, AlertCircle, CheckCircle, ArrowUpDown, Copy, Check } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [tours, setTours] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [searchQuery, setSearchQuery] = useState("");
  const [toursLoading, setToursLoading] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedCountry, setSelectedCountry] = useState("");
  
  const [productCodesToAdd, setProductCodesToAdd] = useState("");
  const [productCodesToDelete, setProductCodesToDelete] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionResult, setActionResult] = useState(null);
  const [refreshProgress, setRefreshProgress] = useState({ current: 0, total: 0, inProgress: false });
  
  const [selectedTours, setSelectedTours] = useState(new Set());
  const [copiedCode, setCopiedCode] = useState(null);

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
  }, [isAuthenticated, pagination.page, searchQuery, sortBy, sortOrder, selectedCountry]);

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

  const handleSelectTour = (productCode) => {
    const newSelected = new Set(selectedTours);
    if (newSelected.has(productCode)) {
      newSelected.delete(productCode);
    } else {
      newSelected.add(productCode);
    }
    setSelectedTours(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedTours.size === tours.length && tours.length > 0) {
      setSelectedTours(new Set());
    } else {
      setSelectedTours(new Set(tours.map(t => t.productCode)));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedTours.size === 0) return;

    const message = `Delete ${selectedTours.size} selected tour${selectedTours.size > 1 ? 's' : ''}?`;
    if (!confirm(message)) return;

    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/tours", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ productCodes: Array.from(selectedTours) }),
      });

      const data = await res.json();
      setActionResult({
        type: "delete",
        success: data.success,
        message: data.message,
        results: data.results,
      });

      if (data.success) {
        setSelectedTours(new Set());
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

  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const fetchTours = async () => {
    setToursLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: "50",
        search: searchQuery,
        sortBy: sortBy,
        sortOrder: sortOrder,
      });

      if (selectedCountry) {
        params.append('country', selectedCountry);
      }

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

  const handleRefreshAllTours = async () => {
    if (!confirm(`Refresh all ${pagination.total} tours from Viator? This will take several minutes.`)) return;

    setActionLoading(true);
    setActionResult(null);
    
    // First, get all tour product codes
    const allTours = [];
    let page = 1;
    let hasMore = true;
    
    try {
      // Fetch all tour codes first
      while (hasMore) {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "100",
          search: "",
          sortBy: "createdAt",
          sortOrder: "desc",
        });
        
        const res = await fetch(`/api/admin/tours?${params}`, {
          headers: { "x-admin-password": password },
        });
        
        const data = await res.json();
        if (data.success && data.tours.length > 0) {
          allTours.push(...data.tours.map(t => t.productCode));
          page++;
          hasMore = data.tours.length === 100;
        } else {
          hasMore = false;
        }
      }
      
      const total = allTours.length;
      setRefreshProgress({ current: 0, total, inProgress: true });
      
      const results = {
        updated: [],
        failed: [],
        removed: []
      };
      
      // Refresh tours in batches of 5
      const batchSize = 5;
      for (let i = 0; i < allTours.length; i += batchSize) {
        const batch = allTours.slice(i, i + batchSize);
        
        const res = await fetch("/api/admin/tours", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-admin-password": password,
          },
          body: JSON.stringify({ productCodes: batch }),
        });
        
        const data = await res.json();
        if (data.results) {
          if (data.results.updated) results.updated.push(...data.results.updated);
          if (data.results.failed) results.failed.push(...data.results.failed);
          if (data.results.removed) results.removed.push(...data.results.removed);
        }
        
        setRefreshProgress({ current: Math.min(i + batchSize, total), total, inProgress: true });
      }
      
      setRefreshProgress({ current: total, total, inProgress: false });
      setActionResult({
        type: "refresh",
        success: true,
        message: `Updated ${results.updated.length} tours, ${results.removed.length} removed, ${results.failed.length} failed`,
        results,
      });
      
      fetchTours();
    } catch (error) {
      setRefreshProgress({ current: 0, total: 0, inProgress: false });
      setActionResult({
        type: "refresh",
        success: false,
        message: "Failed to refresh tours: " + error.message,
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRefreshSingle = async (productCode) => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/tours", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ productCodes: [productCode] }),
      });

      const data = await res.json();
      if (data.success) {
        setActionResult({
          type: "refresh",
          success: true,
          message: data.message,
          results: data.results,
        });
        fetchTours();
      }
    } catch (error) {
      console.error("Error refreshing tour:", error);
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

        {refreshProgress.inProgress && (
          <div className="mb-8 p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
              <span className="font-medium text-blue-800">
                Refreshing tours from Viator...
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${refreshProgress.total > 0 ? (refreshProgress.current / refreshProgress.total) * 100 : 0}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-blue-700">
              {refreshProgress.current} of {refreshProgress.total} tours processed
            </div>
          </div>
        )}

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
                    {actionResult.results.updated?.length > 0 && (
                      <div className="text-green-700">
                        <strong>Updated:</strong>{" "}
                        {actionResult.results.updated.map((t) => `${t.productCode} (${t.rating}★, $${t.price})`).join(", ")}
                      </div>
                    )}
                    {actionResult.results.removed?.length > 0 && (
                      <div className="text-orange-700">
                        <strong>Removed (unavailable):</strong>{" "}
                        {actionResult.results.removed.map((t) => t.productCode).join(", ")}
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
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">
                All Tours ({pagination.total})
              </h2>
              {selectedTours.size > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {selectedTours.size} selected
                  </span>
                  <button
                    onClick={handleDeleteSelected}
                    disabled={actionLoading}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Selected
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={handleRefreshAllTours}
                disabled={actionLoading || toursLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
              >
                {actionLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Refresh All from Viator
              </button>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setPagination((p) => ({ ...p, page: 1 }));
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">All Countries</option>
                <option value="Norway">Norway</option>
                <option value="Iceland">Iceland</option>
                <option value="Sweden">Sweden</option>
                <option value="Finland">Finland</option>
                <option value="Denmark">Denmark</option>
              </select>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-gray-500" />
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [newSortBy, newSortOrder] = e.target.value.split("-");
                    setSortBy(newSortBy);
                    setSortOrder(newSortOrder);
                    setPagination((p) => ({ ...p, page: 1 }));
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Rating: High to Low</option>
                  <option value="rating-asc">Rating: Low to High</option>
                </select>
              </div>
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
                title="Reload list"
              >
                <RefreshCw className={`h-5 w-5 ${toursLoading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-12">
                    <input
                      type="checkbox"
                      checked={selectedTours.size === tours.length && tours.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 cursor-pointer"
                      title="Select all tours on this page"
                    />
                  </th>
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
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                      Loading tours...
                    </td>
                  </tr>
                ) : tours.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      No tours found
                    </td>
                  </tr>
                ) : (
                  tours.map((tour) => (
                    <tr key={tour._id} className={`hover:bg-gray-50 ${selectedTours.has(tour.productCode) ? 'bg-blue-50' : ''}`}>
                      <td className="px-4 py-3 w-12">
                        <input
                          type="checkbox"
                          checked={selectedTours.has(tour.productCode)}
                          onChange={() => handleSelectTour(tour.productCode)}
                          className="w-4 h-4 cursor-pointer"
                        />
                      </td>
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
                            <a
                              href={`/experiences/${tour.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 hover:text-blue-700 hover:underline truncate block"
                              title="Open tour in NordExplore"
                            >
                              {tour.title}
                            </a>
                            <div className="text-xs text-gray-500">{tour.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleCopyCode(tour.productCode)}
                          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-xs transition-colors cursor-pointer"
                          title="Click to copy"
                        >
                          <code>{tour.productCode}</code>
                          {copiedCode === tour.productCode ? (
                            <Check className="h-3 w-3 text-green-600" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-600" />
                          )}
                        </button>
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
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleRefreshSingle(tour.productCode)}
                            disabled={actionLoading}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50"
                            title="Refresh from Viator"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSingle(tour.productCode)}
                            disabled={actionLoading}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                            title="Delete tour"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
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
