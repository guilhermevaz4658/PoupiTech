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

// ===== VALIDAÇÃO EM TEMPO REAL =====


// EMAIL
email.addEventListener("input", () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email.value)) {
        email.classList.add("erro");
        erroEmail.innerText = "Insira um e-mail válido (ex: nome@email.com)";
    } else {
        email.classList.remove("erro");
        erroEmail.innerText = "";
    }
});

// SENHAS
function validarSenhas() {
    if (confirmarSenha.value === "") {
        confirmarSenha.classList.remove("erro");
        erroSenha.innerText = "";
        return;
    }

    if (senha.value !== confirmarSenha.value) {
        senha.classList.add("erro");
        confirmarSenha.classList.add("erro");
        erroSenha.innerText = "As senhas não coincidem";
    } else {
        senha.classList.remove("erro");
        confirmarSenha.classList.remove("erro");
        erroSenha.innerText = "";
    }
}

senha.addEventListener("input", validarSenhas);
confirmarSenha.addEventListener("input", validarSenhas);

// ===== FUNÇÕES =====

function limparErros() {
    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("erro");
    });
    erroEmail.innerText = "";
    erroSenha.innerText = "";
}

function cadastrar(event) {
    event.preventDefault();

    limparErros();
    mensagem.innerText = "";
    mensagem.style.color = "red";

    botao.innerText = "Cadastrando...";
    botao.disabled = true;

    setTimeout(() => {

        if (!nome.value || !email.value || !senha.value || !confirmarSenha.value) {
            mensagem.innerText = "Preencha todos os campos!";
            [nome, email, senha, confirmarSenha].forEach(campo => {
                if (!campo.value) campo.classList.add("erro");
            });
            resetBotao();
            return;
        }

        // VALIDAR EMAIL
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email.value)) {
            email.classList.add("erro");
            erroEmail.innerText = "Insira um e-mail válido (ex: nome@email.com)";
            resetBotao();
            return;
        }

        // VALIDAR SENHA
        if (senha.value.length < 6) {
            mensagem.innerText = "A senha deve ter pelo menos 6 caracteres!";
            senha.classList.add("erro");
            resetBotao();
            return;
        }

        if (senha.value !== confirmarSenha.value) {
            erroSenha.innerText = "As senhas não coincidem";
            senha.classList.add("erro");
            confirmarSenha.classList.add("erro");
            resetBotao();
            return;
        }
        
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const emailJaExiste = usuarios.some(user => user.email === email.value);

        if (emailJaExiste) {
            mensagem.innerText = "Este email já está cadastrado!";
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

        mensagem.style.color = "green";
        mensagem.innerText = "Cadastro realizado com sucesso!";

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
    botao.innerText = "Cadastrar";
    botao.disabled = false;
}

function voltarLogin() {
    window.location.href = '../tela_login/index.html';
}