const loadLevel = async() => {
  const url = "https://openapi.programming-hero.com/api/categories";
  const response = await fetch (url)
  const data = await response.json()
  // console.log(data.categories) 
  displayLevel(data.categories);
  
}

const manageLoading = (status) => {
  if(status == true){
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("plant-container").classList.add("hidden");
  }else{
    document.getElementById("plant-container").classList.remove("hidden");
    document.getElementById("loading").classList.add("hidden");

  }

}

const loadCard = async() => {
  manageLoading(true)
  const url = "https://openapi.programming-hero.com/api/plants";
  const response = await fetch(url)
  const  data = await response.json()
  // console.log(data.plants) 
  displayTrees(data.plants)
  removeActiveBtn()
  const clickBtn = document.getElementById("allBtn")
  clickBtn.classList.add("active");

}

const displayTrees = (plants) => {
  const plantContainer = document.getElementById("plant-container");
  plantContainer.innerHTML= "";

  plants.forEach(plant =>{
    const plantCard = document.createElement("div")

    plantCard.innerHTML = `
    <div class="card bg-base-100  shadow-sm">
          <figure>
            <img
            onclick="loadDetails(${plant.id})"
            src="${plant.image}"
            alt="Trees"
            class="h-50 w-full object-cover"
             />
            
          </figure>
        <div class="card-body">
          <h2  onclick="loadDetails(${plant.id})" class="card-title">${plant.name}</h2>
          <p class="line-clamp-2">${plant.description}</p>
          <div class="badge badge-soft badge-success">${plant.category}</div>
           <div class="card-actions justify-between">
            <h1 class="text-xl text-green-500  font-bold">$ ${plant.price}</h1>
             <button class="btn btn-active btn-success">Cart</button>
           </div>
        </div>
      </div>
    `
    plantContainer.appendChild(plantCard);
  })
  manageLoading(false)
}

const loadDetails = async(id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`
  const response = await fetch(url)
  const data = await response.json()
  displayDetails(data.plants)
  console.log(data)

}

const displayDetails = (plants) => {
  const modal = document.getElementById("modal-details")

  modal.innerHTML= `
  <div class = "space-y-3">
        <h1 class = "text-2xl text-green-500 font-bold">${plants.name}</h1>
        <img src="${plants.image}" alt="" class="h-60 w-full object-cover">
        <h2>Category : <span class= "badge badge-outline badge-success">${plants.category}</span></h2>
        <p>${plants.description}</p>
        <h2 class = "text-2xl text-green-500 font-bold"> $ ${plants.price}</h2>
  </div>
  
  `
  document.getElementById("my_modal_5").showModal();
}

const showFilterTree = async(id) => {
  manageLoading(true)
  const url = `https://openapi.programming-hero.com/api/category/${id}`
  const response = await fetch(url)
  const data = await response.json()

  // console.log(data.plants)
  displayFilterTree(data.plants)
  removeActiveBtn()
  const clickBtn = document.getElementById(`filter-btn-${id}`)
  clickBtn.classList.add("active");
  
}

const displayFilterTree = (trees) => {
  const plantContainer = document.getElementById("plant-container");
  plantContainer.innerHTML= ""; 

  trees.forEach(tree => {
    const plantCard = document.createElement("div")

    plantCard.innerHTML = `
    <div class="card bg-base-100  shadow-sm">
          <figure>
            <img
            onclick="loadDetails(${tree.id})"
            src="${tree.image}"
            alt="Trees"
            class="h-50 w-full object-cover"
             />
            
          </figure>
        <div class="card-body">
          <h2  onclick="loadDetails(${tree.id})" class="card-title">${tree.name}</h2>
          <p class="line-clamp-2">${tree.description}</p>
          <div class="badge badge-soft badge-success">${tree.category}</div>
           <div class="card-actions justify-between">
            <h1 class="text-xl text-green-500  font-bold">$ ${tree.price}</h1>
             <button class="btn btn-active btn-success">Cart</button>
           </div>
        </div>
      </div>
    `
    plantContainer.appendChild(plantCard)
    
  });
  manageLoading(false)

}

const displayLevel = (trees) => {

  const levelContainer = document.getElementById("level-container");
  // levelContainer.innerHTML = ""; 

  trees.forEach(tree => {
    const treeBtn = document.createElement("div")

    treeBtn.innerHTML = `
    <button id = "filter-btn-${tree.id}" onclick = "showFilterTree(${tree.id})" class="btn filter-btn w-60">${tree.category_name}</button>
    `
    levelContainer.appendChild(treeBtn);
    
  });

}

const removeActiveBtn = () => {
  const clickBtn = document.getElementById("allBtn")
  clickBtn.classList.remove("active")
  const filterBtn = document.querySelectorAll(".filter-btn")
  filterBtn.forEach(btn => {btn.classList.remove("active")})
  // console.log(filterBtn) 
}

loadCard();

loadLevel();