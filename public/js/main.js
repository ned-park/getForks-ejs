const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteRecipe)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', modifyRecipe)
})


async function deleteRecipe(){
    const recipeId = this.parentNode.dataset.id
    try{
        const response = await fetch('dashboard/deleteRecipe', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'recipeId': recipeId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function modifyRecipe(){
    const recipeId = this.parentNode.dataset.id
    try{
        const response = await fetch('dashboard/modifyRecipe', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'recipeIdFromJSFile': recipeId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
