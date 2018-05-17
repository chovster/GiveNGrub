
//let apiKey = require('../../config/keys')
let geocoder

$(document).ready(function(){
    
    $(document).on("click", "#submit", handleSignUpSubmit)
    $('select').material_select();
    
    function handleSignUpSubmit(event) {
        event.preventDefault();
        
        //Address part
        let address = $('#address').val().trim()
        let city = $('#city').val().trim()
        let state = $('#state').val().trim()

        let zip_code = $('#zip_code').val().trim()

        
        address = address +
        ", " +
        city||"" +
        ", " +
        state||"" +
        ", " +
        zip_code||"";

        //Organization characteristic part
        let entity = $('#entity').val()
        let capacity = $('#capacity').val()
        
        
        let newUser = {
            username: $('#username').val().trim(),
            email: $('#email').val().trim(),
            password: $('#password').val().trim(),
            organization: $('#organization').val().trim(),
            maincontact: $('#maincontact').val().trim(),
            entity: entity,
            capacity: capacity
        }
        codeAddress(address, newUser)
        
        
        
        
    }
    
    function codeAddress(address, user){
        
        geocoder = new google.maps.Geocoder()
        
        if(geocoder){
            geocoder.geocode(
                {
                    'address': address
                }, 
                function(result, status){
                    if(status === google.maps.GeocoderStatus.OK){
                        if(result){
                            
                            //console.log(result)

                            user.formattedAddress = result[0].formatted_address
                            user.state = result[0].address_components[5].short_name
                            user.city = result[0].address_components[3].short_name
                            user.latitude = result[0].geometry.location.lat()
                            user.longitude = result[0].geometry.location.lng()
                            user.place_id = result[0].place_id
                            
                            //console.log(user)
                            
                            createAccount(user)
                            //return addressComponent
                        }
                    } else {
                        let error = new Error("The address you have provided is not sufficient! Try it again.")
                        throw error
                        location.reload()
                    }
                }
            )
        }  
    }
        
        
    function createAccount(newUser){
        
        $.post('/api/register', newUser, function(result, status){
            if(result){
                let id = result.id

                let identityObject = {
                    id: id,
                    address: result.address,
                    city: result.city,
                    state: result.state,
                    place_id: result.place_id,
                    entity: newUser.entity,
                    rating: result.rating
                }

                let myJSONObject = JSON.stringify(identityObject)
                localStorage.setItem('identity', myJSONObject)
                
                //console.log(identityObject)
                
                if(identityObject.entity === "FP"){
                    console.log("Everything was succeed until this point!!!")
                    window.location.href = "../foodprovider.html"
                } else {
                    window.location.href = "../nonprofit.html"
                }
                
            }
            
        })
        
    }


    function abbrState(input, to){
    
        var states = [
            ['Arizona', 'AZ'],
            ['Alabama', 'AL'],
            ['Alaska', 'AK'],
            ['Arizona', 'AZ'],
            ['Arkansas', 'AR'],
            ['California', 'CA'],
            ['Colorado', 'CO'],
            ['Connecticut', 'CT'],
            ['Delaware', 'DE'],
            ['Florida', 'FL'],
            ['Georgia', 'GA'],
            ['Hawaii', 'HI'],
            ['Idaho', 'ID'],
            ['Illinois', 'IL'],
            ['Indiana', 'IN'],
            ['Iowa', 'IA'],
            ['Kansas', 'KS'],
            ['Kentucky', 'KY'],
            ['Kentucky', 'KY'],
            ['Louisiana', 'LA'],
            ['Maine', 'ME'],
            ['Maryland', 'MD'],
            ['Massachusetts', 'MA'],
            ['Michigan', 'MI'],
            ['Minnesota', 'MN'],
            ['Mississippi', 'MS'],
            ['Missouri', 'MO'],
            ['Montana', 'MT'],
            ['Nebraska', 'NE'],
            ['Nevada', 'NV'],
            ['New Hampshire', 'NH'],
            ['New Jersey', 'NJ'],
            ['New Mexico', 'NM'],
            ['New York', 'NY'],
            ['North Carolina', 'NC'],
            ['North Dakota', 'ND'],
            ['Ohio', 'OH'],
            ['Oklahoma', 'OK'],
            ['Oregon', 'OR'],
            ['Pennsylvania', 'PA'],
            ['Rhode Island', 'RI'],
            ['South Carolina', 'SC'],
            ['South Dakota', 'SD'],
            ['Tennessee', 'TN'],
            ['Texas', 'TX'],
            ['Utah', 'UT'],
            ['Vermont', 'VT'],
            ['Virginia', 'VA'],
            ['Washington', 'WA'],
            ['West Virginia', 'WV'],
            ['Wisconsin', 'WI'],
            ['Wyoming', 'WY']
        ];
    
        if (to == 'abbr'){
            input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
            for(i = 0; i < states.length; i++){
                if(states[i][0] == input){
                    return(states[i][1]);
                }
            }    
        } else if (to == 'name'){
            input = input.toUpperCase();
            for(i = 0; i < states.length; i++){
                if(states[i][1] == input){
                    return(states[i][0]);
                }
            }    
        }
    }
        
})