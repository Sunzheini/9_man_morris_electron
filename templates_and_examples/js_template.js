let a = 5
let b = 8

if (b > a) {
    console.log(b)
}


// ---------------- //
function solve(firstNumber, secondNumber) {
    console.log(firstNumber + secondNumber)
}

solve(5, 4)


// ---------------- //
function solve2(name, age) {
    let output = `My name is ${name} and age is ${age}`;
    console.log(output);
}

solve2('Daniel', 20);


// ---------------- //
function solve3(grade) {
    console.log(grade.toFixed(2));
}

solve3(4.44242);    //4.44, returns a rounded string!


// ---------------- //
let isTrue = true;
let empty = null;
let unknown = undefined; //ne deklarirana promenliva


// ---------------- //
function solve4() {
    //for (let index = 0; index < 5; index++) {     let has block scope, use this!
    for (var index = 0; index < 5; index++) {
    }
    console.log(index)
}

solve4();


// ---------------- //
// arithmetic operators: +, -, *, /, %, **
console.log(Math.floor(7/3))    // 2


let num = 1;                //number sluji za int i float
let name = 'Daniel';
let output = name + num;
console.log(output);        // Daniel1
console.log(typeof output);  // string

let arr = [];   // array
let obj = {};   // object


// ---------------- //
console.log(1 == '1');      // sravnqva stoinostta,     true
console.log(1 === '1');     // sravnqva stoinostta i tipa,    false
console.log(3 != '3');
console.log(3 !=='3');


// ---------------- //
let first = 7;
if (5 <= first && first <= 20) {
    console.log('blahblah')
} else {
    console.log('gg')
}


// ---------------- //
let named = 'Daniel'
switch (named) {
    case 'Daniel':
        console.log(named);
        break;

    default:
        console.log('default');
        break;
}


// ---------------- //
// ! - not, && - AND, || - OR


// ---------------- //
let i = 1
while (i <= 5) {
    console.log(i);
    i++;
}


// ---------------- //
// arrays are like lists in python: no fixed lenght and diff types inside

let numbersArray = [10, 20, 'hello'];
console.log(`Lenght is: ${numbersArray.length}`);
// console.log(numbersArray[-1])       // doesnt work!

let numbersArray2 = [1, 2, 3];
let [firstN, secondN, thirdN, fourthN] = numbersArray2; // unpacking
console.log(firstN)     // 1
console.log(fourthN)    //undefined

let numbersArray3 = [1, 2, 3, ...[4, 5, 6]];
console.log(numbersArray3)  // (6) [1, 2, 3, 4, 5, 6]



// ---------------- //
function solve5(name, ...otherParams) {     // like: *args
    console.log(name);
    console.log(otherParams);   // (3) ['Maxi', 'is', 'noob']

    for (const el of otherParams) {     // like: for item in list, but cant change the items!
        console.log(el);
    }
}

solve5('Daniel', 'Maxi', 'is', 'noob')


// ---------------- //
let numbersArray4 = [1, 2, 3, 4, 5, 6];
let output4 = numbersArray4.join(', ');     // like python
console.log(output4);


// ---------------- //
// .pop()   pop
// .push()   append
// .shift()   popleft
// .unshift()   appendleft

// .reverse()
// .join(', ')
// .map((num) => num * 2)
// .filter((num) => num % 2 === 0)
// nqma insert, a se polzva splice


// ---------------- //
// sort()
function listOfNames(namesArray) {
    return [...namesArray]                                  // zapazva originalniq masiv
        .sort((aName, bName) => aName.localeCompare(bName)) // names ascending
        .map((el, index) => `${index + 1}.${el}`)
        .join('\n')
}
listOfNames(["John", "Bob", "Christina", "Ema"])
console.log(listOfNames(["John", "Bob", "Christina", "Ema"]))


myArray.sort((aNumber, bNumber) => aNumber - bNumber) // numbers ascending


// ---------------- //
let numbersArray5 = [1, 2, 3, 4, 5, 6];
console.log(numbersArray5.slice(1));        // vzima ot 1 natatyk
console.log(numbersArray5.slice(1, 3));     // (2) [2, 3]
console.log(numbersArray5.splice(0, 2));     // (2) [1, 2] are deleted
console.log(numbersArray5.splice(0, 2));     // (2) [0, 2, ...toInsert] substitutes elements

numbersArray5.forEach((num) => {        // another method of iteration
    console.log(num);
})


// ---------------- //
// .split(', ')
// .includes()  // returns true or false


