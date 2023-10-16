criaPopup();


function criaPopup(){
  // Cria div vazia
  let body = document.querySelector("body");
  let div = document.createElement("div");
  div.className = "scanAI-results"
  body.appendChild(div);

  // Insere uma shadowRoot na div, para que não herde nenhum css.
  const host = document.querySelector('.scanAI-results');
  let shadowRoot = host.attachShadow({ mode: 'open' });

  // Criação da div verdadeira que estará visível na página.
  div = document.createElement("div");
  div.classList.add("scanIA-popup-div");
  div.style = "width:300px; min-height:150px; background-color: #f7f7ff; border: 1px solid #688bff; position:fixed; z-index: 100000; right: 10px; top: 10px;"

  let h1 = document.createElement("h1");
  h1.style = "text-align: center;"
  h1.appendChild(document.createTextNode("Resultado:"));
  div.appendChild(h1);

  let hr = document.createElement("hr");
  div.appendChild(hr);

  let pText = document.createElement("p");
  pText.appendChild(document.createTextNode("Texto: "));
  pText.style = "margin: 0 10px; text-align: justify;";
  pText.className = "scanAI-text";

  div.appendChild(pText);

  let pResult = document.createElement("p");
  pResult.style = "margin: 10px 10px;";
  pResult.className = "scanAI-result";

  div.appendChild(pResult);

  hr = document.createElement("hr");
  div.appendChild(hr);

  let btn = document.createElement("button");
  btn.innerHTML = "Fechar";
  div.appendChild(btn);
  btn.onclick = fecharPopup

  // Adiciona a div ao shadowRoot
  shadowRoot.appendChild(div);
  
  // Função assíncrona para receber informações do serviceWorker. 
  (async () => {
    // Manda mensagem para o serviceWorker e recebe as informações necessárias como resposta.
    const response = await chrome.runtime.sendMessage({ message: "getScanResult"});
  
    pText.appendChild(document.createTextNode(response.message.text));
    pResult.appendChild(document.createTextNode(response.message.result));
  
    timesActivated++;
  })();
}

function fecharPopup() {
  let div = document.querySelector(".scanAI-results");
  div.parentNode.removeChild(div);
  console.log(div);
}