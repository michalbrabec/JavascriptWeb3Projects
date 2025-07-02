let count = 0
let counter = document.getElementById("counter");
let saver = document.getElementById("save-p");
counter.innerText = count

console.log(counter)
console.log(saver)

function increment()
{
    count++;
    counter.innerText = count;
    console.log(count);
}

function save()
{
    saver.textContent += count + ' - '
    count = 0
    counter.innerText = count;
    console.log(count);
}