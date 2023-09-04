    let body = document.querySelector("body");
    let div = document.createElement("div");
    div.className = "scanAI-results"
    body.appendChild(div);
    
    const host = document.querySelector('.scanAI-results');
    let shadowRoot = host.attachShadow({mode: 'open'});
    
    div = document.createElement("div");
    div.style = "width:300px; min-height:150px; background-color: #f7f7ff; border: 1px solid #688bff; position:fixed; z-index: 1000; right: 10px; top: 10px;"
    
    let h1 = document.createElement("h1");
    h1.style = "text-align: center;"
    h1.appendChild(document.createTextNode("Resultado:"));
    div.appendChild(h1);

    let hr = document.createElement("hr");
    div.appendChild(hr);
    
    let pText = document.createElement("p");
    pText.appendChild(document.createTextNode("Texto: "));
    pText.style = "margin: 0 10px;";
    pText.className = "scanAI-text";

    div.appendChild(pText);
    
    let pResult = document.createElement("p");
    pResult.style = "margin: 0 10px;";
    pResult.className = "scanAI-result";

    div.appendChild(pResult);

    hr = document.createElement("hr");
    div.appendChild(hr);
    
    shadowRoot.appendChild(div);
        
  (async () => {
    const response = await chrome.runtime.sendMessage({message: "getScanResult"});
    console.log(response);

    pText.appendChild(document.createTextNode(response.message.text));
    pResult.appendChild(document.createTextNode(response.message.result));
    
    console.log(response);
  })();

