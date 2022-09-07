const deleteBtn = document.querySelectorAll('.del')
const editBtn = document.querySelectorAll('.edit')
const forkBtn = document.querySelectorAll('.fork')
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector("#openModal");
const modalClose = document.querySelector(".close")

if (modalBtn) modalBtn.addEventListener('click', () => openModal(modal))
if (modalClose) modalClose.addEventListener('click', closeModal)


// Modal Stuff, <<<move me later>>>
function openModal(modal) {
    console.log('opening modal')
    modal.style.display = "block";
  }
  
  function closeModal() {
    modal.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == modal) {
      closeModal()
    }
  } 

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteRecipe)
})

Array.from(editBtn).forEach((el)=>{
    el.addEventListener('click', modifyRecipe)
})

Array.from(forkBtn).forEach((el)=>{
    el.addEventListener('click', forkRecipe)
})


//Client-side API calls
async function deleteRecipe() {
    const recipeId = this.parentNode.dataset.id
    const username = document.querySelector('h1').getAttribute('data-user')
    try{
        const response = await fetch(`/${username}/deleteRecipe`, {
            method: 'delete',
            headers: {'Content-type': 'application/json', credentials: 'include'},
            body: JSON.stringify({
                'recipeId': recipeId,
                'username': username
            })
        })
        window.location.replace(`/${username}`);
    } catch(err) {
        console.log(err)
    }
}

async function modifyRecipe() {
    const recipeId = this.parentNode.dataset.id
    const username = document.querySelector('h1').getAttribute(`username`)
    try {
        const response = await fetch(`/${username}/modifyRecipe`, {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'recipeIdFromJSFile': recipeId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}




