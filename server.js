const express = require('express')
const app = express()
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000 //this store the post that we are going to use for the app
                                      //porcess.env sotres all key value pares and PORT is set by Heroku. ||3000 for default


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

// app.use((req, res, next) =>{
//   res.render("maintenance.hbs")
// })

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
app.get('/projects', (req,res) => {
  res.render('projects.hbs', {
    pageTitle: "This is the porjects page"
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Yanlis yere geldin arkadasim'
  })
})



app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
