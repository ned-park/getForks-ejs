const deleteBtn = document.querySelectorAll('.del')
const editBtn = document.querySelectorAll('.edit')
const forkBtn = document.querySelectorAll('.fork')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteRecipe)
})

Array.from(editBtn).forEach((el)=>{
    el.addEventListener('click', modifyRecipe)
})

Array.from(forkBtn).forEach((el)=>{
    el.addEventListener('click', forkRecipe)
})

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
