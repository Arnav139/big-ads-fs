import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Loader2, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface CreatorRequest {
  id: number;
  userId: number;
  maAddress: string;
  role: string;
  status: string;
  createdAt: string;
}

const PendingRequests = () => {
  const [requests, setRequests] = useState<CreatorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('bigads_token');
      console.log(token, "token") // or sessionStorage, or cookies
      const response = await axios.get('http://localhost:8008/user/getPendingRequests', {
        headers: {
          Authorization: `Bearer ${token}`  // Send token in header
        }
      });
      setRequests(response.data?.data || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch pending requests');
      setLoading(false);
    }
  };

  // Function to handle both approval and rejection
  const handleResponse = async (maAddress: string, responseType: 'Approve' | 'Reject') => {
    try {
      const token = localStorage.getItem('bigads_token'); // or sessionStorage, or cookies
      await axios.patch(
        `http://localhost:8008/user/creator-requests/${maAddress}/approve`, 
        { responseType }, 
        {
          headers: {
            Authorization: `Bearer ${token}`  // Send token in header
          }
        }
      );
      showToast(`Creator request ${responseType.toLowerCase()}d successfully`, "success");
      fetchRequests();
    } catch (err) {
      showToast("Failed to process creator request", "error");
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <XCircle className="w-5 h-5 mr-2" /> {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-2xl font-bold mb-6">Pending Creator Requests</h1>

      {toastMessage && (
        <div
          className={`fixed top-5 right-5 flex items-center gap-2 px-4 py-2 rounded-md shadow-lg ${
            toastMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
          {toastMessage.message}
        </div>
      )}

      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">User ID</th>
              <th className="px-4 py-2 text-left">Wallet Address</th>
              <th className="px-4 py-2 text-left">Requested Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Request Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No pending requests found
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request.id} className="border-t">
                  <td className="px-4 py-2">{request.userId}</td>
                  <td className="px-4 py-2 font-mono">
                    {request.maAddress.slice(0, 6)}...{request.maAddress.slice(-4)}
                  </td>
                  <td className="px-4 py-2">{request.role}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {format(new Date(request.createdAt), 'MMM dd, yyyy HH:mm')}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleResponse(request.maAddress, 'Approve')}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleResponse(request.maAddress, 'Reject')}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRequests;
