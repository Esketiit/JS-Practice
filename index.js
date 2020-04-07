document.addEventListener("DOMContentLoaded", () => {

    let form = document.getElementsByClassName("add-movie-form")[0]
    form.setAttribute("hidden", "true")
    let displayForm = false
    let container = document.getElementsByClassName("movie-container")
    let formButton = document.querySelector('[data-id]')

    formButton.addEventListener("click", function (event) {

        if (displayForm) {
            displayForm = false
            form.removeAttribute("hidden")
        } else {
            displayForm = true
            form.setAttribute("hidden", "true")
        }
    })

    form.addEventListener("submit", function (event) {
        event.preventDefault()

        postMovie(event.target)

    })

    function postMovie(movieData) {
        if (movieData.genre.value = "horror") {
            fetch("http://localhost:4000/horror", {
                method: "POST",
                headers: {
                    "content-type": 'application/json',
                    "accept": 'application/json'
                },
                body: JSON.stringify({
                    "title": movieData.title.value,
                    "cover": movieData.cover.value,
                    "duration-in-hours": movieData["duration-in-hours"].value
                })
            }).then(res => res.json())
                .then((horrorMovie) => {
                    renderHorrorMovie(horrorMovie)
                })
        }
    }

    document.addEventListener("change", function () {
        movieContainer = document.getElementsByClassName("movie-container")
        switch (event.target.value) {
            case "all":
                console.log("all")
                document.getElementById("horror").removeAttribute("hidden");
                document.getElementById("comedy").removeAttribute("hidden");
                document.getElementById("action").removeAttribute("hidden");
                break
            case "horror":
                console.log("horror")
                // document.getElementById("horror").setAttribute("hidden", "false");
                document.getElementById("comedy").setAttribute("hidden", "true");
                document.getElementById("action").setAttribute("hidden", "true");
                break
            case "comedy":
                console.log("comedy")
                break
            case "action":
                console.log("action")
                break
        }
    });


    function fetchHorrorMovies() {
        return fetch('http://localhost:4000/horror')
            .then(resp => resp.json())
    }

    function renderHorrorMovie(movie) {
        let ul = document.getElementById("horror")
        let li = document.createElement("li")
        let h2 = document.createElement("h2")
        let h3 = document.createElement("h3")
        let image = document.createElement("img")
        let button = document.createElement("button")

        li.setAttribute("class", "movie-card")
        h2.innerText = movie.title
        h3.innerText = movie["duration-in-hours"]
        image.setAttribute("src", movie.cover)
        image.setAttribute("class", "movie-avatar")
        button.innerText = "cast"

        button.onclick = function () {
            if (li.children[4]) {
                li.removeChild(li.childNodes[4])
            } else {
                let castUl = document.createElement("ul")
                movie.cast.forEach(actor => {
                    let actorLi = document.createElement("li")
                    actorLi.innerText = actor.name
                    castUl.appendChild(actorLi)
                })
                li.append(castUl)
                console.dir(li)
            }
        }

        li.append(h2, h3, image, button)
        ul.appendChild(li)
        console.log(movie["duration-in-hours"])
    }

    fetchHorrorMovies().then(movies => {
        movies.forEach(movie => {
            renderHorrorMovie(movie)
        });
    })
})