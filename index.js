const searchInput = document.getElementById("search_input");
const searchBtn = document.getElementById("search_button");
const codigo = document.getElementById("codigo");
const nome_cliente = document.getElementById("nome_cliente");
const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const serie = document.getElementById("serie");
const nome_situacao = document.getElementById("nome_situacao");

searchBtn.onclick = () => {
  const searchValue = searchInput.value;
  if (searchValue.trim() === "") return;

  var request = new XMLHttpRequest();

  request.open(
    "GET",
    "http://195.35.18.97:3000/buscar-na-api?q=" + searchValue,
    true
  );

  request.setRequestHeader("Content-Type", "application/json");

  request.onreadystatechange = function () {
    console.log("Ready State:", this.readyState);

    if (this.readyState === 4) {
      console.log("Status Code:", this.status);

      if (this.status === 200) {
        const bodyData = JSON.parse(this.responseText);
        codigo.innerText = `Código: ${bodyData.dados.data[0].codigo}`;
        nome_cliente.innerText = `Nome cliente: ${bodyData.dados.data[0].nome_cliente}`;
       marca.innerText = `marca: ${bodyData.dados.data[0].equipamentos[0].equipamento.marca}`;
        modelo.innerText = `modelo: ${bodyData.dados.data[0].equipamentos[0].equipamento.modelo}`;
        serie.innerText = `serie: ${bodyData.dados.data[0].equipamentos[0].equipamento.serie}`;
        nome_situacao.innerText = `Situação: ${bodyData.dados.data[0].nome_situacao}`;
       
      } else {
        console.error("Error: " + this.status);
      }
    }
  };

  request.onerror = function () {
    console.error("There was an error making the request.");
  };

  request.send();
};
