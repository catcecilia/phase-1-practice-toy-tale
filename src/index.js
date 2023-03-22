let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById("toy-collection");
  const submitToy = document.querySelector(".submit");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      submitToy.addEventListener("click", (e) =>{
        e.preventDefault();
        const newName = document.getElementById("name").value;
        const newImage = document.getElementById("image").value;

        fetch("http://localhost:3000/toys", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept":"application/json"
          }, body: JSON.stringify({
            "name": newName,
            "image": newImage,
            "likes": 0
          })
        }).then(res => res.json())
        .then(obj => console.log(obj))
        .catch(err => console.log(err));
      });
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //display all items in api
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(objects => {
    objects.forEach(object =>{
      const divCard = document.createElement("div");
      const name = document.createElement("h2");
      const image = document.createElement("img");
      const likes = document.createElement("p");
      const button = document.createElement("button");
      divCard.className = "card";
      image.className = "toy-avatar";
      button.className = "like-btn";

      name.innerText = object.name;
      divCard.appendChild(name);
      image.src=object.image;
      divCard.appendChild(image);
      likes.innerText= `${object.likes} Likes`;
      divCard.appendChild(likes);
      button.id = object.id;
      button.textContent = "Like";
      divCard.appendChild(button);
      toyCollection.appendChild(divCard);
        
      //update likes
      button.addEventListener("click", ()=> {
        object.likes++;
        fetch(`http://localhost:3000/toys/${object.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }, body: JSON.stringify({
            "likes" : object.likes
          })
        }).then(res => res.json())
        .then(objects => likes.innerHTML = `${object.likes} Likes`)//do nothing) 
        .catch(err => console.log(err));
      });

    });
  }).catch(err => console.log(err));
  
});

