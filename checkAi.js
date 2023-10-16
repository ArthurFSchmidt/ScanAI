console.log("checkai iniciado");

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

  // Faz query para encontrar a página ativa.
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  let resp = "Não é AI!";
  console.log(clickData);



  // Cria o content script na página ativa.
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/content.js"]
  });

  // Espera a mensagem do content script e retorna o texto verificado e o resultado.
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.message === "getScanResult"){
        sendResponse({ message: { 'text': clickData.selectionText, 'result': resp } });
      }
    }
  );

}
