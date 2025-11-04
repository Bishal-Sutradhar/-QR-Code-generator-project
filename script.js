const qrContainer = document.querySelector(".qr-container");
const input = document.querySelector(".user-text");
const generateBtn = document.querySelector(".generate-btn");
const downloadBtn = document.querySelector(".download-btn");


generateBtn.addEventListener("click", () => {
    const text = input.value.trim();

    if(text === "") {
        qrContainer.style.visibility = "hidden";
        qrContainer.style.opacity = 0;
        downloadBtn.style.visibility = "hidden";
        downloadBtn.style.opacity = 0;
        alert("Please enter text or URL!");
        return;
    }

    qrContainer.innerHTML = "";

    let size;

    if(window.innerWidth <= 300) {
        size = 150;
    } else if(window.innerWidth <= 600) {
        size = 200;
    } else {
        size = 250;
    }
    
    new QRCode(qrContainer, {
        text: text,
        height: size,
        width: size,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel : QRCode.CorrectLevel.H,
    });

    qrContainer.style.visibility = "visible";
    qrContainer.style.opacity = 1;

    function showDownloadBtn() {
        downloadBtn.style.visibility = "visible";
        downloadBtn.style.opacity = 1;
    }
    setTimeout(() => {
        showDownloadBtn();
    }, 1000);
}
);

document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if (key === "Enter") {
        generateBtn.click();
    }
});


downloadBtn.addEventListener("click", () => {
    
    const canvas = qrContainer.querySelector("canvas");
    const img = qrContainer.querySelector("img");
    
    let imageURL = null;
    let fileName = 'qrcode.png';

    
    if (canvas) {
        imageURL = canvas.toDataURL("image/png");
    } else if (img) {
        imageURL = img.getAttribute('src');
    }

    if (imageURL) {
        const link = document.createElement('a');

        link.download = fileName;
        link.href = imageURL;
    
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
    }
});




//add responsiveness
//learn the download code
