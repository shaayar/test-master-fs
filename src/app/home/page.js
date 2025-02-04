"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

import { useAuth } from './AuthContext.js'; 

export default function Home() {
    const { isAuthenticated } = useAuth();

    const [browser, setBrowser] = useState('chrome');
    const [targetUrl, setTargetUrl] = useState('');
    const [testResult, setTestResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
      // If the user logs in after being on the page, clear any error messages
      if (isAuthenticated) {
        setErrorMessage(null);
      }
    }, [isAuthenticated]);


    const runTest = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    if (!targetUrl) {  // Simple input validation
      setErrorMessage("Please enter a target URL.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/run-test', { browser, targetUrl }); // Send targetUrl to API
      setTestResult(response.data.result);
    } catch (error) {
      console.error("Test execution error:", error);
      if (error.response) {
        setErrorMessage(`Server Error: ${error.response.status} - ${error.response.data?.message || error.message}`);
      } else if (error.request) {
        setErrorMessage("Network Error: Could not connect to the server.");
      } else {
        setErrorMessage(`Client Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">TestMaster</h1>

        {isAuthenticated ? ( // Conditionally render the input and test controls
            <div className="mb-4">
                <label htmlFor="targetUrl" className="block mb-2">Target URL:</label>
                <input
                    type="url"
                    id="targetUrl"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="border rounded px-3 py-2 w-full mb-2"
                    placeholder="e.g., https://www.example.com"
                    required
                />

                <label htmlFor="browser" className="block mb-2">Browser:</label>
                <select
                    id="browser"
                    value={browser}
                    onChange={(e) => setBrowser(e.target.value)}
                    className="border rounded px-3 py-2"
                >
                    <option value="chrome">Chrome</option>
                    <option value="firefox">Firefox</option>
                </select>

                <button
                    onClick={runTest}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? 'Running...' : 'Run Test'}
                </button>
            </div>
        ) : (
            <p>Please log in to run tests.</p> // Message for unauthenticated users
        )}

        {isLoading && <ClipLoader color="#007bff" size={20} />}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {testResult && (
            <div className="mt-4 border rounded p-4">
                {/* ... display test results ... */}
            </div>
        )}
    </div>
);
}