// ---------------- //
let text1 = 'Hello' + ', MF'
console.log(text1.indexOf('llo'));  // index of substring is: 2
console.log(text1.substring(0, 3))  // returns substring from index 0 to index 2
console.log(text1.replace('He', 'Gd'))  // replaces He with Gd 1 time only

string7 = '*'.repeat(4)
console.log(string7)        // ****


// Day 2
// ---------------- //
myString = String(myNumber)


// ---------------- //
// .indexOf()
//if (templateArray[i].indexOf('*') !== -1)  // ako * ne e vytre vryshta -1!


// ---------------- //
'abc'.charCodeAt(0) // check the 0 index of the string and returns 97 from ASCI


// Day 3
// ---------------- //
printStars(4)       // moje da se izvikva predi deklaraciqta
function printStars(n) {
    console.log("*".repeat(n))
}


// prisvoqvane na funkciq kym promenliva
const printStars2 = function (n) {
    console.log("*".repeat(n))
}
printStars2(3)


function multiplyNumbers(params) {
    let sum = 1
    for (let i = 0; i < params.length; i++) {
        sum += params[i]
    }
    sum = sum ** 3        // !
    return sum
}
console.log(multiplyNumbers([5, 6, 7, 8]))


console.log(Number.isInteger(4))    // true


// first class functions:
// we pass them as arguments to another function,
// or they are returned by other functions,
// or they are assigned to a variable


function multF(value) {
    return value * 2
}
let numbers = [1, 2, 3, 4, 5, 6, 7]
let newNumbers = numbers.map(multF)     // !
console.log(newNumbers)


let increment = x => x + 1      // lambda f
console.log(increment(4))


// Day 4
// ---------------- //
function smallestOfThree(firstNum, secondNum, thirdNum) {
    return Math.min(firstNum, secondNum, thirdNum)      // ! min
}


//         let temp = String.fromCharCode(i)       // ! fromCharCode


let revArray = [...myString].reverse()   // ! string to array.reverse


// new Array(3)    // empty * 3
// new Array(7).fill(7)    // [7, 7, 7, 7, 7, 7, 7]
// new Array(7).fill(new Array(7).fill(7)) // matrix


// Day 5
// ---------------- //

// ------- objects
let person = {
    name: 'Daniel',
    age: 20,
    height: 181,
    'my grades': [4, 5, 6],      // '' kogato ima space v imeto
    info: {seven: 5, eight: 9},
    sayHello: function () {
             return `${this.name} ${this.age}`   // this == self
    },
    anotherFunc() {    // po kratko deklarirane
         this.age -= 2  // mojem da promenqme systoqnieto na propertitata
    },
}


// person['lastName'] = 'Zorov'        // dobavqne na novo property
//let person3 = {firstName, lastName, age}    // moje i taka vyv funkciq poluchavashta tezi parametri

// console.log(person.lastName)        // dostypvane s .
// console.log(person['my grades'])     // dostypvane s []

// delete person.lastName              // triene


// tuple v js e masiv s 2 elementa


// console.log(Object.keys(person5))    // [ 'firstName', 'lastName', 'age', 'sayHello' ]
// console.log(Object.values(person5))  // [ 'Daniel', 'Zorov', 29, [Function: sayHello] ]
// console.log(Object.entries(person5)) //  [['firstName', 'Daniel' ], ...]
//
// for (const key of Object.keys(person5)) {
//     console.log(person5[key])
// }
//
// for (const [key, value] of Object.entries(person5)) {
//     console.log(`${key} ${value}`)
// }


// JSON, obekt v koito kliuchovete trqbva da sa v ""

// let jsonString = JSON.stringify(personJson)      // pravi na json (slaga "", maha funkciite)
// let personObjAgain = JSON.parse(jsonString)      // pak na object


// .hasOwnProperty(name) - proverqva ima li takova property


// za da sortirame pyrvo go pravim na masiv s .entries

// const entries = Object.entries(people) // [[],[],[]]
// let sortedByName = entries.sort(
//     (personA, personB) => {
//         let personAName = personA[0]
//         let personBName = personB[0]
//         return personAName.localeCompare(personBName)
//     }
// )


// ------- Classes
class Student {
    constructor(name, age, grades) {
        this.name = name
        this.age = age
        this.grades = grades;
    }
    sayHello() {
        console.log(`${this.name} says hi`)
    }
}

const studentOne = new Student('Daniel', 19, [1, 2, 3])
studentOne.sayHello()


