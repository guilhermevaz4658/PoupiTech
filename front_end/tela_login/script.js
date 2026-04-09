document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", login);
});

async function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const mensagem = document.getElementById("mensagem");

    mensagem.innerText = "";

    if (!email || !senha) {
        mensagem.innerText = "Preencha todos os campos!";
        mensagem.style.color = "red";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (!response.ok) {
            mensagem.innerText = data.message || "Erro no login!";
            mensagem.style.color = "red";
            return;
        }

        localStorage.setItem("usuarioLogado", JSON.stringify(data.usuario));

        mensagem.innerText = "Login realizado com sucesso!";
        mensagem.style.color = "green";

        setTimeout(() => {
            window.location.href = "../tela_principal/index.html";
        }, 800);

    } catch (error) {
        console.error(error);
        mensagem.innerText = "Erro ao conectar com o servidor";
        mensagem.style.color = "red";
    }
}

// Função para ir para a tela de cadastro
function irParaCadastro() {
    window.location.href = "../pagina_cadastro/index.html";
}