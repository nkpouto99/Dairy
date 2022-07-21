// book class
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }

}

// ui class to add, remove books and show alert
class UI {
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach((book)=> UI.addBooksToList(book))
    }
    static addBooksToList(book) {
        const list = document.querySelector('#book-list')

        // creating new tag/element
        const row = document.createElement('tr')

        row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href= "#" class = "btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row)
    }
    static deleteBook(el){
        if (el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message, className){
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(div, form)
        setTimeout(()=> document.querySelector('.alert').remove(),3000)
    }
    static clearDefault(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    
}
// store books
class Store {
    static getBooks(){
        let books
        if(localStorage.getItem('books') === null){
            books = []
        }else {
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books
    }
    static addBook(book){
        const books = Store.getBooks()

        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn){
        const books = Store.getBooks()

        books.forEach((book, index)=>{
            if(book.isbn === isbn){
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
}
// event to display books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

//add books
document.querySelector('#book-form').addEventListener('submit', (e)=>{

    e.preventDefault()
    // get form values
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value

    //validate 
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('please enter all fields', 'danger')
    }else{
        const book = new Book(title, author, isbn)

        // add book to list
        UI.addBooksToList(book)

        // add book to the store
        Store.addBook(book)

        UI.showAlert('Book added', 'success')
    
        // remove value after submit
        UI.clearDefault()
    }
    // instantiate book

})

// remove a book
document.querySelector('#book-list').addEventListener('click', (e)=>{
    // add book to list
    UI.deleteBook(e.target)

    // add book to store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert('Book removed', 'success')
})