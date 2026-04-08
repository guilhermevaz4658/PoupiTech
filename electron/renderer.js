async function getUsers() {
  try {
    const response = await fetch("http://localhost:3000/users")
    const users = await response.json()

    const list = document.getElementById("usersList")
    list.innerHTML = ""

    users.forEach(user => {
      const li = document.createElement("li")
      li.textContent = `${user.nome} - ${user.email}`
      list.appendChild(li)
    })
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
  }
}