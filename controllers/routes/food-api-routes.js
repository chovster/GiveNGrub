let database = require("../../models")


module.exports = function(app){

    

    app.get('/api/fp/food/:id', function(req, res){


        //We need to find out how we are passing data from html to here!
        //It is either through the url or actual data object!!!!!!!!
        let id = req.params.id

        console.log("This comes in here?? or no?")
        database.Food.findAll({
            where: {
                OrganizationId: id
            }
        }).then(function(foodList){

            //console.log(foodList)

            res.json(foodList)
        })
    })

    app.post('/api/fp/food/:id', function(req, res){

        //We need to find out how we are passing data from html to here!
        //It is either through the url or actual data object!!!!!!!!
        //let id = req.query.id
        

        let frozen = req.body.frozen
        let fresh = req.body.fresh
        let canned = req.body.canned
        let packaged = req.body.packaged
        let description = req.body.description

        //this has to be true all the time in here!
        let status = req.body.status
        let remaining = req.body.remaining
        let takenBy = null
        let state = req.body.state
        let city = req.body.city
        let OrganizationId = req.params.id
        

        database.Food.create({
            frozen: frozen,
            fresh: fresh,
            canned: canned,
            packaged: packaged,
            description: description,
            status: status,
            remaining: remaining,
            takenBy: takenBy,
            state: state,
            city: city,
            OrganizationId: OrganizationId
        }).then(function(createdFoodList){

            console.log(createdFoodList)
            res.json(createdFoodList)
        })
    })

    app.put('/api/fp/food/taken', function(req, req){
        //We need to find out how we are passing data from html to here!
        //It is either through the url or actual data object!!!!!!!!
        //let OrganizationId = req.body.id
        let foodId = req.body.id
        let status = req.body.status
        let takenBy = req.body.takenById

        database.Food.update({
            status: status,
            takenBy: takenBy
        },
        {
            where: {
                id: foodId
            }
        }).then(function(result){
            console.log(result)
            res.json(result)

        })

    })

    /*
    app.delete('/api/fp/food/expire', function(req, req){
        //We need to find out how we are passing data from html to here!
        //It is either through the url or actual data object!!!!!!!!
        //let OrganizationId = req.body.id
        let foodId = req.body.id
        
        database.Food.update({
            status: status,
            takenBy: takenBy
        },
        {
            where: {
                id: foodId
            }
        }).then(function(result){
            console.log(result)
            res.json(result)

        })

    })
    */
}