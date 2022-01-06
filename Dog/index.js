document.body.innerHTML=`<h1 class="header">Dog API</h1>
<select class="breed-select" onchange="changeDog(this)">
<option> select your Dog Breed</option>
</select>
<img class="dog-image" src="" alt="dog" />`;


const fetchDogBreeds= async()=>{
  const response=await fetch("https://api.thedogapi.com/v1/breeds");
  const dogBreeds= await response.json();
  populateDog(dogBreeds);
}

//populating breed types
const populateDog=(breeds)=>{
  const select=document.querySelector(".breed-select");
  const breedOptions=breeds.map(breed=>{
    const option=document.createElement("option");
    option.text=breed.name;
    option.value=breed.id;
    return option;
  })
  breedOptions.forEach(breedOption=>{
    select.appendChild(breedOption);
  })
}


//get breed image
const fillDogImage=(imageUrl)=>{
  document.querySelector(".dog-image").setAttribute("src",imageUrl);
}

//get dog By Breed
const getDogByBreed=async(breedId)=>{
  const [data]= await fetch("https://api.thedogapi.com/v1/images/search?include-breed=1&breed_id="+breedId)
  .then((data)=>data.json());
  const {url:imageUrl,breeds}=data;
  fillDogImage(imageUrl);
}


const changeDog=()=>{
  console.log(event.target.value);
  getDogByBreed(event.target.value)
}
fetchDogBreeds();

