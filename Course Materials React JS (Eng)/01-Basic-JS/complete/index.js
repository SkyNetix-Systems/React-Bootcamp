const movies = [
  {
    id: 1,
    title: "Inception",
    releaseDate: "2010-07-16",
    director: "Christopher Nolan",
    genres: ["sci-fi", "thriller", "action"],
    hasSequel: 0,
    runtime: 148,
    boxOffice: {
      worldwide: "$829.9M",
      domestic: "$292.6M",
      international: "$536.3M",
    },
    ratings: {
      imdb: {
        rating: 8.8,
        votes: 2200000,
      },
      rottenTomatoes: {
        rating: 87,
        reviewsCount: 350,
      },
    },
  },
  {
    id: 2,
    title: "The Matrix",
    releaseDate: "1999-03-31",
    director: "The Wachowskis",
    genres: ["sci-fi", "action", "adventure"],
    hasSequel: false,
    runtime: 136,
    boxOffice: {
      worldwide: "$463.5M",
      domestic: "$171.5M",
      international: "$292M",
    },
    ratings: {
      imdb: {
        rating: 8.7,
        votes: 1800000,
      },
      rottenTomatoes: {
        rating: 88,
        reviewsCount: 300,
      },
    },
  },
  {
    id: 3,
    title: "The Godfather",
    releaseDate: "1972-03-24",
    director: "Francis Ford Coppola",
    genres: ["crime", "drama"],
    hasSequel: true,
    runtime: 175,
    boxOffice: {
      worldwide: "$250M",
      domestic: "$136M",
      international: "$114M",
    },
    ratings: {
      imdb: {
        rating: 9.2,
        votes: 1600000,
      },
      // rottenTomatoes: {
      //   rating: 98,
      //   reviewsCount: 150,
      // },
    },
  },
  {
    id: 4,
    title: "Pulp Fiction",
    releaseDate: "1994-10-14",
    director: "Quentin Tarantino",
    genres: ["crime", "drama", "thriller"],
    hasSequel: false,
    runtime: 154,
    boxOffice: {
      worldwide: "$213.9M",
      domestic: "$107.9M",
      international: "$106M",
    },
    ratings: {
      imdb: {
        rating: 8.9,
        votes: 1900000,
      },
      rottenTomatoes: {
        rating: 92,
        reviewsCount: 250,
      },
    },
  },
  {
    id: 5,
    title: "The Dark Knight",
    releaseDate: "2008-07-18",
    director: "Christopher Nolan",
    genres: ["action", "crime", "drama"],
    hasSequel: true,
    runtime: 152,
    boxOffice: {
      worldwide: "$1.005B",
      domestic: "$535M",
      international: "$469.7M",
    },
    ratings: {
      imdb: {
        rating: 9.0,
        votes: 2500000,
      },
      rottenTomatoes: {
        rating: 94,
        reviewsCount: 330,
      },
    },
  },
];

//////////////////////////////////////
//Functions

// const a = 3;
// const b = 3;

// function calcDecl() {
//   return a + b;
// }

// const calcExp = function () {
//   return a + b;
// };

// console.log(
//   (function () {
//     return a + b;
//   })()
// );

// const arrowFunction = () => a + b;
// console.log(arrowFunction());

//////////////////////////////////////
//Find

// function getFilm(id) {
//   return movies.find((item) => item.id === id);
// }

// const film = getFilm(3);

//////////////////////////////////////
//Destructuring Objects and Array

// console.log(film);

// const title = film.title;
// const releaseDate = film.releaseDate;
// const director = film.director;

// const { title: filmName, releaseDate, director } = film;

// console.log(filmName);
// console.log(releaseDate);
// console.log(director);

// const action = film.genres[1];

// const [sciFi, action, adventureeee] = film.genres;

// console.log(adventureeee);

//////////////////////////////////////
//Rest \ Spread

//Rest
// const [firstGenre, ...other] = film.genres;

// console.log(other);

//Spread

// movies[1].genres = [...film.genres, "humor"];

// console.log(film.genres);

// movies[1] = { ...film, newKey: "Hello", runtime: 10 };
// console.log(movies[1]);

