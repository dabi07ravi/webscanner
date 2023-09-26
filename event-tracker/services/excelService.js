const XLSX = require("xlsx");

const convertJsonToExcel = async (eventData) => {
  try {
    const worksheet = XLSX.utils.json_to_sheet([...eventData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "events"); // Fix the argument order

    // Generate buffer
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" }); // Assign the result to a variable

    // Binary string
    const binaryString = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "binary",
    }); // Assign the result to a variable

    XLSX.writeFile(workbook, "../reports/eventsData.xlsx"); // Use 'workbook' instead of 'workBook'
  } catch (error) {
    console.log(`error while generating the report : ${error.message}`);
  }
};

module.exports = convertJsonToExcel;
