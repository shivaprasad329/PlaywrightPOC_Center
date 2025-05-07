import React, { useState } from "react";
import io from 'socket.io-client';

function TestRunner() {
  const [selectedTests, setSelectedTests] = useState([]);
  const testCases = [
    { id: 1, name: "Test PIM Flow", file: "tests/OrangeHRMS/Global.spec.js" },
    {
      id: 2,
      name: "Test Dashboard",
      file: "tests/OrangeHRMS/Dashboard.spec.js",
    },
    { id: 3, name: "Test Admin Page", file: "tests/OrangeHRMS/Admin.spec.js" },
  ];

  const handleTestSelection = (testId) => {
    setSelectedTests((prev) =>
      prev.includes(testId)
        ? prev.filter((id) => id !== testId)
        : [...prev, testId]
    );
  };

  const runTests = async () => {
    const selectedTestFiles = testCases
      .filter((test) => selectedTests.includes(test.id))
      .map((test) => test.file);

    // Send selected test files to the backend for execution
    await fetch("http://localhost:3001/run-tests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tests: selectedTestFiles }),
    });
  };

  return (
    <div>
      <h1>Test Runner</h1>
      <ul>
        {testCases.map((test) => (
          <li key={test.id}>
            <input
              type="checkbox"
              checked={selectedTests.includes(test.id)}
              onChange={() => handleTestSelection(test.id)}
            />
            {test.name}
          </li>
        ))}
      </ul>
      <button onClick={runTests}>Run Selected Tests</button>
    </div>
  );
}

export default TestRunner;