// day 6
// function parseEmployees(input) {
//     let employeesObj = input        // ot masiv v obekt s .reduce
//         .reduce((data, employee) => {
//             data[employee] = employee.length
//             return data
//         }, {})


// for of e za masivi, for in e za obekti


// let combined = [...currentStock, ...orderedProducts]    // 2 masiva v 1


// let movie = moviesArray.find((m) => m.name === name)       // returns first object acc. to criteria


// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //


// day 7
// script tagovete da sa nai otdolu v html v body taga

// DOM: transforms html elements into js objects    // react works with the dom tree


// ------------------------------- DOM methods
// all li's as collection (similar to but not an array)
let liElements = document.getElementsByTagName('li')
for (const liElement of liElements) {
    liElement.textContent += " -- naga --"
}
// first li
let liElement = document.getElementsByTagName('li')[0]
liElement.textContent += " - DONEZ"   // add this to the text of the li

// getElementsByClassName('list-item')  // vryshta kolekciq

// atributite koito se slagat v taga idvat kato propertita
console.log(liElements[2].id)   // pechata 'third', koeto e id na li-to

// add a class to third li
liElements[2].setAttribute('class', 'nagga')
console.log(liElements[2].className)

liElements[2].classList.add('text', 'new')  // add classes
liElements[2].classList.remove('text', 'new')  // remove classes
liElements[2].classList.contains('text')  // search if contains

// add inner element into second li
liElements[1].innerHTML += '<p>inner paragraph</p>'

// change the style
liElements[1].style.backgroundColor = 'green'

// value ot input, vinagi vryshta string!
let inValue = document.getElementById('textInput') // 1 element zashtoto id e unikalno
inValue.value = 'Changed Value'
console.log(inValue.value)


// printirane html na cqlata stranica
const html = document.getElementsByTagName('html')[0]
console.log(html)


// onclick
function calc() {
    let firstInput = document.getElementById('num1')
    let secondInput = document.getElementById('num2')
    let sumInput = document.getElementById('sum')
    sumInput.value = Number(firstInput.value) + Number(secondInput.value)
}


// .textContent - vzima teksta
// .innerText   - vzima i maha space-ovete


// change hidden / visible
function showTextAndChangeBgColor() {
    let elementMore = document.getElementById('more')
    let elementText = document.getElementById('text')
    let html = document.getElementsByTagName('html')[0]

    elementMore.style.display = 'none'
    elementText.style.display = 'inline'
    html.style.backgroundColor = 'green'
}


// querySelector - like in css ('.list-item > n')  // pyrviq element
// querySelectorAll - like in css ('.list-item > n')  // vsichki


// ----------------- NodeList vs HTMLCollection ------------------
// NodeList is returned by querySelector and querySelectorAll
// the other return HTMLCollection

// vinagi pri queryselector da obryshtame kym masiv
// za da polzvame metodite mu
const liItems = Array.from(document.querySelectorAll('ul > li'))


function extractText() {
    let liItems = Array.from(document.querySelectorAll('#items > li'))
    let textItem = document.getElementById('result')

    for (const liItem of liItems) {
        textItem.textContent += liItem.textContent += '\n'
    }
}


// ----------------- Parents and Children ------------------
let liItemz = Array.from(document.getElementsByTagName('li'))
let firstLz = liItemz[0]
console.log(firstLz.parentElement)      // returns parent element ul
console.log(firstLz.parentElement.parentElement)      // body
console.log(firstLz.children)           // returns masiv ot children


// create a DOM element and attach it
let p = document.createElement('p')
p.textContent = 'This is a new p'
firstLz.appendChild(p)

// remove
// firstLz.removeChild(p)   // ili p.remove()

// replace
// firstLz.removeChild(new_p, old_p)


function addItem() {
    const ulContainer = document.getElementById('items')
    const input = document.getElementById('newItemText')
    const newLi = document.createElement('li')

    newLi.textContent = input.value
    ulContainer.appendChild(newLi)
    input.value = ''
}


function deleteByEmail() {
    const input = document.querySelector('input[name="email"]')
    const evenTds = Array.from(document.querySelectorAll('td:nth-child(odd)'))
    const result = document.getElementById('result')

    let emailValue = input.value
    let foundElement = evenTds.find((td) => td.textContent === emailValue)

    if (foundElement) {
        foundElement.parentElement.delete()
        result.textContent = 'Deleted'
    } else {
        result.textContent = 'Not found'
    }
}


