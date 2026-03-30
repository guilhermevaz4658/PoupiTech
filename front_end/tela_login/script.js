async function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const resposta = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            console.log("Login OK ✅"); // 👈 AQUI FOI ADICIONADO

            localStorage.setItem('token', dados.token);

            // redireciona pra tela principal
            window.location.href = '../tela_principal/index.html';

        } else {
            console.log("Erro no login ❌"); // 👈 AQUI FOI ADICIONADO
            document.getElementById('mensagem').innerText = dados.erro;
        }

    } catch (erro) {
        console.log("Erro na conexão com o servidor ❌", erro); // 👈 NOVO
        document.getElementById('mensagem').innerText = "Erro ao conectar com o servidor";
    }
}

function irParaCadastro() {
    window.location.href = "../pagina_cadastro/index.html";
}