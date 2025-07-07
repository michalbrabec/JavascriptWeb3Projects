import {hello} from './main.js'

class Class {
    id
    #key

    constructor(id) {
        this.id = id
        this.#key = id
    }

    #log() {
        console.log(this.#key)
    }

    log() { this.#log() }
}

const cls = new Class('hello')
cls.log()

const response = await new Promise((resolve,reject) => {
    const req = new XMLHttpRequest()
    req.onreadystatechange = event => {
        if (req.response) {
            resolve(req.response)
        }
    }
    req.open('GET', "https://api.restful-api.dev/objects")
    req.send()
})
console.log(JSON.parse(response))

const resp = await fetch("https://api.restful-api.dev/objects")
const json = await resp.json()
console.log(json)

for (const x of document.querySelectorAll("div.CLS")) {
    x.textContent.innerText.innerHTML = 'HELLO'
}

const ev = new Event("TRIG", { detail: "HELLO" })
document.addEventListener("TRIG", (e) => console.log(e))

console.log(document.getElementById("dd"))
console.log(document.getElementById("dd").textContent)
console.log(document.getElementById("dd").innerText)
console.log(document.getElementById("dd").innerHTML)
document.getElementById("dd").innerText = 'HELLO<p>pp</p>'
document.getElementById("dd").addEventListener('mouseover', event => event.target.innerHTML="mouse")

console.log([2,3].filter(x => x>2))
const arr = [2,3]
arr.forEach(x => console.log(x))

document.getElementById("inp").innerText = "TEST"

class test {
    #name
    constructor(name) {
        this.#name = name
        this.pubName = name
    }

    #fun() {
        console.log(this.#name)
    }

    getName() {
        this.#fun()
        return this.#name
    }
}

let t = new test("mich")

console.log(JSON.stringify(t))
console.log(JSON.stringify(t.getName()))
console.log(JSON.stringify([4,5,6,8]))

let x = JSON.parse(JSON.stringify(t))

console.log(x)
x.getName = () => { return x.pubName }
console.log(x.getName())

x = 6
console.log(x)
x = "test"
console.log(x)

x = {
    test: 5,
    help: "tt"
}
console.log(x)
x.hhh = 4
console.log(x)
delete x.hhh
console.log(x)
console.log(x)
x["test"] = "haha"
console.log(x)