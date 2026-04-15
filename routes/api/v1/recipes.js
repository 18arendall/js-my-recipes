const router = require('express').Router()

const recipes = require('../../../data/recipes.json')

router.get('/', (request, response)=>{
    const found = recipes.map(({ingredients, instructions, ...rest }) => rest);
    response.send(found)
})

router.post('/recipe/add', (request, response)=>{
    const { title, image, ingredients, instructions, prepTime, difficulty } = request.body

    const maxId = Math.max(...recipes.map(recipe => recipe.id))
    const id = maxId + 1
    recipes.push({ id, title, image, ingredients, instructions, prepTime, difficulty})

    const found = recipes.find(p => p.id === id)
    if (found) response.send(found)
    else response.send({error: {message: `Could not find recipe wiht id: ${id}` }})
})

router.get('/recipe/:id', (request, response)=>{
    const { id } = request.params
    const found = recipes.find(p => p.id.toString() === id)
    if (found) response.send(found)
    else response.send({error: {message: `Could not find recipe wiht id: ${id}` }})
})

module.exports = router