let results = { text: null, result: null };
let isPopupOpen = false;

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.greeting === "scanResult") {
      sendResponse('ok');

      results.result = Math.ceil(request.result)+"% de IA";
      results.text = request.text;

      if (isPopupOpen) fecharPopup();

      criaPopup();
    }
  }
);

function criaPopup() {
  // Cria div vazia
  let body = document.querySelector("body");
  let div = document.createElement("div");
  div.className = "scanAI-results";
  body.appendChild(div);

  // Insere uma shadowRoot na div, para que não herde nenhum css.
  const host = document.querySelector('.scanAI-results');
  let shadowRoot = host.attachShadow({ mode: 'closed' });

  // Criação da div verdadeira que estará visível na página.
  div = document.createElement("div");
  div.classList.add("scanAI-popup-div");
  div.style = "width:300px; min-height:150px; background-color: #f7f7ff; border: 1px solid #688bff; position:fixed; z-index: 100000; right: 10px; top: 10px; overflow: scroll; max-height: 90vh;font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;";
  //div.style += "";

  let h1 = document.createElement("h1");
  h1.style = "text-align: center;";
  h1.appendChild(document.createTextNode("Resultado:"));
  div.appendChild(h1);

  let hr = document.createElement("hr");
  div.appendChild(hr);

  let pText = document.createElement("p");
  pText.appendChild(document.createTextNode("Texto: " + results.text));
  pText.style = "margin: 0 10px; text-align: justify;";
  pText.className = "scanAI-text";

  div.appendChild(pText);

  let pResult = document.createElement("p");
  pResult.appendChild(document.createTextNode(results.result));
  pResult.style = "margin: 10px 10px;";
  pResult.className = "scanAI-result";

  div.appendChild(pResult);

  hr = document.createElement("hr");
  div.appendChild(hr);

  let btn = document.createElement("button");
  btn.innerHTML = "Fechar";
  div.appendChild(btn);
  btn.onclick = fecharPopup;
  btn.style = "border: 0; padding: 5px; cursor: pointer;";

  // Adiciona a div ao shadowRoot
  shadowRoot.appendChild(div);
  isPopupOpen = true;
}

function fecharPopup() {
  let div = document.querySelector(".scanAI-results");
  div.parentNode.removeChild(div);
  isPopupOpen = false;
}