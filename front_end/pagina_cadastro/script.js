function limparErros() {
    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("erro");
    });

    document.getElementById("erroEmail").innerText = "";
    document.getElementById("erroSenha").innerText = "";
}

async function cadastrar(event) {
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

    // VALIDAR CAMPOS
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

    // CHAMADA PARA API
    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome.value,
                email: email.value,
                senha: senha.value
            })
        });

        const data = await response.json();

        if (!response.ok) {
            if (data.errors) {
                data.errors.forEach(err => {
                    if (err.field === "email") {
                        erroEmail.innerText = err.message;
                        email.classList.add("erro");
                    }
                    if (err.field === "senha") {
                        erroSenha.innerText = err.message;
                        senha.classList.add("erro");
                    }
                });
            } else {
                mensagem.innerText = data.message;
                mensagem.style.color = "red";
            }

            resetBotao();
            return;
        }

        mensagem.innerText = "Cadastro realizado com sucesso!";
        mensagem.style.color = "green";

        nome.value = "";
        email.value = "";
        senha.value = "";
        confirmarSenha.value = "";

        setTimeout(() => {
            window.location.href = "../tela_login/index.html";
        }, 1200);

    } catch (error) {
        console.error(error);
        mensagem.innerText = "Erro ao conectar com o servidor!";
        mensagem.style.color = "red";
        resetBotao();
    }
}

function resetBotao() {
    const botao = document.getElementById("btnCadastrar");
    botao.innerText = "Cadastrar";
    botao.disabled = false;
}

function voltarLogin() {
    window.location.href = "../tela_login/index.html";
}