// ----------------- DOM events ------------------
// click, mouseover, mouseout, mousedown, mouseup
// keydown, Keypress keyup
// touchstart, touchend, touchmove, touchcancel
// focus (got focus), blur (lost focus) - za input poleta
// load, unload, resize, dragstart, dragdrop
// input, change, submit, reset - za formi


// kak gi zakachame:

// 1
// v html taga s onlick=""

// 2
button1.addEventListener('click', funcHandler) // condition, func
button1.removeEventListener('click', funcHandler)

function funcHandler(e) {
    console.log(e.target.id)   // vzemam id na butona
}


function addItemAndDelete() {
    const ulContainer = document.getElementById('items')
    const input = document.getElementById('newItemText')

    const newLi = document.createElement('li')
    const newAnchor = document.createElement('a')

    newLi.textContent = input.value
    newAnchor.textContent = 'Delete'
    newAnchor.setAttribute('href', '#')
    newAnchor.addEventListener('click', deleteHandler)

    newLi.appendChild(newAnchor)
    ulContainer.appendChild(newLi)
    input.value = ''

    function deleteHandler(e) {
        const liItem = e.currentTarget.parentElement
        // const liItem = this.parentElement   // syshtoto
        liItem.remove()
    }
}


// day 8
// <body onload="focused()">
// kogato se zaredi bodyto, se izvikva funkciq focused!


// zaradi judge da polzvame Array.from kydeto moje


for (const word of words) {
         myDiv.innerHTML += '<div><p>'+`${word}`+'</p></div>'    // !
     }


// kogato v edin buton ima dobaven onclick, nqma nujda ot event listener!!!!!!!


// function lockedProfile() {
//     let allButtons = Array.from(document.getElementsByTagName('button'))
//
//     for (const button of allButtons) {
//         button.addEventListener('click', funcHandler)
//     }
//
//     // dostypvaiki buton, dostyp do elementite okolo nego!
//     function funcHandler(e) {
//         let currentButton = e.target
//         let hd = Array.from(currentButton.parentElement.children)[9]
//
//         // select the locked input !!!!!!!!!!!!!!!!!!!
//         let lockRadioInput = Array.from(currentButton.parentElement.children)[2]
//
//         // check if locked !!!!!!!!!!!
//         if (lockRadioInput.checked === false) {
//             if (currentButton.textContent === 'Show more') {
//                 hd.style.display = 'block'
//                 currentButton.textContent = 'Hide it'
//             } else {
//                 hd.style.display = 'none'
//                 currentButton.textContent = 'Show more'
//             }
//         }
//     }
// }


// ako nema nishto kato inline style naprimer v nqkoi div
// ne pravi proverki s if (d.style === 'none'), a s drugo napr
// teksta na butona
// zashtoto trqbva da cykash 2 pyti s butona za da raboti !!!!!!!


//             if (td2.textContent.includes(searchValue)) {    // includes!!!!!


// ako pishem v textarea, to vliza kato value a ne kato text content!


// 9
// Asynchronous: pyrvo se izpylnqvat sinhronnite, posle asinhr operacii
// console.log('Hello1')
// setTimeout(
//     () => {
//         console.log('Hello2')
//     }, 1000             // after 1 sec
// )
// console.log('Hello3')


// setInterval(
//     () => {
//         console.log('print each 1 sec')
//     }, 1000             // repeat each sec
// )


// Promise with then
// new Promise(
//     (resolve, reject) => {
//         setTimeout(
//             () => {
//                 resolve({id: 1, name: 'Daniel'})
//             }, 500
//         )
//     }
// ).then((res) => {           // poluchavam podadeniq gore obekt tuk
//     console.log(res)
// })

// Promise with catch
// new Promise(
//     (resolve, reject) => {
//         setTimeout(
//             () => {
//                 reject('Something is wrong')
//             }, 500
//         )
//     }
// ).catch((err) => {           // poluchavam syobshtenieto tuk
//     console.error(err)
// })

// Promise with finally
// new Promise(
//     (resolve, reject) => {
//         setTimeout(
//             () => {
//                 resolve({id: 1, name: 'Daniel'})
//             }, 500
//         )
//     }
// ).finally(() => {           // poluchavam syobshtenieto tuk
//     console.error('Prints anyway')
// })


// function loadRepos() {
//     const BASE_URL = 'https://api.github.com/users/testnakov/repos'
//     const resultContainer = document.getElementById('res')
//     fetch(BASE_URL, {method: 'GET'})
//         .then((res) => res.text())
//         .then((data) => {
//             resultContainer.textContent = data
//         })
//         .catch((err) => {
//             console.error(err)
//         })
// }


