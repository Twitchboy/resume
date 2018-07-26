import 'styles/reset.css'
import 'styles/iconfont.css'
import 'styles/index.less'
// import html2canvas from 'html2canvas'
// import  jsPDF from 'jspdf'

var downPdf = document.getElementById("renderPdf");
downPdf.onclick = function() {
    html2canvas(document.body).then(function (canvas) {
        //返回图片URL，参数：图片格式和清晰度(0-1)
        var pageData = canvas.toDataURL('image/jpeg', 1.0);
        //方向默认竖直，尺寸ponits，格式a4【595.28,841.89]
        var pdf = new jsPDF('', 'pt', 'a4');
        //需要dataUrl格式
        pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28/canvas.width * canvas.height );
        pdf.save('Junting-resume.pdf');
    })
}
