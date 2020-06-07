

document.addEventListener("DOMContentLoaded", () => {

    let newForm = document.querySelector("#monster-creation-form")
    newForm.addEventListener("submit", handleMonsterSubmit )
    loadExtantMonsters()
});

function handleMonsterSubmit(e) {
    e.preventDefault()
    monster = {name: e.target[0].value, age: e.target[1].value, description: e.target[2].value}
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(monster)
    })
    .then( resp => resp.json() )
    .then( mon => renderOneMonster(mon))
}

function loadExtantMonsters() {
    console.log("Drogo")
    fetch("http://localhost:3000/monsters")
    .then(resp => resp.json() )
    .then( monAry => { monAry.forEach(renderOneMonster) })
}

function renderOneMonster(mon) {
    let container = document.querySelector("#monster-container")
    let monDiv = document.createElement("div")
    let np = document.createElement("h2")
    let yp = document.createElement("h4")
    let bp = document.createElement("p")

    np.innerText = mon.name
    yp.innerText = mon.age
    bp.innerText = mon.description

    container.append(np, yp, bp)

}
