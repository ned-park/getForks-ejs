const deleteBtn = document.querySelectorAll('.del')
const editBtn = document.querySelectorAll('.edit')
const forkBtn = document.querySelectorAll('.fork')
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector("#openModal");
const modalClose = document.querySelector(".close")
const versionSelect = document.querySelector('#version')
const btn = document.querySelector('#menu-btn')
const nav = document.querySelector('#menu')

btn.addEventListener('click', () => {
  console.log('testing')
  btn.classList.toggle('open')
  nav.classList.toggle('flex')
  nav.classList.toggle('hidden')
})

if (modalBtn) modalBtn.addEventListener('click', () => openModal(modal))
if (modalClose) modalClose.addEventListener('click', closeModal)
if (versionSelect) versionSelect.addEventListener('change', changeVersion)


function changeVersion() {
    let url = window.location.href.split('?version=')[0]
    window.location.replace(`${url}?version=${versionSelect.value}`)
}

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
    el.addEventListener('click', () => openModal(modal))
})

Array.from(forkBtn).forEach((el)=>{
    el.addEventListener('click', forkRecipe)
})


//Client-side API calls
async function deleteRecipe() {
    const repoId = this.parentNode.dataset.id
    console.log({repoId})
    const username = document.querySelector('h1').getAttribute('data-user')
    try{
        const response = await fetch(`/${username}/deleteRecipe`, {
            method: 'delete',
            headers: {'Content-type': 'application/json', credentials: 'include'},
            body: JSON.stringify({
                'repoId': repoId,
                'username': username
            })
        })
        window.location.replace(`/${username}`);
    } catch(err) {
        console.log(err)
    }
}


