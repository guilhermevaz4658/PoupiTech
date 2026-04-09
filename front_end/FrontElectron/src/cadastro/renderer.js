function irParaCadastro() {
  window.api.mudarTela('cadastro');
}

// ================= FUNÇÕES LOCAIS =================
function validarCadastro({ nome, email, senha, confirmaSenha }) {
  if (!nome || !email || !senha || !confirmaSenha) {
    return { erro: 'Preencha todos os campos.' };
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValido.test(email)) {
    return { erro: 'Email inválido.' };
  }

  if (senha.length < 6) {
    return { erro: 'Senha deve ter no mínimo 6 caracteres.' };
  }

  if (senha !== confirmaSenha) {
    return { erro: 'As senhas não coincidem.' };
  }

  return { sucesso: true };
}

function salvarUsuario(usuario) {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const existe = usuarios.find(u => u.email === usuario.email);
  if (existe) {
    return { erro: 'Email já cadastrado.' };
  }

  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  return { sucesso: true };
}

function loginUsuario(dados) {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const usuario = usuarios.find(
    u => u.email === dados.email && u.senha === dados.senha
  );

  if (!usuario) {
    return { erro: 'Email ou senha inválidos.' };
  }

  return { sucesso: true, usuario };
}

// ================= LOGIN =================
function login() {
  const email = document.getElementById('email');
  const senha = document.getElementById('senha');
  const mensagem = document.getElementById('mensagem');

  if (!email.value.trim() || !senha.value) {
    mensagem.style.color = 'red';
    mensagem.textContent = 'Preencha todos os campos.';
    return;
  }

  const resultado = loginUsuario({
    email: email.value.trim(),
    senha: senha.value
  });

  if (resultado.erro) {
    mensagem.style.color = 'red';
    mensagem.textContent = resultado.erro;
    return;
  }

  localStorage.setItem('usuarioLogado', JSON.stringify(resultado.usuario));

  window.api.mudarTela('principal');
}
function cadastrar() {
  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const senha = document.getElementById('senha');
  const confirmaSenha = document.getElementById('confirmaSenha');
  const mensagem = document.getElementById('mensagem');

  // 🔥 limpa erros antes
  [nome, email, senha, confirmaSenha].forEach(input => {
    input.classList.remove('erro');
  });

  const dados = {
    nome: nome.value.trim(),
    email: email.value.trim(),
    senha: senha.value,
    confirmaSenha: confirmaSenha.value
  };

  const validacao = validarCadastro(dados);

  if (validacao.erro) {
    mensagem.style.color = 'red';
    mensagem.textContent = validacao.erro;

    // 🔥 MARCAR CAMPOS COM ERRO
    if (!dados.nome) nome.classList.add('erro');

    if (!dados.email || validacao.erro.includes('Email')) {
      email.classList.add('erro');
    }

    if (!dados.senha || validacao.erro.includes('Senha')) {
      senha.classList.add('erro');
    }

    if (!dados.confirmaSenha || validacao.erro.includes('coincidem')) {
      confirmaSenha.classList.add('erro');
    }

    return;
  }

  const salvar = salvarUsuario({
    nome: dados.nome,
    email: dados.email,
    senha: dados.senha
  });

  if (salvar.erro) {
    mensagem.style.color = 'red';
    mensagem.textContent = salvar.erro;
    email.classList.add('erro');
    return;
  }

  mensagem.style.color = 'green';
  mensagem.textContent = 'Cadastro realizado com sucesso!';

  setTimeout(() => {
    window.api.mudarTela('login');
  }, 1500);
}