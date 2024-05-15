import $ from 'jquery'

const isiElementCard = element => { 
    return `
    <film-item class="pr-2">
        <div class="card text-bg-light">
            <img src="${element.Poster}" class="card-img-top " height="500rem">
            <div class="card-body">
                <h5 class="card-title">${truncateText(element.Title)}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${element.Year}</h6>
                <p class="card-text">${element.Type}</p>
                <a href="#" id='tombol-membalikkan-this' class="btn btn-primary button-modal-detail-film" data-bs-toggle="modal" data-bs-target="#modalDetailFilm" data-idimdb="${element.imdbID}">Detail</a>
            </div>
        </div>
    </film-item>`
};

const dataDetailFilm = element => { 
    return `
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
                <img src="${element.Poster}" class="img-fluid">
            </div>
            <div class="col-md">
                <ul class="list-group">
                    <li class="list-group-item"><h3>${element.Title} (${element.Year})</h3></li>
                    <li class="list-group-item"><b>Sutradara :</b> ${element.Director}</li>
                    <li class="list-group-item"><b>Aktor :</b> ${element.Actors}</li>
                    <li class="list-group-item"><b>Penulis :</b> ${element.Writer}</li>
                    <li class="list-group-item"><b>Sinopsis :</b> ${element.Plot}</li>
                </ul>
            </div>
        </div>
    </div>`
};

const truncateText = (text) => {
    
    if (text.length >= 21) {
        return text.substring(0,21) + "..."
    } else {
        return text
    }
}

window.addEventListener("load", () => {
    $.ajax({
        url:`http://www.omdbapi.com/?apikey=b4ca793e&s=avatar`,
        success: result => {
            const films = result.Search;
            let elementCard = ``;
            films.forEach(element => {
                elementCard += isiElementCard(element);
            }, this);
            $('.container-film').html(elementCard);
            
            // Disini saya terpaksa tidak menggunakan callback berupa arrow function karena saya ingin menggunakan 'this' untuk menangkap imdbID dari setiap data
            $('.button-modal-detail-film').on('click', function() {
                $.ajax({
                    url:`http://www.omdbapi.com/?apikey=b4ca793e&i=${$(this).data('idimdb')}`,
                    success: element => {
                        const detailFilm = dataDetailFilm(element);
                        $('.modal-body').html(detailFilm)
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }
                })
            })
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
})

$('.tombol-keramat').on('click', () => {
    $.ajax({
        url:`http://www.omdbapi.com/?apikey=b4ca793e&s=${$('.keyword-yang-diinput').val()}`,
        success: result => {
            const films = result.Search;
            let elementCard = ``;
            films.forEach(element => {
                elementCard += isiElementCard(element);
            });
            $('.container-film').html(elementCard);
    
            // Disini saya terpaksa tidak menggunakan callback berupa arrow function karena saya ingin menggunakan 'this' untuk menangkap imdbID dari setiap data
            $('.button-modal-detail-film').on('click', function() {
                $.ajax({
                    url:`http://www.omdbapi.com/?apikey=b4ca793e&i=${$(this).data('idimdb')}`,
                    success: element => {
                        const detailFilm = dataDetailFilm(element);
                        $('.modal-body').html(detailFilm)
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }
                })
            })
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
});