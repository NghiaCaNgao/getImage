const download = document.getElementById('download');
const container = document.getElementById("container");
var data;

function loadData() {
    chrome.tabs.query({ active: true, currentWindow: true, url: ["https://www.instagram.com/*"] }, function(tabs) {
        if (tabs.length != 0) {
            chrome.tabs.executeScript(
                tabs[0].id, { code: 'if(0==Object.keys(document.getElementsByClassName("_2dDPU")).length){var a=document.querySelectorAll(".v1Nh3.kIKUG._bz0w img"),b=(a=[...a]).map(e=>e.src);chrome.runtime.sendMessage(JSON.stringify(b))}else{a=document.querySelectorAll("._2dDPU video"),b=(a=[...a]).map(e=>e.src);var a1=document.querySelectorAll("._2dDPU img"),b1=(a1=[...a1]).map(e=>e.src);b=b.concat(b1),chrome.runtime.sendMessage(JSON.stringify(b))}' });
        } else {
            download.innerHTML = "Sai địa chỉ";
        }
    });
    return new Promise((resolve, reject) => {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                resolve(JSON.parse(request));
            });
    });
}

function createPanel(link, id) {
    let panel = document.createElement("div");
    panel.id = "_" + id;
    panel.innerHTML = '<div class="row"> <div loading ="lazy" class="_img"> <img loading ="lazy" width=100%> </div><div class="_link"> <p></p></div><div class="_copy"> <a download target = "_blank">View link</a> </div></div>';
    container.appendChild(panel);
    let image = document.querySelector(`#_${id} img`);
    let link__ = document.querySelector(`#_${id} ._link`)
    let link_ = document.querySelector(`#_${id} ._link p`);
    let copy = document.querySelector(`#_${id} ._copy a`);
    image.src = link;

    copy.href = link;
    if (link.length > 15) {
        link = link.slice(0, 30) + "..."
    }
    link_.innerHTML = link;
}

function createData(data) {
    console.log(typeof(data));

    if (typeof(data) === "object") {
        data.forEach((element, index) => {
            createPanel(element, index);
        });
    }
}

(async function init() {
    data = await loadData();
    console.log(data);
    createData(data);
})();
// createPanel("https://66.media.tumblr.com/8dcd8c3bfbe1d6332a7a7ff25c2e7d2d/707baf7e0bf668f9-7d/s1280x1920/f26ef658a8bc1aadf2e36333ebe5adfc84a54707.jpg", "index");