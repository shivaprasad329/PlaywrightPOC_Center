import { readDataBySheetAndColumns } from "../../config/ExcelOperations.js";
import path from "path";
import { test } from "@playwright/test";

const filePath = path.resolve(__dirname, "../../TestData/SuperstoreData.xlsx");

test("Read specific sheet data from Excel file", async () => {
  const sheetName = "Orders";
  const columns = ["Order ID", "Customer ID", "Postal Code"];

  const data = readDataBySheetAndColumns(filePath, sheetName, columns);
  console.log("Filtered Data:", data);
});
