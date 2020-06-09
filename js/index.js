
addEventListener('DOMContentLoaded', function() {
    
    loadMonsters()
    createMonster()
})

function loadMonsters(){
    fetch('http://localhost:3000/monsters')
    .then( response => response.json() )
    .then( monsterData => {
        monsterData.forEach( (monster) => {renderMonster(monster)})
    })
}

function renderMonster(monster) {
    const container = document.querySelector("div#monster-container")

    let card = document.createElement('div')
    let name = document.createElement('h2')
    let age = document.createElement('h4')
    let description = document.createElement('p')

    name.innerText = monster.name
    age.innerText = `Age: ${monster.age}`
    description.innerText = `Bio: ${monster.description}`

    card.append(name, age, description)

    container.appendChild(card)
}

function createMonster() {

    const container = document.querySelector('div#create-monster')

    const monsterForm = document.createElement('form');
    monsterForm.id = 'monster-form'

    let nameInput = document.createElement('input')
    let ageInput = document.createElement('input')
    let descriptionInput = document.createElement('input')
    let submitBtn = document.createElement('button')

    nameInput.type = 'input'
    nameInput.id = 'name'
    nameInput.placeholder = 'name...'
    ageInput.type = 'input'
    ageInput.id = 'age'
    ageInput.placeholder = 'age...'
    descriptionInput.type = 'input'
    descriptionInput.id = 'description'
    descriptionInput.placeholder = 'description...'

    submitBtn.innerText = 'Create'



    monsterForm.append(nameInput, ageInput, descriptionInput, submitBtn);
    monsterForm.addEventListener("submit", handleSubmit);

    container.appendChild(monsterForm);

}

function handleSubmit(e){
    e.preventDefault();
    let age = e.target.elements.age.value
    let name = e.target.elements.name.value
    let description = e.target.elements.description.value
    e.target.reset();
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: name,
            age: age,
            description: description,
        }) 
    })
    .then(response => response.json() )
    .then( data => {
        renderMonster(data)
    })
    console.log(name, age, description)
}