// Async / Await> zamaskira rabotata s promisi


// 10
// 1                            // Use as a template

// npm install == pip install
// package.json == requirements.txt

// 1: nov terminal 'server' --> v papkata na servera --> node server,
// 2: nov terminal 'js-front-end' --> v papkata na zadachata --> npm install --> npm start
// 3: nov terminal 'test' --> v papkata na zadachata --> npm test
function getInfo() {
    // select the elements
    const stopIdInput = document.getElementById('stopId')
    const stopNameDiv = document.getElementById('stopName')
    const busesUl = document.getElementById('buses')

    // base url, also test in postman
    const BASE_URL = 'http://localhost:3030/jsonstore/bus/businfo/'

    // get the values
    let stopIdInputValue = stopIdInput.value

    // finalize url
    const FINAL_URL = `${BASE_URL}${stopIdInputValue}`

    // clear the containers before each request
    stopNameDiv.textContent = ''
    busesUl.innerHTML = ''

    // fetch request, returns a promise
    fetch(
        FINAL_URL,
        {method: 'GET'}
    )

    // convert to json
        .then(
            (res) => res.json()
        )

    // busInfo is returned, in {} we define actions
        .then(
            (busInfo) => {
                const {name, buses} = busInfo
                stopNameDiv.textContent = name
                for (const busId in buses) {
                    const li = document.createElement('li')
                    li.textContent = `Bus ${busId} arrives in ${buses[busId]} minutes`
                    busesUl.appendChild(li)
                }
            }
        )

    // error with a custom message
        .catch(
            (err) => {
                stopNameDiv.textContent = 'Error'
            }
        )
}
    // run the tests
    // go to D:\Study\Projects\VSC\js_frontend\day10_temp\01.Bus-Stop
    // zip all except node_modules and tests, and submit to judge


// for (const xObj of currentArray) {
//                                     newDiv2.innerHTML += `
//                                         <span class="upcoming">
//                                             <span class="symbol">${weatherSymbols[xObj.condition]}</span>
//                                             <span class="forecast-data">${xObj.low}&deg/${xObj.high}&deg</span>
//                                             <span class="forecast-data">${xObj.condition}</span>
//                                         </span>
//                                     `


//             .then((result) => {
//                 const info = Object.values(result)              // !!!!!! kogato vzimash ot obekt v obekt
//                 for (const {_body, id, title} of info) {
//                     let newOption = document.createElement('option')
//                     newOption.value = id
//                     newOption.textContent = title
//                     postsSelect.appendChild(newOption)
//                 }


//.then((result) => {
//   const currentPostId = postsSelect.options[postsSelect.selectedIndex].value; // vzimane ot option!!!
//



// EP1

// for task 2 and 3
function createElement(type, parentNode, content, classes, id, attributes, useInnerHtml) {
    const htmlElement = document.createElement(type)
    if (content && useInnerHtml) {
        htmlElement.innerHTML = content
    } else {
        if (content && type !== 'input') {
            htmlElement.textContent = content
        }
        if (content && type === 'input') {
            htmlElement.value = content
        }
    }
    if (classes && classes.length > 0) {
        htmlElement.classList.add(...classes)
    }
    if (id) {
        htmlElement.id = id
    }
    // {src: 'link', href: 'http'}
    if (attributes) {
        for (const key in attributes) {
            htmlElement.setAttribute(key, attributes[key])
            // htmlElement[key] = attributes[key] // option2
        }
    }
    if (parentNode) {
        parentNode.appendChild(htmlElement)
    }
    return htmlElement
}
// example usage
const myImg = createElement(
    'p',
    document.getElementById('preview-list'),
    null,
    ['story'],
    null,
    {'src': 'something'}
)

// Always use 'Arrayfrom' when using 'querySelectorAll' and children

// ako input type="submit" refreshva stranicata i trqbva da slojim prevent default!!!

// appendChild освен че добавя и маха ако същия child преди сме му сложили др parent!!!

//querySelector и останалите освен за document можем да ги прилагаме и за всеки елемент!!!


// ------------------------------------- REACT --------------------------------------- //

// create folder and open cmd inside
// npx create-react-app my-app
// go to the my-app folder in vsc
// npm start to start the front-end server

// class => className
// can use {name === '' ? 'World' : name}
// when we want to display more than 1 html element we have to put them in a <React.Fragment> (import React from 'react';)

// Components














