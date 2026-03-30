function toggleSenha() {
    const input = document.getElementById("senha");
    input.type = input.type === "password" ? "text" : "password";
}

function toggleSenhaConfirm() {
    const input = document.getElementById("confirmarSenha");
    input.type = input.type === "password" ? "text" : "password";
}

function limparErros() {
    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("erro");
    });
}

function cadastrar() {
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const confirmarSenha = document.getElementById("confirmarSenha");
    const mensagem = document.getElementById("mensagem");
    const botao = document.getElementById("btnCadastrar");

    limparErros();
    mensagem.innerText = "";

    // loading
    botao.innerText = "Cadastrando...";
    botao.disabled = true;

    setTimeout(() => {

        if (!nome.value || !email.value || !senha.value || !confirmarSenha.value) {
            mensagem.innerText = "Preencha todos os campos!";
            [nome, email, senha, confirmarSenha].forEach(campo => {
                if (!campo.value) campo.classList.add("erro");
            });
            resetBotao(botao);
            return;
        }

        if (senha.value.length < 6) {
            mensagem.innerText = "A senha deve ter pelo menos 6 caracteres!";
            senha.classList.add("erro");
            resetBotao(botao);
            return;
        }

        if (senha.value !== confirmarSenha.value) {
            mensagem.innerText = "As senhas não coincidem!";
            senha.classList.add("erro");
            confirmarSenha.classList.add("erro");
            resetBotao(botao);
            return;
        }

        const usuarioExistente = JSON.parse(localStorage.getItem("usuario"));

        if (usuarioExistente && usuarioExistente.email === email.value) {
            mensagem.innerText = "Este email já está cadastrado!";
            email.classList.add("erro");
            resetBotao(botao);
            return;
        }

        const usuario = {
            nome: nome.value,
            email: email.value,
            senha: senha.value
        };

        localStorage.setItem("usuario", JSON.stringify(usuario));

        mensagem.style.color = "green";
        mensagem.innerText = "Cadastro realizado com sucesso!";

        nome.value = "";
        email.value = "";
        senha.value = "";
        confirmarSenha.value = "";

        setTimeout(() => {
            window.location.href = "../tela_login/index.html";
        }, 1200);

    }, 1200);
}

function resetBotao(botao) {
    botao.innerText = "Cadastrar";
    botao.disabled = false;
}

function voltarLogin() {
    window.location.href = "../tela_login/index.html";
}