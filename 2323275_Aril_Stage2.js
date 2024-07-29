// Name : Muhammad Aril Bin Mohamed Irwan
// Class : DIT / FT / 1A / 07
// Adm : 2323275



var input = require("readline-sync");
var userName = input.question("Welcome to Silver Vintage Movie Review Program\n" + "Please enter your name: ");
console.log();



/***************************************************Data and Management******************************************************************/
class Movie {
    constructor(name, genre, running_time, release_date, rating) {
        this.name = name;
        this.genre = genre;
        this.running_time = this.MinsToHrsAndMins(running_time);
        this.release_date = release_date;
        this.rating = rating;
    }

    MinsToHrsAndMins(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (remainingMinutes === 0) {
            return `${hours}h`;
        }

        else if (hours === 0) {
            return `${remainingMinutes}m`;
        }

        else {
            return `${hours}h ${remainingMinutes}m`;
        }
    }




    displayMovieDetails() {
        let displayRating;
        if (this.rating[0] === 0) {
            displayRating = (0 + " (0 voters)");
        } else {
            displayRating = (Math.round(this.rating[1] / this.rating[0] * 10) / 10) + " (" + this.rating[0] + " voters)";
        }

        return `Name\t\t: ${this.name}\nGenre\t\t: ${this.genre.join(",")}\nRunning Time\t: ${this.running_time}\nRelease Date\t: ${this.release_date}\nRating\t\t: ${displayRating}`;
    }//"$" here is to distinguish the variables from string message and ".join" is to combine all array properties in genre (I used it for efficiency)
}


// movieList array for movie objects
var movieList = [
    new Movie(
        "Black Panther: Wakanda Forever 2022",
        ["Adventure", "Action", "Drama", "Fantasy", "Sci-Fi", "Thriller"],
        "161",
        "11 Nov 2022",
        [9, 42]
    ),
    new Movie(
        "Avatar: The Way of Water",
        ["Adventure", "Sci-Fi"],
        "192",
        "16 Dec 2022",
        [4, 15]
    ),
    new Movie(
        "Fast X",
        ["Crime", "Action", "Mystery", "Thriller"],
        "43",
        "19 May 2023",
        [28, 60]
    ),
    new Movie(
        "Ant-Man and the Wasp: Quantumania",
        ["Adventure", "Action"],
        "120",
        "16 Feb 2023",
        [18, 80]
    ),
    new Movie(
        "M3GAN",
        ["Horror", "Mystery", "Thriller"],
        "102",
        "6 Jan 2023",
        [20, 70]
    )
];

// Array for display of genres
var dispGenreArr = [
    "Action",
    "Adventure",
    "Crime",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Sci-Fi",
    "Thriller"
];

// Integer Array for options 1 to 7
var dispChoiceArr = [
    "Display All Movies",
    "Add Movie",
    "Add Rating",
    "Latest 3 Release date",
    "Filter by Genre",
    "Watchlist",
    "Exit"
];



/****************************************************Case 3 functions*********************************************************************/
// Function to display all movies
function dispMovieI(movieList) {
    console.log("\n\tSelect the movie to add a rating:");
    for (var dispMovie = 0; dispMovie < movieList.length; dispMovie++) {
        console.log("\t" + (dispMovie + 1) + ") " + movieList[dispMovie].name);
    }
    console.log("\t" + (movieList.length + 1) + ") Go Back to Main Menu");
}

// Function for User Input
function validChoiceInp() {//Also used for case 6
    return parseFloat(input.question("\t>> "));
}

// Function to ensure input is valid
function validMovieChoice(choice, movieList) {//Also used for case 6
    return choice % 1 === 0 && choice >= 1 && choice <= movieList.length;
}

// Function to add a rating to a Movie
function addMovieRating(selectedMovie) {
    do {
        var rating_input = parseFloat(input.question('\n\tEnter your rating for "' + selectedMovie.name + '" (1 to 5 inclusive): '));
        console.log();
        if (rating_input % 1 === 0 && rating_input >= 1 && rating_input <= 5) {
            selectedMovie.rating[0] += 1;
            selectedMovie.rating[1] += rating_input;
            break;
        } else {
            console.log("\tEnter a valid rating!");
        }
    } while (!(rating_input % 1 === 0 && rating_input >= 1 && rating_input <= 5));
}

