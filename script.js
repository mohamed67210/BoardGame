let result = document.querySelector('#result')
let id = 'MCQWDBPbBu'
let btn = document.querySelector('#btn')
const form = document.querySelector("form")
let detail_jeux_container = document.querySelector('#detail_jeux')
let select = document.querySelector('.select')
let img_container =document.querySelector('#img_container')

btn.addEventListener("click", (event) => {
    event.preventDefault();
    const inputGame = document.querySelector(".gameName")
    let inputValue = inputGame.value
    getInfosApi(inputValue)
})

function getInfosApi(inputValue) {

    // const select = document.createElement('select')
    select.innerHTML = "";
    result.appendChild(select)
    fetch('https://api.boardgameatlas.com/api/search?name=' + inputValue + '&limit=50&client_id=' + id + '')
        .then((Response) => Response.json())
        .then((games) => {
            // console.log(inputValue)
            // console.log(games.games)
            let gameList = games.games
            gameList.forEach(element => {
                var option = document.createElement("option");
                // console.log(element.name)
                option.innerHTML += element.name
                select.appendChild(option)
            });
        })
    // quand on selectionne une option dans le select 
    select.addEventListener('change', (event) => {
        event.preventDefault()
        fetch('https://api.boardgameatlas.com/api/search?name=' + select.value + '&client_id=' + id + '')
            .then((Response) => Response.json())
            .then((games) => {
                // console.log(inputValue)
                // 
                let detail_game = games.games[0]
                let max_nb_joueurs = detail_game.max_players
                let min_nb_joueurs = detail_game.min_players
                let img_link = detail_game.image_url
                let description = detail_game.description_preview
                console.log(detail_game)
                // afficher le nom du jeux selectionner dans la balise h1
                let title = document.querySelector('.title')
                title.innerHTML = detail_game.name
                // afficher max min joueurs + description dans la balise p
                let phrase = document.querySelector('.phrase')
                phrase.innerHTML = 'de '+ min_nb_joueurs + ' à ' + max_nb_joueurs +' Joueurs'
                phrase.innerHTML += '<br>' + description

                // afficher image du jeux
                let img = document.createElement('img')
                img.src = img_link
                img_container.appendChild(img)

            })
    })
}



// result.appendChild(searchBar)