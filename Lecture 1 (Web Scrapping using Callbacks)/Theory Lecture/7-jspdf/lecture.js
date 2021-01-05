let { jsPDF } = require("jspdf");

let doc = new jsPDF()

// doc.text(20, 40, "Hello")
doc.text("Hello All", 20, 40);

doc.save("generated.pdf")