const movies = [
  {
    id: 1,
    title: "Inception",
    releaseDate: "2010-07-16",
    director: "Christopher Nolan",
    genres: ["sci-fi", "thriller", "action"],
    hasSequel: false,
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
    hasSequel: true,
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
      rottenTomatoes: {
        rating: 98,
        reviewsCount: 150,
      },
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
