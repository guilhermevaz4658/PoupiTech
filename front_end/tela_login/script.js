async function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const resposta = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
        localStorage.setItem('token', dados.token);

        // redireciona pra tela principal
        window.location.href = '../tela_principal/index.html';
    } else {
        document.getElementById('mensagem').innerText = dados.erro;
    }
}

function irParaCadastro() {
  window.location.href = "../pagina_cadastro/index.html";
}