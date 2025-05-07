/**
 * Compare two rows of data.
 * @param {Array} expectedRow - The expected row data.
 * @param {Array} actualRow - The actual row data.
 * @returns {boolean} - True if rows match, false otherwise.
 */
export function compareRows(expectedRow, actualRow) {
  if (expectedRow.length !== actualRow.length) return false;
  return expectedRow.every((value, index) => value === actualRow[index]);
}

/**
 * Compare two tables of data.
 * @param {Array<Array>} expectedTable - The expected table data (2D array).
 * @param {Array<Array>} actualTable - The actual table data (2D array).
 * @returns {boolean} - True if tables match, false otherwise.
 */
export function compareTables(expectedTable, actualTable) {
  if (expectedTable.length !== actualTable.length) return false;

  return expectedTable.every((expectedRow, rowIndex) =>
    compareRows(expectedRow, actualTable[rowIndex])
  );
}

/**
 * Validate specific columns in a table.
 * @param {Array<Array>} table - The table data (2D array).
 * @param {Array<number>} columnIndexes - The indexes of the columns to validate.
 * @param {Array<Array>} expectedColumns - The expected column data (2D array).
 * @returns {boolean} - True if the specified columns match, false otherwise.
 */
export function validateColumns(table, columnIndexes, expectedColumns) {
  return columnIndexes.every((colIndex, index) =>
    table.every(
      (row, rowIndex) => row[colIndex] === expectedColumns[rowIndex][index]
    )
  );
}

/**
 * Generate a detailed comparison report for mismatched data.
 * @param {Array<Array>} expectedTable - The expected table data (2D array).
 * @param {Array<Array>} actualTable - The actual table data (2D array).
 * @returns {Array<Object>} - An array of mismatch details.
 */
export function generateComparisonReport(expectedTable, actualTable) {
  const report = [];

  expectedTable.forEach((expectedRow, rowIndex) => {
    const actualRow = actualTable[rowIndex] || [];
    expectedRow.forEach((expectedValue, colIndex) => {
      const actualValue = actualRow[colIndex];
      if (expectedValue !== actualValue) {
        report.push({
          row: rowIndex + 1,
          column: colIndex + 1,
          expected: expectedValue,
          actual: actualValue,
        });
      }
    });
  });

  return report;
}
