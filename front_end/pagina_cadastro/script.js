function limparErros() {
    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("erro");
    });

    document.getElementById("erroEmail").innerText = "";
    document.getElementById("erroSenha").innerText = "";
}

function cadastrar(event) {
    event.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const confirmarSenha = document.getElementById("confirmarSenha");
    const mensagem = document.getElementById("mensagem");
    const botao = document.getElementById("btnCadastrar");

    const erroEmail = document.getElementById("erroEmail");
    const erroSenha = document.getElementById("erroSenha");

    limparErros();
    mensagem.innerText = "";

    botao.innerText = "Cadastrando...";
    botao.disabled = true;

    setTimeout(() => {

        if (!nome.value || !email.value || !senha.value || !confirmarSenha.value) {
            mensagem.innerText = "Preencha todos os campos!";
            mensagem.style.color = "red";

            [nome, email, senha, confirmarSenha].forEach(campo => {
                if (!campo.value) campo.classList.add("erro");
            });

            resetBotao();
            return;
        }

        // VALIDAR EMAIL
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email.value)) {
            erroEmail.innerText = "Email inválido!";
            email.classList.add("erro");
            resetBotao();
            return;
        }

        // VALIDAR SENHA
        if (senha.value.length < 6) {
            mensagem.innerText = "Senha deve ter pelo menos 6 caracteres!";
            mensagem.style.color = "red";
            senha.classList.add("erro");
            resetBotao();
            return;
        }

        if (senha.value !== confirmarSenha.value) {
            erroSenha.innerText = "Senhas não coincidem!";
            senha.classList.add("erro");
            confirmarSenha.classList.add("erro");
            resetBotao();
            return;
        }

        // SALVAR USUÁRIO
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const existe = usuarios.some(user => user.email === email.value);

        if (existe) {
            mensagem.innerText = "Email já cadastrado!";
            mensagem.style.color = "red";
            email.classList.add("erro");
            resetBotao();
            return;
        }

        usuarios.push({
            nome: nome.value,
            email: email.value,
            senha: senha.value
        });

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        mensagem.innerText = "Cadastro realizado com sucesso!";
        mensagem.style.color = "green";

        nome.value = "";
        email.value = "";
        senha.value = "";
        confirmarSenha.value = "";

        setTimeout(() => {
            window.location.href = "../tela_login/index.html";
        }, 1200);

    }, 800);
}

function resetBotao() {
    const botao = document.getElementById("btnCadastrar");
    botao.innerText = "Cadastrar";
    botao.disabled = false;
}

function voltarLogin() {
    window.location.href = "../tela_login/index.html";
}