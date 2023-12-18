const button = document.querySelector("#btn-enviar")

button.addEventListener("click", verificarTexto);

function getText() {
    textArea = document.querySelector("#texto");
    texto = textArea.value;
    textArea.value = "";
    return texto;
}

function verificarTexto() {

    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-type': 'application/json',
          'x-api-key': '8JacecGY4964lv2d84Ek595cUQ4545sk4754Xu1b65sS3a43Pidbc62k644e4rc1c4Kmc42eTM34f4FB4727s4bcefLQa6ec'
        },
        body: JSON.stringify({
          language: 'auto',
          text: getText()
        })
      };
      
      fetch('https://api.smodin.io/v1/ai-detection/single', options)
        .then(response => response.json())
        .then(resp => { 
            resposta = document.querySelector("#resposta");
            resposta.innerHTML = Math.ceil(resp.aiGeneratedProbability) + "% de IA.";
    });

}