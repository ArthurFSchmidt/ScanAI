console.log("checkai iniciado");
let isContentScriptActive = false;

// Cria o objeto que define o item para o contextMenu.
let contextMenuItem = {
  "id": "checkAI",
  "title": "Procurar por conteúdo IA",
  "contexts": ["selection"]
}

// Cria o item no contextMenu utilizando o objeto como base.
chrome.contextMenus.create(contextMenuItem);

// Adiciona um evento onClick ao item.
chrome.contextMenus.onClicked.addListener(aiChecker);

// Função assíncrona que será chamada quando o item for clicado.
// Tem como objetivo se conectar com a API para fazer a verificação,
// após isso, cria o content script na página e manda as informações como mensagem.
async function aiChecker(clickData) {

  criarContentScript();

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-type': 'application/json',
      'x-api-key': '8JacecGY4964lv2d84Ek595cUQ4545sk4754Xu1b65sS3a43Pidbc62k644e4rc1c4Kmc42eTM34f4FB4727s4bcefLQa6ec'
    },
    body: JSON.stringify({
      language: 'auto',
      text: clickData.selectionText
    })
  };

  fetch('https://api.smodin.io/v1/ai-detection/single', options)
    .then(response => response.json())
    .then(resp => { 

    (async () => {
      const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      const response = await chrome.tabs.sendMessage(tab.id, { greeting: "scanResult", text: clickData.selectionText, result: resp.aiGeneratedProbability });
      console.log(response);
    })();
});

}

async function criarContentScript() {
  
    // Faz query para encontrar a página ativa.
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    // Cria o content script na página ativa.
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["scripts/content.js"]
    });
    isContentScriptActive = true;
  
}