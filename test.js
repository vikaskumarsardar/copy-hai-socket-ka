// // Setup
// const contacts = [
//   {
//     firstName: "Akira",
//     lastName: "Laine",
//     number: "0543236543",
//     likes: ["Pizza", "Coding", "Brownie Points"],
//   },
//   {
//     firstName: "Harry",
//     lastName: "Potter",
//     number: "0994372684",
//     likes: ["Hogwarts", "Magic", "Hagrid"],
//   },
//   {
//     firstName: "Sherlock",
//     lastName: "Holmes",
//     number: "0487345643",
//     likes: ["Intriguing Cases", "Violin"],
//   },
//   {
//     firstName: "Kristian",
//     lastName: "Vos",
//     number: "unknown",
//     likes: ["JavaScript", "Gaming", "Foxes"],
//   },
// ];

// function lookUpProfile(name, prop) {
//   // Only change code below this line
//   const index = contacts.findIndex((res) => res.firstName === name);
// //   console.log(contacts[index]);
//   if (index > -1 && contacts[index][prop]) return contacts[index][prop];
//   return "No such property";

//   // Only change code above this line
// }

// const logs = lookUpProfile("Akira", "likes");
// console.log(logs);

// console.log(Math.ceil(Math.random() * (9 - 0 + 1)) + 0)

// function checkScope() {
//   var i = "function scope";
//   if (true) {
//     let i = "block scope";
//     console.log("Block scope i is: ", i);
//   }
//   console.log("Function scope i is: ", i);
//   return i;
// }

// checkScope()

// let a = 8, b = 6;
// [b,a] = [a,b]
// console.log(a,b);

// let a = 8, b = 6;
// [b,a] = [a,b]
// console.log(a,b);


// const arr = []
// arr.hero = 9000
// arr['zero'] = 90
// arr[1] = 123
// arr[3] = 7878
// console.log(arr.hero);
// arr.map(res =>console.log(res))
// const res = Object.keys(arr)
// const data = Object.values(arr)
// console.log(res,data);