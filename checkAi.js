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
  let resp = "Não é AI!";

  if(!isContentScriptActive){
    // Faz query para encontrar a página ativa.
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    // Cria o content script na página ativa.
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["scripts/content.js"]
    });
    isContentScriptActive = true;
  }


  (async () => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {greeting: "getScanResult", text: clickData.selectionText, result: resp});
    // do something with response here, not outside the function
    console.log(response);
  })();

}