// Function for Main Menu redirect
function validMainChoice(choice) {//Also used for case 6
    return choice === (movieList.length + 1);
}



/******************************************Case 4 function: To display the latest 3 movies***************************************************/
function dispLatest(movies) {
    // Sort the movieList array based on release_date in descending order
    movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

    // Display the latest 3 movies
    console.log("\n\tThe latest 3 movies are:");
    for (var latest = 0; latest < Math.min(movies.length, 3); latest++) {
        console.log("\t" + (latest + 1) + ") " + movies[latest].release_date + " - " + movies[latest].name);
    }
    console.log();
}



/**********************************************Case 5 function: To filter movies by genre***************************************************/
function filMoviesGen(movies, genre) {
    return movies.filter(
        function (movie) {
            return movie.genre.includes(genre);
        }
    );
}



/****************************************************Case 6 functions*********************************************************************/
// Function to display all movies
function dispMovieII(movieList) {
    console.log("\n\tSelect one movie to add to your Watchlist: ");
    for (var dispMovie = 0; dispMovie < movieList.length; dispMovie++) {
        console.log("\t" + (dispMovie + 1) + ") " + movieList[dispMovie].name);
    }
    console.log("\t" + (movieList.length + 1) + ") Go Back to Main Menu");
}
// Function to display Watchlist
function dispWatchlist(watchlist) {
    console.log("\n\tMovies in your Watchlist:");
    for (var i = 0; i < watchlist.length; i++) {
        console.log("\t" + (i + 1) + ") " + watchlist[i].name);
    }
}
var watchlist = [];

// Function to remove Movies form Watchlist
function removeWatchlist(watchlist) {
    console.log("\n\tChoose a Movie to remove:");
    for (var i = 0; i < watchlist.length; i++) {
        console.log("\t" + (i + 1) + ") " + watchlist[i].name);
    }
    console.log("\t" + (watchlist.length + 1) + ") Go Back to Main Menu");
}



