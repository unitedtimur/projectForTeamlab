var myCenter = new google.maps.LatLng(55.80368019, 37.74117427);

function initialize() {
    var mapProp = {
        center: myCenter,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        rotateControl: false
    };

    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

    var marker = new google.maps.Marker({
        position: myCenter,
        icon: 'public/img/icon-map-marker.png'
    });
    marker.setMap(map);
}
google.maps.event.addDomListener(window, 'load', initialize);