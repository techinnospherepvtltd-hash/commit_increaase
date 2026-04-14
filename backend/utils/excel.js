const ExcelJS = require('exceljs');
const path = require('path');
const { syncToGithub } = require('./gitSync');

const DATA_FILE = path.join(__dirname, '..', '..', 'data', 'techinnosphere_data.xlsx');

/**
 * Read all rows from a specific sheet.
 * Returns array of objects with column headers as keys.
 */
async function readSheet(sheetName) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(DATA_FILE);
  const sheet = workbook.getWorksheet(sheetName);
  if (!sheet) return [];

  const headers = [];
  const rows = [];

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell((cell, colNumber) => {
        headers[colNumber] = cell.value?.toString() || '';
      });
    } else {
      const obj = {};
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        const header = headers[colNumber];
        if (header) {
          let value = cell.value;
          // Handle ExcelJS rich text objects
          if (value && typeof value === 'object' && value.richText) {
            value = value.richText.map(r => r.text).join('');
          }
          // Handle formula results
          if (value && typeof value === 'object' && value.result !== undefined) {
            value = value.result;
          }
          obj[header] = value;
        }
      });
      // Ensure all headers are present
      headers.forEach(h => {
        if (h && obj[h] === undefined) obj[h] = '';
      });
      if (Object.keys(obj).length > 0) rows.push(obj);
    }
  });

  return rows;
}

/**
 * Write an array of objects to a specific sheet (replaces all data).
 */
async function writeSheet(sheetName, data) {
  const workbook = new ExcelJS.Workbook();
  try {
    await workbook.xlsx.readFile(DATA_FILE);
  } catch {
    // File doesn't exist yet, that's fine
  }

  let sheet = workbook.getWorksheet(sheetName);
  if (sheet) {
    workbook.removeWorksheet(sheet.id);
  }
  sheet = workbook.addWorksheet(sheetName);

  if (data.length === 0) {
    await workbook.xlsx.writeFile(DATA_FILE);
    return;
  }

  // Set columns from first row's keys
  const keys = Object.keys(data[0]);
  sheet.columns = keys.map(key => ({
    header: key,
    key,
    width: Math.max(key.length + 5, 15),
  }));

  // Style header row
  sheet.getRow(1).font = { bold: true, size: 12 };
  sheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1B3A5C' },
  };
  sheet.getRow(1).font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } };

  // Add data rows
  data.forEach(row => sheet.addRow(row));

  await workbook.xlsx.writeFile(DATA_FILE);

  // Sync to GitHub if on Render
  syncToGithub();
}

/**
 * Append a single row to a sheet.
 */
async function appendRow(sheetName, row) {
  const data = await readSheet(sheetName);
  // Auto-increment ID
  const maxId = data.reduce((max, r) => Math.max(max, parseInt(r.id) || 0), 0);
  row.id = maxId + 1;
  data.push(row);
  await writeSheet(sheetName, data);
  return row;
}

/**
 * Update a row by ID.
 */
async function updateRow(sheetName, id, updates) {
  const data = await readSheet(sheetName);
  const index = data.findIndex(r => String(r.id) === String(id));
  if (index === -1) return null;
  data[index] = { ...data[index], ...updates, id: parseInt(id) };
  await writeSheet(sheetName, data);
  return data[index];
}

/**
 * Delete a row by ID.
 */
async function deleteRow(sheetName, id) {
  const data = await readSheet(sheetName);
  const index = data.findIndex(r => String(r.id) === String(id));
  if (index === -1) return false;
  data.splice(index, 1);
  await writeSheet(sheetName, data);
  return true;
}

module.exports = { readSheet, writeSheet, appendRow, updateRow, deleteRow, DATA_FILE };
