const lista = document.getElementById('lista');
const btn = document.getElementById('btnAdicionar');

// Pegar o usuário logado corretamente
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuario) {
  alert("Você precisa fazer login!");
  window.location.href = "../tela_login/index.html";
}

// mostra nome na tela
document.getElementById("boasVindas").innerText =
  "Bem-vindo, " + usuario.nome + "!";

btn.addEventListener('click', async () => {
  const descricao = document.getElementById('descricao').value;
  const valor = document.getElementById('valor').value;
  const tipo = document.getElementById('tipo').value;
  const categoriaSelect = document.getElementById('categoria');
  const categoria_id = parseInt(categoriaSelect.value);

  if (!descricao || !valor) {
    alert('Preencha todos os campos!');
    return;
  }

  const dados = {
    usuario_id: usuario.id, // usa o id do usuário logado
    conta_id: 1,
    categoria_id,
    valor: parseFloat(valor),
    tipo_transacao: tipo,
    descricao
  };

  try {
    await window.api.salvarTransacao(dados);
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
    carregarTransacoes();
  } catch (erro) {
    console.error('Erro ao salvar:', erro);
  }
});

async function carregarTransacoes() {
  try {
    const transacoes = await window.api.listarTransacoes(usuario.id); // usa o id do usuário
    lista.innerHTML = '';

    transacoes.forEach(t => {
      const li = document.createElement('li');
      li.classList.add(t.tipo_transacao.toLowerCase());

      li.innerHTML = `
        <div>
          <strong>${t.descricao}</strong><br>
          <small>${t.nome_categoria}</small>
        </div>
        <div>
          R$ ${parseFloat(t.valor).toFixed(2)}
        </div>
      `;

      lista.appendChild(li);
    });
  } catch (erro) {
    console.error('Erro ao carregar:', erro);
  }
}

carregarTransacoes();