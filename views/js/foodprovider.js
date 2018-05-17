
$(document).ready(function(){
    
    
    $(document).on("click", "#add", handleNewFoodSubmit)
    
    function handleNewFoodSubmit(event) {
        event.preventDefault()
        
        
        let fresh = $("#fresh").val()
        let frozen = $("#frozen").val()
        let packaged = $("#packaged").val()
        let canned = $("#canned").val()
        let description = $("#description").val().trim()
        let status = false
        let remaining = 24
        
        
        let foodPackage = {
            fresh: fresh,
            frozen: frozen,
            packaged: packaged,
            canned: canned,
            description: description,
            status: status,
            remaining: remaining
        }
        insertFoodPackage(foodPackage)
        
    }
    
    
    
    
    function insertFoodPackage(foodPackage) {
        let identityObject = localStorage.getItem('identity')
        identityObject = JSON.parse(identityObject)
        
        foodPackage.state = identityObject.state
        foodPackage.city = identityObject.city
        
        $.post('/api/fp/food/'+identityObject.id, foodPackage, function(data, status){
            getRating(identityObject.id)
            //window.location.href = window.location.href
        })
    }
    
    function getRating(id){
        //This is organization data
        $.get('/api/identity/'+ id, function(data, status){
            //console.log("\n\nDo we come here?? :3:3:3\n\n")
            if(data){
                
                updateRating(id, data.rating)
            }
            
        })
        
    }
    
    function updateRating(id, rating) {
        
        
        let rate = {
            rate: rating + 1
        }
        $.ajax({
            method: "PUT",
            url: "/api/update/stars/" + id,
            data: rate
        }).then(function(result){
            window.location.href = window.location.href
        })
        
    }
    
    function getFoodProviderFoodList(){
        let identityObject = localStorage.getItem('identity')
        identityObject = JSON.parse(identityObject)
        getTheData(identityObject.id)
    }
    
    
    
    function getTheData(id) {
        
        //This is food list data
        $.get('/api/fp/food/'+ id, function(data, status){
            
            if(data){
                //console.log(data)
                for(let i = 0; i < data.length; i++){
                    let status
                    let formattedDate

                    if(data[i].status === false){
                        status = "Available"
                    } else {
                        status = "Grabbed"
                    }
                    formattedDate = moment(data[i].createdAt).format('MM/DD/YY')
                    
                    $("#submitNewList").append($("<tr>")
                    .append($("<td>").text(status))
                    .append($("<td>").text(formattedDate))
                    .append($("<td>").text(data[i].fresh))
                    .append($("<td>").text(data[i].frozen))
                    .append($("<td>").text(data[i].packaged))
                    .append($("<td>").text(data[i].canned))
                    .append($("<td>").text(data[i].description)))
                    
                }
            } else {
                console.log("You do not have anything listed!")
            }
        })
        
    }
    
    getFoodProviderFoodList()
    
    
})