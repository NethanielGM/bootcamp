# JavaScript Day 2 Exercises

Hi! Congratulations on having forked your second github repository.
Today, you need to solve some JS challenges and push the changes to the master. Yay!

## Installation

You need to install Node.js first in your computer. Go to [Node.js](https://nodejs.org/en/download/) and download the latest LTS version (not current).

Then, in the project folder, open cmd (windows) or terminal (linux/max), run

```bash
npm install
```

## How to exercise

You have several exercises in this repo. Each exercise has it's own folder and file (for example, exercise 1 should be written in a folder with a structure like: `D01/EX01/index.js`, and exercise 2 in `/D01/EX02/index.js` etc.)
We built an automated test for most of the exercises, to enable you check your result, and for us (instructors) to see if you code works ok.

## Develop in the browser first

We recommend you first develop you exercise code in a separated html and js, and develop it in a browser environment, and then copy your code to the designate file, inside the right function.

## Use prebuilt automated tests

To test you code using our automated test, you can always run `npm test` in the cmd/terminal (make sure you are in the repo folder, where the `package.json` file is).

```bash
npm test
```

### Run individual tests

to execute each individual test (excluding exercise 6 and 7), you can execute a command with the following pattern

```bash
npm run testex[number_of_exercise]
```

for example to test exercise 3 you should execute

```bash
npm run testex3
```

Your objective for today is not only write the code that will do what is requested,
Also to do it on a way that it will pass the test.

# Important

You are not allowed to change the JS File names or modify the folder structure.
Do not change the tests files.

# Exercises instructions

1. In the JS file, create a function that takes as argument an array of numbers (as many as you want), create a while loop that calculates the sum of all the numbers in this array, and log it to the console. Then, do the same with a for loop. Both functions should print the value in the console and return it.
   To test this exercise run: `npm run testex1`

2. Create a function that accepts a matrix (an array of array) as an input, and return the sum of all of its numbers.
Here you have a matrix as example:
```bash
[
     [2,6,11,4,13,5],
     [5,12,1,8,32,4],
     [10,2,3,9,1,3],
     [6,6,1,3,13,9]
]
```
(for this matrix it should be 169).

   To test this exercise run: `npm run testex2`

3. Create a function that accepts a matrix and a column index as argument, and calculates the sum of numbers in the given column, assuming there is a variable in every row at the given column (no need to validate). Return the sum of the column. For example, the sum of the elements in column with index 2 (column 3) from the previous matrix is 11 + 1 + 3 + 1 = 16

   To test this exercise run: `npm run testex3`

4. Create a function that accepts a matrix, and calculates the sum of numbers diagonally. Return that sum. For example in the matrix from point 2, it will be: 2 + 12 + 3 + 3 = 20
   To test this exercise run: `npm run testex4`

5. Create a function that accepts an array of numbers, and returns the sum of the numbers using recursion (no loops!). Hint: use array.slice() function (read documentation first). Given the following array: [2, 6, 11, 4, 13, 5], the sum should be 41.
   To test this exercise run: `npm run testex5`

6. Store this string as a variable in your code: '{"name":"Shany", "country":"Israel", "age":31}’. Create an html page with an ```<h1>``` element with the text “Profile”, and three ```<p>``` elements, one with the text "name:”, one with the text “country:” and one with the text “age:” . Create a function that accepts a JSON string, and puts its data to the ```<p>``` elements. The web page should look like the image attached (exercise_6.jpg):

   This exercise does not have an automated test. Run it in your browser, and check the results.

```
888888 88b 88  88888  dP"Yb  Yb  dP      dP""b8  dP"Yb  8888b.  88 88b 88  dP""b8
88__   88Yb88     88 dP   Yb  YbdP      dP   `" dP   Yb  8I  Yb 88 88Yb88 dP   `"
88""   88 Y88 o.  88 Yb   dP   8P       Yb      Yb   dP  8I  dY 88 88 Y88 Yb  "88
888888 88  Y8 "bodP'  YbodP   dP         YboodP  YbodP  8888Y"  88 88  Y8  YboodP
```
