

var map
var foodProviderLocations = []


function initMap() {
    
    
    
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("not getting location")
        }
    }
    
    
    function showPosition(position) {
        let currentLat = position.coords.latitude
        let currentLng = position.coords.longitude
        console.log(currentLat + " " + currentLng)
        
        var curLocMap = new google.maps.LatLng(currentLat,currentLng)
        
        var marker = new google.maps.Marker({
            position: curLocMap,
            map: map,
            label: {text: "Home", color: "white"},
            icon:"../images/home.png"
        })

        map.setCenter(curLocMap)
        map.setZoom(12)
        
    }

    getLocation()
    
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 33.6694649, lng: -117.8231107 },
        zoom: 12,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ]
    });

    google.maps.event.addListener(map, "click", function(event){

        console.log('clicked clicked')
    })

    $(document).ready(function(){
    
    
        $(document).on('click', '.submitForGrab', function(event){
            
            let identityObject = localStorage.getItem('identity')
            identityObject = JSON.parse(identityObject)
            
            
            let myId = {
                id: identityObject.id
            }
            
            let id = this.id
            
            $.get('/api/np/update/foodlist/'+id, myId, function(data, status){
                
                $("#div"+id).remove()
                $("#card"+id).append($('<p>').text("Ready to pick up!"))
            })
            
        })
        
        $(document).on('click', '.deleteItem', function(event){
            let id = this.id
            console.log('\n\n')
            console.log(id)
            console.log('\n\n')
            $("#currentCard"+id).remove()
        })
        
        $(document).on('click', '.checkboxes', function(event){
            console.log('\n\n')
            
            console.log(this)
            
            console.log('\n\n')
            
            let id = this.id
            
            if($("#"+this.id).is(":checked")){
                $('#grabLists').append($('<div>')
                .addClass("card blue-grey darken-1")
                .attr("id", "currentCard"+this.id)
                .append($('<div>')
                .addClass("card-content white-text")
                .append($('<span>')
                .addClass("card-title")
                .text($(this).attr("org_name")))
                .append($('<p>')
                .text(`Address: ${$(this).attr("address")}`))
                .append($('<p>')
                .text(`Description: ${$(this).attr("description")}`)))
                .append($('<div>')
                .attr('align', "center")
                .addClass("card-action")
                .attr('id', "card"+this.id)
                .append($('<div>')
                .attr('id', "div"+this.id)
                .append($('<button>')
                .addClass("btn waves-effect waves-light")
                .addClass("submitForGrab")
                .attr("type", "submit")
                .attr("id", this.id)
                .text("Submit"))
                .append($('<button>')
                .addClass("btn waves-effect waves-light red")
                .addClass("deleteItem")
                .attr("type", "submit")
                .attr("id", this.id)
                .text("Delete")))))
                
                $("."+this.id).empty()
                
                
            }
            
            
        })
        
        
        function grabOrganizationInfo() {
            let identityObject = localStorage.getItem('identity')
            identityObject = JSON.parse(identityObject)
            
            $.get('/api/np/info/'+identityObject.id, function(data, status){
                if(data){
                    $('#name').text(data.company_name)
                }
            })
        }
        
        function returnId() {
            let identityObject = localStorage.getItem('identity')
            identityObject = JSON.parse(identityObject)
            return identityObject.id
        }
        
        function getFoodListNearYou() {
            let identityObject = localStorage.getItem('identity')
            identityObject = JSON.parse(identityObject)
            
            //console.log(identityObject.state)
            //console.log(identityObject.city)
            
            let filter = {
                state: identityObject.state,
                city: identityObject.city
            }
            
            $.get('/api/np/foodlist', filter, function(data, status){
                
                if(data){
    
                    for(let i = 0; i < data.length; i++){

                        console.log(data[i].Organization.latitude)
                        console.log(data[i].Organization.longitude)
                        let lat = data[i].Organization.latitude
                        let lng = data[i].Organization.longitude

                        let markerLocation = new google.maps.LatLng(lat, lng)
                        //console.log(markerLocation)
                        

                        var marker = new google.maps.Marker({
                            position: markerLocation,
                            map: map,
                            label: {text: `${data[i].Organization.company_name}`, color: "white"},
                            icon:"../images/food.png"
                        })
                        

                        
    
    
                        $('#data').append($('<li>')
                        .append($('<div>')
                        .addClass("collapsible-header")
                        .text(data[i].Organization.company_name))
                        .append($('<div>')
                        .addClass("collapsible-body")
                        .append($('<p>')
                        .text(`Donor Ratings: ${data[i].Organization.rating}`))
                        .append($('<p>')
                        .text(`<Food Donated>`))
                        .append($('<p>')
                        .text(`Frozen: ${data[i].frozen}, Fresh: ${data[i].fresh}, Canned: ${data[i].canned}, Packaged: ${data[i].packaged}`))
                        .append($('<p>')
                        .text(`Description: ${data[i].description}`))
                        .append($('<p>')
                        .text(`Address: ${data[i].Organization.address}`))
                        .append($('<p>')
                        .text(`Contacts: ${data[i].Organization.contact}`))
                        .append($('<div>')
                        .append($('<input>').attr('type', "checkbox").addClass('checkboxes')
                        .attr("id", data[i].id)
                        .attr("organizationId", data[i].OrganizationId)
                        .attr("org_name", data[i].Organization.company_name)
                        .attr("address", data[i].Organization.address)
                        .attr("description", data[i].description))
                        .append($('<label>').attr('for', data[i].id).text("Grab")))).addClass(""+data[i].id))
                        
                        
                    }
                }
            })
            
        }
        

        function addMarker(position) {
            new google.maps.Marker({
                position: postion,
                map: map
            })
        }

        grabOrganizationInfo()
        getFoodListNearYou()
        
    })
}



