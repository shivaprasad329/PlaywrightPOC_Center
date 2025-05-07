import { test, expect } from "@playwright/test";
import {
  compareTables,
  generateComparisonReport,
} from "../../config/Validator.js";

test("Validate table data", async () => {
  const expectedTable = [
    ["Name", "Age", "City"],
    ["John", "30", "New York"],
    ["Jane", "25", "Los Angeles"],
  ];

  const actualTable = [
    ["Name", "Age", "City"],
    ["John", "30", "New York"],
    ["Jane", "26", "Los Angeles"], // Mismatch in age
  ];

  const isEqual = compareTables(expectedTable, actualTable);
  expect(isEqual).toBe(false);

test.info().attach("Comparison Report", {
	body: JSON.stringify({
		expectedTable,
		actualTable,
		comparisonReport: generateComparisonReport(expectedTable, actualTable),
	}, null, 2),
	contentType: "application/json",
});
});
