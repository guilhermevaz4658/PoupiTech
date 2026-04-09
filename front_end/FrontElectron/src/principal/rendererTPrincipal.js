// ================= TELA PRINCIPAL =================

function carregarUsuario() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!usuario) {
    window.api.mudarTela('login');
    return;
  }

  const boasVindas = document.getElementById('boasVindas');

  if (boasVindas) {
    boasVindas.textContent = `Olá, ${usuario.nome} 👋`;
  }
}

// ================= TRANSAÇÕES =================

let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];

function salvarTransacoes() {
  localStorage.setItem('transacoes', JSON.stringify(transacoes));
}

function atualizarSaldo() {
  const saldoElemento = document.getElementById('saldoValor');

  let saldo = 0;

  transacoes.forEach(t => {
    if (t.tipo === 'Receita') saldo += t.valor;
    else saldo -= t.valor;
  });

  if (saldoElemento) {
    saldoElemento.textContent = saldo.toFixed(2);
  }
}

function renderizarLista() {
  const lista = document.getElementById('lista');
  if (!lista) return;

  lista.innerHTML = '';

  transacoes.forEach((t, index) => {
    const li = document.createElement('li');

    li.classList.add(t.tipo === 'Receita' ? 'receita' : 'despesa');

    li.innerHTML = `
      ${t.descricao} - R$ ${t.valor.toFixed(2)}
      <div>
        <button onclick="editarTransacao(${index})">✏️</button>
        <button onclick="removerTransacao(${index})">❌</button>
      </div>
    `;

    lista.appendChild(li);
  });
}

function adicionarTransacao() {
  const descricao = document.getElementById('descricao');
  const valor = document.getElementById('valor');
  const tipo = document.getElementById('tipo');
  const categoria = document.getElementById('categoria');

  if (!descricao.value || !valor.value) {
    alert('Preencha todos os campos');
    return;
  }

  const novaTransacao = {
    descricao: descricao.value,
    valor: parseFloat(valor.value),
    tipo: tipo.value,
    categoria: categoria ? categoria.value : 'Outros',
    data: new Date().toISOString()
  };

  transacoes.push(novaTransacao);

  salvarTransacoes();
  atualizarSaldo();
  renderizarLista();
  atualizarGraficoCategoria();

  descricao.value = '';
  valor.value = '';
}

// ================= EDITAR / REMOVER =================

window.removerTransacao = function (index) {
  transacoes.splice(index, 1);

  salvarTransacoes();
  atualizarSaldo();
  renderizarLista();
  atualizarGraficoCategoria();
};

window.editarTransacao = function (index) {
  const t = transacoes[index];

  const novaDescricao = prompt('Editar descrição:', t.descricao);
  const novoValor = prompt('Editar valor:', t.valor);

  if (novaDescricao && novoValor) {
    t.descricao = novaDescricao;
    t.valor = parseFloat(novoValor);

    salvarTransacoes();
    atualizarSaldo();
    renderizarLista();
    atualizarGraficoCategoria();
  }
};

// ================= MENU / TELAS =================

function mostrarTela(id) {
  document.querySelectorAll('.tela').forEach(t => {
    t.classList.remove('ativa');
  });

  document.getElementById(id).classList.add('ativa');

  if (id === 'categorias') carregarCategorias();
}

// ================= CATEGORIAS =================

function carregarCategorias() {
  const lista = document.getElementById('listaCategorias');
  if (!lista) return;

  lista.innerHTML = '';

  const mapa = {};

  transacoes.forEach(t => {
    if (!mapa[t.categoria]) mapa[t.categoria] = 0;
    mapa[t.categoria] += t.valor;
  });

  for (let cat in mapa) {
    const li = document.createElement('li');
    li.textContent = `${cat}: R$ ${mapa[cat].toFixed(2)}`;
    lista.appendChild(li);
  }
}

// ================= GRÁFICO POR CATEGORIA =================

let graficoCategoria;

function atualizarGraficoCategoria() {
  const ctx = document.getElementById('graficoCategoria');
  if (!ctx) return;

  const mapa = {};

  transacoes.forEach(t => {
    if (!mapa[t.categoria]) mapa[t.categoria] = 0;
    mapa[t.categoria] += t.valor;
  });

  const labels = Object.keys(mapa);
  const valores = Object.values(mapa);

  if (graficoCategoria) graficoCategoria.destroy();

  graficoCategoria = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: valores,
        backgroundColor: [
          '#2ecc71',
          '#e74c3c',
          '#3498db',
          '#f1c40f',
          '#9b59b6'
        ]
      }]
    }
  });
}

// ================= RELATÓRIO MENSAL =================

function relatorioMensal() {
  const ctx = document.getElementById('graficoRelatorio');
  if (!ctx) return;

  const meses = {};

  transacoes.forEach(t => {
    const data = new Date(t.data);
    const mes = data.getMonth() + 1;

    if (!meses[mes]) meses[mes] = 0;

    if (t.tipo === 'Receita') meses[mes] += t.valor;
    else meses[mes] -= t.valor;
  });

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(meses).map(m => `Mês ${m}`),
      datasets: [{
        label: 'Saldo',
        data: Object.values(meses),
        backgroundColor: '#3498db'
      }]
    }
  });
}

// ================= EVENTOS =================

document.addEventListener('DOMContentLoaded', () => {
  carregarUsuario();

  const botao = document.getElementById('btnAdicionar');
  if (botao) botao.addEventListener('click', adicionarTransacao);

  atualizarSaldo();
  renderizarLista();
  atualizarGraficoCategoria();

  mostrarTela('dashboard');
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar = document.getElementById("sidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("recolhida");
    });
  }
});