/***************************************************Program Prompt and Cases*************************************************************/
do {
    console.log("Hi " + userName + ", please select your choice:");
    for (var choose = 1; choose <= dispChoiceArr.length; choose++) {
        console.log("\t" + choose + ". " + dispChoiceArr[choose - 1]);
    }
    var userChoice = parseFloat(input.question("\t>> "));


    switch (userChoice) {
        case 1: // Case to Display Movies' Information

            console.log();
            for (var dispInfo = 0; dispInfo < movieList.length; dispInfo++) {
                console.log(movieList[dispInfo].displayMovieDetails() + "\n");
            }
            break;

        case 2: // Case to add a new Movie into the Movie List

            do {
                var create_name = input.question("\n\tPlease enter Movie's name: ");

                // Check if the movie name is already in the list
                var isDuplicate = movieList.some(function (movie) {
                    return movie.name.toLowerCase() === create_name.toLowerCase();
                });

                if (isDuplicate) {
                    console.log("\tPlease enter a unique movie name!");
                } else {
                    break;
                }
            } while (true);

            var genre_add = []; // Initialize genre_add here

            while (true) {
                console.log("\n\tPlease enter Movie's genre(s):");
                for (var dispGenre = 1; dispGenre <= dispGenreArr.length; dispGenre++) {
                    console.log("\t" + dispGenre + ") " + dispGenreArr[dispGenre - 1]);
                }

                var ansGenre = input.question("\t>> ");

                /*  Split the user input 'ansGenre' into an array of strings, using comma 
                    and then convert each string element to an integer using the 'parseFloat' function.
                    The '10' argument ensures that the parsing is done in base 10 (decimal). */
                var genreInteger = ansGenre.split(',').map(function (index) {
                    return parseFloat(index.trim(), 10);
                });

                var validInput = genreInteger.every(function (number) {
                    return !isNaN(number) && number % 1 === 0 && number >= 1 && number <= dispGenreArr.length;
                });

                if (!validInput) {
                    console.log("\tPlease enter valid genre option(s)!");
                    continue;
                } else {
                    // connects each valid genre index to the corresponding genre string in 'dispGenreArr'.
                    var genre_add = genreInteger.map(function (index) {
                        return dispGenreArr[index - 1];
                    });
                    break; // Exit the loop if the input is valid
                }
            }

            var release_date_input = input.question("\n\tPlease enter Movie's release date: ");

            do {
                var running_time_input = parseFloat(input.question("\n\tPlease enter Movie's running time (mins): "));
                console.log();
                if (running_time_input % 1 != 0) {
                    console.log("\tPlease enter valid running time!");
                }
            } while (running_time_input % 1 != 0);


            var rating_default = [0, 0]; // Default rating

            // Create and add the new Movie instance to the movieList array
            var newMovie = new Movie(create_name, genre_add, running_time_input, release_date_input, rating_default);
            movieList.push(newMovie);
            break;

        case 3:
            do {
                dispMovieI(movieList);
                var movieChoice = validChoiceInp();

                if (validMovieChoice(movieChoice, movieList)) {
                    movieChoice -= 1;
                    var selectedMovie = movieList[movieChoice];
                    addMovieRating(selectedMovie);
                } else if (validMainChoice(movieChoice)) {
                    console.log();
                    break;
                } else {
                    console.log("\n\tKindly enter a valid input!");
                }
            } while (!(validMovieChoice(movieChoice, movieList)));
            break;

        case 4:

            dispLatest(movieList);
            break;

        case 5:
            do {
                console.log("\n\tPlease select a genre:");
                for (var dispGenII = 1; dispGenII <= dispGenreArr.length; dispGenII++) {
                    console.log("\t" + dispGenII + ") " + dispGenreArr[dispGenII - 1]);
                }
                var genreChoice = parseFloat(input.question("\t>> "));
                if (genreChoice >= 1 && genreChoice <= dispGenreArr.length) {
                    var selectedGenre = dispGenreArr[genreChoice - 1];
                    var filteredMovies = filMoviesGen(movieList, selectedGenre);
                    console.log('\n\tYou have selected "' + selectedGenre + '" genre:');
                    for (var filMovie = 0; filMovie < filteredMovies.length; filMovie++) {
                        console.log("\t" + (filMovie + 1) + ") " + filteredMovies[filMovie].name);
                    }
                    console.log();
                    break;
                } else {
                    console.log("\tPlease enter a valid genre input!");
                }
            } while (!(genreChoice >= 1 && genreChoice <= dispGenreArr.length));

            break;
        case 6:
            console.log("\n\tSelect an option:\n\t1) Add Movie to Watchlist\n\t2) View Watchlist\n\t3) Remove Movie from Watchlist\n\t4) Back to Main Menu");
            var userChoiceCase6 = validChoiceInp();

            switch (userChoiceCase6) {
                case 1:
                    dispMovieII(movieList);
                    var movieChoiceToAdd = validChoiceInp();

                    if (validMovieChoice(movieChoiceToAdd, movieList)) {
                        movieChoiceToAdd -= 1;

                        // Check if the selected movie is already in the Watchlist
                        var selectedMovie = movieList[movieChoiceToAdd];
                        if (watchlist.some(movie => movie.name === selectedMovie.name)) {
                            console.log('\n\t"' + selectedMovie.name + '" is already in your watchlist!\n');
                        } else {
                            watchlist.push(selectedMovie);
                            console.log('\n\t"' + selectedMovie.name + '" has been added to your watchlist!\n');
                        }
                    } else if (validMainChoice(movieChoiceToAdd)) {
                        console.log();
                        break;
                    } else {
                        console.log("\n\tKindly enter a valid input!\n");
                    }

                    break;

                case 2:
                    if (watchlist.length === 0) {
                        console.log("\n\tYour watchlist is empty. Add movies to your watchlist first!");
                    } else {
                        dispWatchlist(watchlist);
                    }
                    console.log();
                    break;

                case 3:
                    if (watchlist.length === 0) {
                        console.log("\n\tYour watchlist is empty. There is nothing to remove!\n");
                    } else {
                        removeWatchlist(watchlist);
                        var removeChoice = validChoiceInp();

                        if (validMovieChoice(removeChoice, watchlist)) {
                            var removedMovie = watchlist.splice(removeChoice - 1, 1)[0];
                            console.log('\n\t"' + removedMovie.name + '" has been removed from your watchlist.\n');
                        } else {
                            console.log();
                        }
                    }
                    break;

                case 4:
                    console.log();
                    break;

                default:
                    console.log("\n\tPlease enter a valid input!\n");
            }

            break;

        case 7:
            console.log("Thank you & goodbye!");
            break;

        default:
            console.log("Please enter a valid input!\n");
    }
}
while (userChoice != 7);