    
document.addEventListener('DOMContentLoaded', function (){
    console.log("here")
    fetchMonsters();
    // document.querySelector('form').addEventListener('submit', createMonster)
    createForm();
})

function fetchMonsters() {
    fetch("http://localhost:3000/monsters")
    .then(resp => resp.json())
    .then(monsterarr => {
        console.log(monsterarr)
        monsterarr.forEach(monster => {
       
            renderMonster(monster)
        })
     }
    )
}

function renderMonster(monster) {
   let div = document.querySelector('#monster-container')
   let nameNode = document.createElement('h1')
   nameNode.innerText = monster.name

   let ageNode = document.createElement('h4')
   ageNode.innerText = `age: ${monster.age}`

   let bioNode = document.createElement('h5')
   bioNode.innerText = `bio: ${monster.description}`


   div.append(nameNode,ageNode,bioNode)

}

function createForm(){

    let div = document.querySelector('#create-monster')
    let input1 = document.createElement('input')
    input1.placeholder = ('name...')
    input1.className = ('ip1')
    let input2 = document.createElement('input')
    input2.placeholder = ('age...')
    input2.className = ('ip2')
    let input3 = document.createElement('input')
    input3.placeholder = ('description...')
    input3.className = ('ip3')
    let btn = document.createElement('button')
    btn.innerText = ("create")
    btn.addEventListener('click', createMonster)
    


    div.append(input1,input2,input3,btn)
}

function createMonster(e) {
    e.preventDefault()
    postMonster()
}

function postMonster(e){

    let newMonster = {
        name: document.querySelector('.ip1').value,
        age: document.querySelector('.ip2').value,
        description: document.querySelector('.ip3').value
    }
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newMonster)
    })
    .then(resp => resp.json())
    .then(createdMonster => renderMonster(createdMonster))

    // document.querySelector('form').reset()
}




  