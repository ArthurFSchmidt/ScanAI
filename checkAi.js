console.log("checkai iniciado");


let contextMenuItem = {
    "id": "checkAI",
    "title": "Procurar por conteúdo IA",
    "contexts": ["selection"]
}
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(aiChecker);

async function aiChecker(clickData){

    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    let resp = "Não é AI!";



    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["scripts/content.js"]
    });
    
    
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.message === "getScanResult")
          sendResponse({message: {'text': clickData.selectionText, 'result': resp}});
      }
    );
    
}




  