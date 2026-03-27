function cadastrar() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const mensagem = document.getElementById("mensagem");

  // valida campos vazios
  if (!nome || !email || !senha || !confirmarSenha) {
    mensagem.innerText = "Preencha todos os campos!";
    return;
  }

  // valida senha mínima
  if (senha.length < 6) {
    mensagem.innerText = "A senha deve ter pelo menos 6 caracteres!";
    return;
  }

  // valida confirmação de senha
  if (senha !== confirmarSenha) {
    mensagem.innerText = "As senhas não coincidem!";
    return;
  }

  // verifica se já existe usuário
  const usuarioExistente = JSON.parse(localStorage.getItem("usuario"));

  if (usuarioExistente && usuarioExistente.email === email) {
    mensagem.innerText = "Este email já está cadastrado!";
    return;
  }

  // salva usuário
  const usuario = {
    nome,
    email,
    senha
  };

  localStorage.setItem("usuario", JSON.stringify(usuario));

  mensagem.innerText = "Cadastro realizado com sucesso!";

  // limpa campos
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("senha").value = "";
  document.getElementById("confirmarSenha").value = "";

  // redireciona
  setTimeout(() => {
    window.location.href = "../tela_login/index.html";
  }, 1200);
}

function voltarLogin() {
  window.location.href = "../tela_login/index.html";
}