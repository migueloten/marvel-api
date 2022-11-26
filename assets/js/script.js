const url = {
    base: "https://gateway.marvel.com/v1/public/characters?",
    limit: "limit=20",
    timestamp: "ts=1",
    privateKey: "0b9cd2332dec324621fa1e5112572f71e8055a18",
    publicKey: "apikey=1794fc426ad1973d8cfcb555d1eb6bd3",
    hash: "hash=e1a22a800394c9d4f2e2cd7446721c8b",
  };

var order = "name";
var search=""
let resultOffset = 0;

const link = `${url.base}orderBy=${order}&${url.limit}&${url.timestamp}&${url.publicKey}&${url.hash}`;

const principal = document.getElementById("principal");
const searchInput = document.getElementById("searchInput");
const orderSelect = document.getElementsByClassName("order-select")[0];

const searchResult = () => {
  principal.innerHTML = "";

  if(searchInput.value){
    fetchApi(`${url.base}orderBy=${order}&nameStartsWith=${searchInput.value}&${url.limit}&${url.timestamp}&${url.publicKey}&${url.hash}`)
  } else{
    alert("No data in search field");
    fetchApi(`${url.base}orderBy=${order}&${url.limit}&${url.timestamp}&${url.publicKey}&${url.hash}`);
  }
}

const loadMore = () => {
  resultOffset+=20;

  searchInput.value?search=`nameStartsWith=${searchInput.value}&`:search=""

  fetchApi(`${url.base}orderBy=${order}&${search}offset=${resultOffset}&${url.limit}&${url.timestamp}&${url.publicKey}&${url.hash}`)
}

const orderBy = () => {
  searchInput.value?search=`nameStartsWith=${searchInput.value}&`:search=""
  switch (orderSelect.value) {
    case "0":
      order = "name";
      principal.innerHTML = "";
      resultOffset = 0;
      fetchApi(`${url.base}orderBy=${order}&${search}offset=${resultOffset}&${url.limit}&${url.timestamp}&${url.publicKey}&${url.hash}`)
      break;

    case "1":
      order = "modified";
      principal.innerHTML = "";
      resultOffset = 0;
      fetchApi(`${url.base}orderBy=${order}&${search}offset=${resultOffset}&${url.limit}&${url.timestamp}&${url.publicKey}&${url.hash}`)
      break;

    case "2":
      order = "-name";
      principal.innerHTML = "";
      resultOffset = 0;
      fetchApi(`${url.base}orderBy=${order}&${search}offset=${resultOffset}&${url.limit}&${url.timestamp}&${url.publicKey}&${url.hash}`)
      break;

    case "3":
      order = "-modified";
      principal.innerHTML = "";
      resultOffset = 0;
      fetchApi(`${url.base}orderBy=${order}&${search}offset=${resultOffset}&${url.limit}&${url.timestamp}&${url.publicKey}&${url.hash}`)
      break;
  
    default:
      console.log("nenhum")
      break;
  }
}

const fetchApi = (link) => {
  fetch(link)
  .then(function (response) {
    response.json().then((data) => {

      console.log(data.data.results)

      if(data.data.results.length==0){
        alert("No more results");
      }

      data.data.results.forEach(profile => {
        //Criando os elementos do card
      let card = document.createElement("div");
      card.classList = "card my-3 mx-4 pb-3 rounded-0";
      card.style="width: 18rem;";

      let imgProfile = document.createElement("img");
      imgProfile.classList = "card-img-top rounded-0";
      imgProfile.src = `${profile.thumbnail.path}.${profile.thumbnail.extension}`;
      imgProfile.alt = "Personagem Perfil";

      let cardBody = document.createElement("div");
      cardBody.classList = "card-body";

      let cardTitle = document.createElement("h4");
      cardTitle.classList = "card-title";
      cardTitle.innerHTML = profile.name;

      let cardDescription = document.createElement("p");
      cardDescription.classList = "card-text";
      cardDescription.innerHTML = profile.description?`DESCRIPTION: ${profile.description}`:"No description available.";

      let informationUl = document.createElement("ul");
      informationUl.classList = "list-group list-group-flush";

      let storiesLi = document.createElement("li");
      storiesLi.classList = "list-group-item";
      storiesLi.innerHTML = `Appears in ${profile.stories.available} stories.`;

      let moreInfoLi = document.createElement("li");
      moreInfoLi.classList = "list-group-item";

      let linkInfo = document.createElement("a");
      linkInfo.classList = "link-dark";
      linkInfo.href = profile.urls[0].url;
      linkInfo.innerHTML = `More information about ${profile.name}`;

      //montando o card
      principal.appendChild(card);
      card.appendChild(imgProfile);
      card.appendChild(cardBody);
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardDescription);
      card.appendChild(informationUl);
      informationUl.appendChild(storiesLi);
      informationUl.appendChild(moreInfoLi);
      moreInfoLi.appendChild(linkInfo);
      });
    });
  })
  .catch(function (err) {
    console.log("Erro na requisição!!!", err);
  });
}

fetchApi(link);