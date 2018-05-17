$(document).ready(function(){
    
    $(document).on("click", "#submit", handleSignInSubmit)
    
    function handleSignInSubmit(event) {
        event.preventDefault();

        let email = $("#email").val().trim()
        let password = $("#password").val().trim()

        let user = {
            email: email,
            password: password
        }

        getOrganization(user)

    }

    function getOrganization(user){
        $.get('/api/id', user, function(data, status){
        
            if(data){

                let identityObject = {
                    id: data.id,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    place_id: data.place_id,
                    entity: data.entity,
                    rating: data.rating
                }

                let myJSONObject = JSON.stringify(identityObject)
                localStorage.setItem('identity', myJSONObject)

                
                if(data.entity === "FP"){
                    window.location.href = "../foodprovider.html"
                } else if (data.entity === "NP"){
                    window.location.href = "../nonprofit.html"
                }
            } else {
                Materialize.toast("Either your email or password is not valid! Try again", 3000)
            }
        })
    }

    
})

