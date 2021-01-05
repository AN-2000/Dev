let ExcelJS = require("exceljs");
const workbook = new ExcelJS.Workbook();

workbook.addWorksheet("My Worksheet - 1");
let worksheet2 = workbook.addWorksheet("My Worksheet - 2");

worksheet2.columns = [
  {
    header: "Col-A",
    header: "Col-A",
    width: 30,
  },
  {
    header: "Col-B",
    header: "Col-B",
    width: 30,
  },
];

worksheet2.addRow(["Meri Heading"]).font = {
  size: 30,
  color: { argb: "FF00FF00" },
};

worksheet2.addRow([1,2])

workbook.xlsx.writeFile("./Test.xlsx");