//////////////////////////////////////
//Template Literals

// console.log(
//   `The ${film.title}, released in ${film.releaseDate.split("-")[0]}, has a raiting of ${
//     film.ratings.imdb.rating
//   }`
// );

//////////////////////////////////////
//The ternary operator

// const age = 18;
// let canVote;

// if (age >= 18) {
//   canVote = "You can vote!";
// } else {
//   canVote = "You are too young to vote!";
// }

// console.log(canVote);

// const canVote2 = age >= 18 ? "You can vote!" : "You are too young to vote!";

// console.log(canVote2);

// const score = 69;

// const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "D";

// console.log(grade);

//////////////////////////////////////
//Logical Operators

// &&

// const result = film.ratings.imdb.rating > 8 && console.log("Good film");

// ||

// const result = film.ratings.imdb.rating > 9 || console.log("Good film");

// 0 / "" / null / undefined / NaN

// ??

// const userAge = 0;
// const defaultAge = 18;

// const age2 = userAge ?? defaultAge;
// console.log(age2); // 18

//////////////////////////////////////
//Optional Chaining

// function getRaitingVotes() {
//   const ibmRaiting = film.ratings.imdb.votes;
//   const rottenTomatoesRaiting = film.ratings.rottenTomatoes?.reviewsCount ?? 0;

//   return ibmRaiting + rottenTomatoesRaiting;
// }

// console.log(getRaitingVotes());

//////////////////////////////////////
//map Method

// const arr = [1, 2, 3, 4, 5];

// const newArr = arr.map(function (i) {
//   return i * 2;
// });

// arr.forEach(function (i) {
//   console.log(i);
// });

// console.log(newArr);

// const title = movies.map(function (i) {
//   return i.title;
// });

// const title = movies.map((i) => {
//   return { name: i.title, director: i.director };
// });

// console.log(title);

//////////////////////////////////////
//filter Method

// const greatFilms = movies.filter((film) => film.ratings.imdb.rating >= 9).map((i) => i.title);

// console.log(greatFilms);

//////////////////////////////////////
//reduce Method

// const totalTime = movies.reduce((acc, film) => acc + film.runtime, 0);

// console.log(totalTime);

//////////////////////////////////////
//sort Method

// const arr = [1, 5, 8, 4, 2, 4, 9, 12, 0];

// const sortedArr = arr.slice().sort((a, b) => a - b);

// console.log(sortedArr);
// console.log(arr);

//Сортировка по алфавиту букв

// const arr1 = ["d", "e", "b", "t", "r", "x", "s", "a", "g", "u"];
// const sortedArr1 = [...arr1].sort();
// console.log(sortedArr1); // (10) ['a', 'b', 'd', 'e', 'g', 'r', 's', 't', 'u', 'x']

////////////////

//Сортировка по числам в объекте

// const arr2 = [
//   { name: "Dima", age: 30 },
//   { name: "Ivan", age: 22 },
//   { name: "Misha", age: 25 },
//   { name: "Anton", age: 37 },
// ];

// const sortedArr2 = [...arr2].sort((a, b) => a.age - b.age);
// console.log(sortedArr2);

/////////////////

//Сортировка по алфавиту в объекте

// const arr3 = [
//   { name: "Dima", age: 30 },
//   { name: "Ivan", age: 22 },
//   { name: "Misha", age: 25 },
//   { name: "Anton", age: 37 },
// ];

// const sortedArr3 = [...arr3].sort((a, b) => a.name.localeCompare(b.name));
// console.log(sortedArr3);

//////////////////////////////////////
//Promises

// fetch("https://meowfacts.herokuapp.com/")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Response was not ok");
//     }
//     console.log(response);
//     return response.json();
//   })
//   .then((data) => console.log(data))
//   .catch((err) => alert("invalid adress"));

// console.log("Hello");

//////////////////////////////////////
//async / await

// async function getFilm() {
//   try {
//     const response = await fetch("http://www.omdbapi.com/?apikey=416e6df4&s=batman&y=2005");

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   } finally {
//   }
// }

// getFilm();
