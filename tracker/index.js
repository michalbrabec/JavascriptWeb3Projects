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
delete x
console.log(x)
x["test"] = "haha"
console.log(x)