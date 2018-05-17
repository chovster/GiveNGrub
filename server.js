let express = require('express')
let bodyParser = require('body-parser')
const path = require('path')


let app = express()
const PORT = process.env.PORT || 5000

let database = require('./models')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'views')))


//If there is more routes then you can add more~

require('./controllers/routes/food-api-routes')(app)
require('./controllers/routes/html-api-routes.js')(app)
require('./controllers/routes/organization-api-routes.js')(app)
require('./controllers/routes/nonprofit-api-routes.js')(app)

database.sequelize.sync({force: false}).then(function(){
    app.listen(PORT, function() {
        console.log(`App is listening on PORT: ${PORT}`)
    })
})