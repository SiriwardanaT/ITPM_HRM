import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import imgs from '../../public/logo.png'
import authService from '../services/authHelpers'

//provice table coloum , data set and save name as argument
const Report = {
     genrateReport(Colums, SaveName, dataArr,title){
        const columns = Colums
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "letter",
        });
        var img = new Image();
        img.src = imgs;
        doc.addImage(img, "png", 1.0, 0.01, 1.0, 1.1);
        doc.setFontSize(10).text("Sales Report Section", 2.5, 0.4);
        doc.setFontSize(10).text("HRM Company (PVT)", 2.5, 0.6);
        doc.setFontSize(10).text("Colombo 7", 2.5, 0.8);
        doc.setFontSize(10).text("0932232233", 2.5, 1.0);
      
        doc.setFontSize(16).text("HRM System Report", 4.5, 1.0);
        doc.setFontSize(10).text("REF NO  : ", 7.3, 1.0);
        doc.setFontSize(10).text("1221", 8.0, 1.0);
      
        doc
          .setFontSize(10)
          .text(`Dowloaded By ${authService.getUsername()}`, 1.0, 2.0);
        doc
          .setFontSize(10)
          .text(`Dowloaded Date ${new Date().toLocaleDateString()}`, 5.0, 2.0);
      
        doc.setLineWidth(0.01).line(0.05, 1.1, 8.0, 1.1);
        // Using autoTable plugin
        doc.setFontSize(12).text(title, 0.5, 3.0);
        autoTable(doc, {
          columns,
          body: dataArr,
          margin: { top: 3.25 },
        });
        // Creating footer and saving file
        doc.save(`${SaveName}.pdf`);
 
     }
      
}

export default Report;
