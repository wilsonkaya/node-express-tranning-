const express = require('express')
const app = express()
const hbs = require('hbs')
const fs = require('fs')


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs') //this is how to set the view engine



app.use((req, res, next)=>{
  let now = new Date().toString()
  let log = `${now} ${req.method} ${req.url}`
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log')
    }
  } )
  next()
})

app.use((req, res, next) =>{
  res.render("maintenance.hbs")
})

app.use(express.static(__dirname + '/public')) //bunu assagi almamizin sebebi middleware ilk once run etmesi icin

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return  text.toUpperCase()
})

app.get('/', (req, res) => {
  // res.send('Hello World of Express')
  res.render('home.hbs', {
    pageTitle: 'this is about page',
    welcomeMessage: "Welcome to the landing page"
  })
})
app.get('/about', (req, res)=>{
  res.render('about.hbs',{
    pageTitle: 'this is about page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Yanlis yere geldin arkadasim'
  })
})

app.listen(3000)
