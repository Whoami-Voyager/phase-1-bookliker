document.addEventListener("DOMContentLoaded", getBooks);

function getBooks() {
    fetch("http://localhost:3000/books")
        .then(r => r.json())
        .then(books => books.forEach(book => createDescription(book)))
}

function createDescription(book) {
    const list = document.getElementById("list-panel")
    const listBook = document.createElement('li')
    listBook.textContent = book.title
    list.append(listBook)
    listBook.addEventListener("click", () => showBookDetail(book))
}

function showBookDetail(book) {
    const showPanel = document.getElementById('show-panel')
    const h1 = document.createElement("h1")
    const h2 = document.createElement("h2")
    const h20 = document.createElement("h2")
    const p = document.createElement("p")
    const img = document.createElement("img")
    const users = document.createElement("ul")
    const button = document.createElement("button")
    h1.textContent = book.title
    h2.textContent = book.subtitle
    h20.textContent = `By ${book.author}`
    p.textContent = book.description
    img.src = book.img_url
    button.textContent = "Like"

    book.users.forEach(user => {
        const userListItem = document.createElement("li")
        userListItem.textContent = user.username
        users.append(userListItem)
    })

    while (showPanel.firstChild) {
        showPanel.removeChild(showPanel.lastChild)
    }
    showPanel.append(h1, h2, h20, p, img, users, button)

    button.addEventListener("click", () => submitLike(book))
}

function submitLike(book) {
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "users": [...book.users, { "id": 1, "username": "pouros" }]
        })
    })
        .then(r => r.json())
        .then(book => showBookDetail(book))
}

function deleteLike(book){
    fetch (`http://localhost:3000/books/${book.id}`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "users": [...book.users, { "id": 1, "username": "pouros" }]
        })
        
    }
}