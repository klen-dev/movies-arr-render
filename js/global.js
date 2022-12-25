let main = document.querySelector("main");
let searchInput = document.querySelector("input[type=search]");
let videoIframe = document.querySelector(".video iframe");
let select = document.querySelector("select");

let pages = document.createElement("div");
pages.classList.add("pagination")
pages.classList.add("justify-content-center")
pages.classList.add("m-4")

let filmsBox = document.createElement("div");
filmsBox.classList.add("d-flex", "justify-content-evenly", "flex-wrap");
main.appendChild(filmsBox);
main.appendChild(pages);
// console.log(movies.smallThumbnail);

selectedOptions = [];
allCategories = [];
movies.forEach((movie)=>{
    allCategories.push(...movie.categories)
    for(i of allCategories){
        if(!selectedOptions.includes(i)){
            selectedOptions.push(i);
        }
    }
})

for(i of selectedOptions){
    let option = document.createElement("option");
    option.textContent = `${i}`;
    select.appendChild(option);
}


select.addEventListener("change",()=>{
    let selectedArr = [];
    for(i of movies){
        if(i.categories.includes(select.value)){
            selectedArr.push(i);
        }else if(select.value == "ALL"){
            selectedArr = movies;
        }
    }
    filmsBox.innerHTML = '';
    pages.innerHTML = '';
    render(selectedArr, 1, true);
});

searchInput.addEventListener("input", function(e){
    e.preventDefault();
    let searchArr = [];
    let inputVal = searchInput.value.toLowerCase();
    for(i of movies){
        if(i.title.toLowerCase().includes(inputVal)){
            searchArr.push(i);
        }
    }
    filmsBox.innerHTML = '';
    pages.innerHTML = ''
    render(searchArr, 1, true)
})

function render(Arr, pageIndex=1, pagination = true){
    let pageNumbers = 0
    let j = 1

    let sliceleft = 1+ (15* (pageIndex-1));
    let sliceright = 15+ (15* (pageIndex-1));

    Arr.slice(sliceleft, sliceright).forEach((movie)=>{
        let card = document.createElement("div");
        let cardBody = document.createElement("div");
        let img = document.createElement("img");
        let title = document.createElement("h5");
        let year = document.createElement("p");
        let language = document.createElement("p");
        let rating = document.createElement("p");
        let button = document.createElement("button");

        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(year);
        cardBody.appendChild(language);
        cardBody.appendChild(rating);
        card.appendChild(button);

        card.classList.add("card");
        cardBody.classList.add("card-body");
        button.classList.add("btn", "btn-light", "flex-end");

        img.src = movie.smallThumbnail;
        title.textContent = `${movie.title}`;
        year.textContent = `Year: ${movie.year}`;
        language.textContent = `Language: ${movie.language}`;
        rating.textContent = `Rating: ${movie.imdbRating}`;
        button.textContent = `Treylerni ko'rish`;
        button.name = `${movie.youtubeId}`

         filmsBox.appendChild(card);         
    });
    if(pagination == true){
        for(i in Arr){
            pageNumbers++;
            if(pageNumbers == 20){
                let page = document.createElement("button");
                pages.appendChild(page);
                page.classList.add("btn");
                page.textContent = `${j}`;
                j++
                pageNumbers = 0
            }
        }
    }
    
    pages.addEventListener("click", function(e){
        e.preventDefault();
        if(e.target.tagName == "BUTTON"){
            filmsBox.innerHTML = "";
            render(Arr,e.target.textContent,false);
        }
    });
}
filmsBox.addEventListener("click", function(e){
    e.preventDefault();
    if(e.target.tagName == "BUTTON"){
        console.log(e.target.name);
        videoIframe.src = `https://www.youtube.com/embed/${e.target.name}`
    }
});

render(movies)