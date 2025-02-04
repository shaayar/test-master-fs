"use client";
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [browser, setBrowser] = useState('chrome');
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const runTest = async () => {
    setIsLoading(true);
    setErrorMessage(null); // Clear any previous errors
    try {
      const response = await axios.post('/api/run-test', { browser });
      setTestResult(response.data.result); // Assuming API returns a single result object
    } catch (error) {
        console.error("Test execution error:", error);
        setErrorMessage("An error occurred during test execution."); // Set error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">TestMaster</h1>

      <div className="mb-4">
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
          {isLoading? 'Running...': 'Run Test'}
        </button>
      </div>

      {isLoading && <p>Running tests...</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}

      {testResult && (
        <div className="mt-4 border rounded p-4">
          <p>Test Name: {testResult.testName}</p>
          <p>Status: {testResult.status}</p>
          {/*... other test details if needed... */}
        </div>
      )}
    </div>
  );
}