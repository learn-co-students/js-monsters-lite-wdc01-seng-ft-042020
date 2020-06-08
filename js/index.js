//user stories
//see all the monsters when the page loads
//create a new monster

//EVENTS
//fetching
//DOM

//when <some event> happens, I want to make a <what kind> of fetch request and manipulate the DOM <how?>
//when DOMContentLoaded, make a GET request to /monsters, render the name, age, and bio
//when the form is submitted, I want to make a POST fetch to /monsters, and manipulate DOM by rendering new monster

document.addEventListener('DOMContentLoaded', function(){
    fetchMonsters()
    document.querySelector('form').addEventListener('submit', handleSubmit)
})

function handleSubmit(e) {
    e.preventDefault()
    postMonster()
}

function postMonster() {
    let obj = {
        name: document.querySelector('#name-input').value,
        age: document.querySelector('#age-input').value, 
        description: document.querySelector('#bio-input').value
    }
    fetch('http://localhost:3000/monsters/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, 
        body: JSON.stringify(obj)
    }).then(resp => resp.json())
    .then(newMonster => renderOneMonster(newMonster))

}

function fetchMonsters() {
    fetch('http://localhost:3000/monsters/')
    .then(resp => resp.json())
    .then(monsters => renderMonsters(monsters))
}

function renderMonsters(monsters){
    //iterate through monsters, for each monster call renderMonster(monsters)
    for(monster of monsters){
        renderOneMonster(monster)

    }
}

function renderOneMonster(monster){
    // debugger
    // console.log('render a single monster', monster)
    let container = document.querySelector('#monster-container')

    let ageNode = document.createElement('h4')
    ageNode.innerText = `Age: ${monster.age}`
    let bioNode = document.createElement('p')
    bioNode.innerText = `Bio: ${monster.description}`

    let nameNode = document.createElement('h3')
    nameNode.addEventListener('click', deleteMonster)
    nameNode.innerText = monster.name
    nameNode.id = monster.id

    container.append(nameNode, ageNode, bioNode)

}

function deleteMonster(e) {
    // debugger
    let monsterID = e.target.id
    fetch(`http://localhost:3000/monsters/${monsterID}`, {
        method: 'DELETE'
    }).then(resp => resp.json())
    .then(data => {
        document.querySelector(`${monsterID}`).remove()
    })

}