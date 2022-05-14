// express
const express = require('express')
const app = express()
// express-handlebars
const exphbs = require('express-handlebars')
// restaurant.json
const restaurantList = require('./restaurant.json')
// port
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// route '/'
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})
// route '/restaurants/id'
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurantList.results.find(item => item.id.toString() === id)
  res.render('show', { restaurant })
})
// route '/search'
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  if (!keyword.length) {
    // res.redirect('/')
    res.render('index', {restaurant: [], author: true})
  } else {
    const restaurant = restaurantList.results.filter(item => {
      return item.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { restaurant, keyword })
  }
}
)
// create server
app.listen(port, () => {
  console.log(`the server create on http://localhost:${port}`)
})