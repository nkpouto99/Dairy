// book class
class Pet {
    constructor(name, breed, age){
        this.name = name;
        this.breed = breed;
        this.age = age
    }

}

// ui class to add, remove books and show alert
class UI {
    static displayPets(){
        const pets = Store.getPets();

        pets.forEach((pet)=> UI.addBooksToList(pet))
    }
    static addPetsToList(pet) {
        const list = document.querySelector('#pet-list')

        // creating new tag/element
        const row = document.createElement('tr')

        row.innerHTML = `
         <td>${pet.name}</td>
         <td>${pet.breed}</td>
         <td>${pet.age}</td>
         <td><a href= "#" class = "btn btn-info btn-sm delete">X</a></td>
        `;

        list.appendChild(row)
    }
    static deletePet(el){
        if (el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message, className){
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#pet-form')
        container.insertBefore(div, form)
        setTimeout(()=> document.querySelector('.alert').remove(),5000)
    }
    static clearDefault(){
        document.querySelector('#name').value = '';
        document.querySelector('#breed').value = '';
        document.querySelector('#age').value = '';
    }

    
}
// store books
class Store {
    static getPets(){
        let pets
        if(localStorage.getItem('pets') === null){
            pets = []
        }else {
            pets = JSON.parse(localStorage.getItem('pets'))
        }

        return pets
    }
    static addPet(pet){
        const pets = Store.getPets()

        pets.push(pet)
        localStorage.setItem('pets', JSON.stringify(pets))
    }

    static removePet(age){
        const pets = Store.getPets()

        pets.forEach((pet, index)=>{
            if(pet.age === age){
                pets.splice(index, 1)
            }
        })
        localStorage.setItem('pets', JSON.stringify(pets))
    }
}
// event to display books
document.addEventListener('DOMContentLoaded', UI.displayPets)

//add books
document.querySelector('#pet-form').addEventListener('submit', (e)=>{

    e.preventDefault()
    // get form values
    const name = document.querySelector('#name').value
    const breed = document.querySelector('#breed').value
    const age = document.querySelector('#age').value

    //validate 
    if(name === '' || breed === '' || age === ''){
        UI.showAlert('please complete your pets details', 'danger')
    }else{
        const pet = new Pet(name, breed, age)

        // add book to list
        UI.addPetsToList(pet)

        // add book to the store
        Store.addPet(pet)

        UI.showAlert('Pet details added successfully', 'success')
    
        // remove value after submit
        UI.clearDefault()
    }
    // instantiate book

})

// remove a book
document.querySelector('#pet-list').addEventListener('click', (e)=>{
    // add book to list
    UI.deletePet(e.target)

    // add book to store
    Store.removePet(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert('Pet details successfully deleted', 'info')
})