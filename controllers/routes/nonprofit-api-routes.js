
let database = require("../../models")

module.exports = function(app){


    app.get('/api/np/info/:id', function(req, res){
        database.Organization.findOne({
            where:{
                id: req.params.id
            } 
        }).then(function(result){
            console.log(result)
            res.json(result)
        })
    })

    app.get('/api/np/update/foodlist/:id', function(req, res){
        database.Food.update(
            {
                takenBy: req.query.id,
                status: true
            },
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(function(result){
            res.json(result)
        })
    })

    app.put('/api/update/stars/:id', function(req, res){
        database.Organization.update(
            {
                rating: req.body.rate
            },
            {
                where:{
                    id: req.params.id
                }
            }
        ).then(function(result){
            //console.log('\n\n' + result.rating)
            res.json(result)

        })
    })

    app.get('/api/np/foodlist', function(req, res){

        database.Food.findAll({
            where: {
                status: false,
                state: req.query.state,
                city: req.query.city
            },
            include: [{
                model: database.Organization,
                attributes: ['company_name', 'contact', 'address', 'latitude', 'longitude', 'rating']
            }]
        }).then(function(foodList){
            //console.log(foodList)
            res.json(foodList)
        })
    })
}