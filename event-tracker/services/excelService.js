const XLSX = require("xlsx");
const path = require("path");

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const convertJsonToExcel = async (eventData) => {
  try {
    const prefix = "report"
    const worksheet = XLSX.utils.json_to_sheet([...eventData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "events");

    // Get the current date as a formatted string
    const currentDate = getCurrentDate();

    // Specify the file path with the current date and prefix
    const fileName = `${prefix}_${currentDate}.xlsx`;
    const filePath = path.join(__dirname, "../reports", fileName);

    // Generate buffer
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // Binary string
    const binaryString = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "binary",
    });

    // Write the workbook to the specified file path
    XLSX.writeFile(workbook, filePath);

    console.log(`Excel file saved at: ${filePath}`);
  } catch (error) {
    console.log(`Error while generating the report: ${error.message}`);
  }
};

module.exports = convertJsonToExcel;
