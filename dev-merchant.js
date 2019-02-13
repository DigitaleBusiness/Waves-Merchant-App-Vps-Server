console.log('ok');
window.onload = function () {
    let iframe = document.createElement('iframe');
    //iframe.style.display = "none";
    iframe.src = 'http://localhost:3001/';
    iframe.height='300px';
    document.body.appendChild(iframe);
};