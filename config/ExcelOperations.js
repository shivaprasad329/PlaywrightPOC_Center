import * as XLSX from "xlsx";
import path from "path";

/**
 * Read all data from an Excel file.
 * @param {string} filePath - The path to the Excel file.
 * @returns {Object} - An object containing all sheets and their data.
 */
export function readAllData(filePath) {
  const workbook = XLSX.readFile(filePath);
  const data = {};

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    data[sheetName] = XLSX.utils.sheet_to_json(sheet);
  });

  return data;
}

/**
 * Read data from a specific sheet and columns in an Excel file.
 * @param {string} filePath - The path to the Excel file.
 * @param {string} sheetName - The name of the sheet to read.
 * @param {Array<string>} columns - The columns to extract.
 * @returns {Array<Object>} - An array of objects containing the specified columns.
 */
export function readDataBySheetAndColumns(filePath, sheetName, columns) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found in the Excel file.`);
  }

  const allData = XLSX.utils.sheet_to_json(sheet);
  return allData.map((row) => {
    const filteredRow = {};
    columns.forEach((col) => {
      filteredRow[col] = row[col];
    });
    return filteredRow;
  });
}