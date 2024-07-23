const campoLogin = document.getElementById("username");
const campoSenha = document.getElementById("password");
const campoNovoLogin = document.getElementById("newusername");
const campoNovaSenha = document.getElementById("newpassword");
const campoRepSenha = document.getElementById("reppassword");
const campoTitulo = document.getElementById("titulo");
const campoNome = document.getElementById("nome");
const campoMarca = document.getElementById("marca");
const campoPlaca = document.getElementById("placa");
const lista = document.getElementById("lista");

function logar() {
  let login = campoLogin.value;
  let senha = campoSenha.value;
  let mensagem = "Usuário ou senha incorreta!";
  let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));
  if (bancoDeDados == null) {
    mensagem = "Nenhum usuário cadastrado até o momento";
  } else {
    for (let usuario of bancoDeDados) {
      if (usuario.login === login && usuario.senha === senha) {
        mensagem = "Parabéns, você logou!";
        localStorage.setItem("logado", JSON.stringify(usuario));
        window.location.href = "home.html";
        break;
      }
    }
  }
  alert(mensagem);
}

function cadastrar() {
  if (campoNovaSenha.value == campoRepSenha.value) {
    const usuario = {
      login: campoNovoLogin.value,
      senha: campoNovaSenha.value,
    };
    let bancoDeDados = JSON.parse(localStorage.getItem("bancoDeDados"));
    if (bancoDeDados == null) {
      bancoDeDados = [];
    }
    if (existe(usuario, bancoDeDados)) {
      alert("Esse login já foi cadastrado anteriormente");
    } else {
      bancoDeDados.push(usuario);
      localStorage.setItem("bancoDeDados", JSON.stringify(bancoDeDados));
      alert("Usuário cadastrado com sucesso!");
    }
  } else {
    alert("As senhas são diferentes!");
  }
}

function existe(usuario, bancoDeDados) {
  for (let verificado of bancoDeDados) {
    if (verificado.login == usuario.login) {
      return true;
    }
  }
  return false;
}

function logout() {
  window.location.href = "index.html";
}

function criaCarro() {
  const carro = {
    titulo: campoTitulo.value,
    nome: campoNome.value,
    marca: campoMarca.value,
    placa: campoPlaca.value,
  };
  let concessionaria = JSON.parse(localStorage.getItem("concessionaria"));
  if (concessionaria == null) {
    concessionaria = [];
  }
  //verificar aqui se o ISBN já existe, só permitindo cadastro caso não exista
  concessionaria.push(carro);
  localStorage.setItem(" concessionaria", JSON.stringify( concessionaria));
  alert("Carro cadastrado com sucesso!")
  campoTitulo.value = null;
  campoNome.value = null;
  campoMarca.value = null;
  campoPlaca.value = null;
}

let aberto = false;
function exibe() {
  let carro = "";  
  if (!aberto) {
    aberto = true;
    let  concessionaria = JSON.parse(localStorage.getItem(" concessionaria"));
    if ( concessionaria == null) {
      carro = "Não há carros cadastrados no momento!";
    } else {
      for (let carro of  concessionaria) {
        carro += "<br><strong>Título: </strong>" + carro.titulo;
        carro += "<br><strong>Nome: </strong>" + carro.nome;
        carro += "<br><strong>Marca: </strong>" + carro.marca;
        carro += "<br><strong>Placa: </strong>" + carro.placa;
        carro += "<br><strong>__________________________</strong>";
      }
      lista.innerHTML = carros;
    }
  }
  else{
    aberto = false;
    lista.innerHTML = "";
  }
}