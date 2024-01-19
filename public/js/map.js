  mapboxgl.accessToken = mapToken;

  const map = new mapboxgl.Map({   
  container: 'map', // container ID
  style:"mapbox://styles/mapbox/streets-v12",
  center: listing.geometry.coordinates , // starting position [lng, lat]
  zoom: 10 ,// starting zoom
  });

  const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
  .setPopup(new mapboxgl.Popup({ offset: 25 })
  .setHTML(`<h4> ${listing.title} </h4>
           <p>Exact Location will be provided after booking </p> `))
  .addTo(map)
.setIcon(
  map.on('load', () => {
    // Load an image from an external URL.
    map.loadImage(
    'https://imgs.search.brave.com/mzx9XDpB1hYtEoLOYUVnc16n3lYA1W358EfF7AkNoR4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/aWNvbnNkYi5jb20v/aWNvbnMvcHJldmll/dy9yZWQvYWlyYm5i/LXh4bC5wbmc',
    (error, image) => {
    if (error) throw error;
     
    // Add the image to the map style.
    map.addImage('airbnb', image);
     
    // Add a data source containing one point feature.
    map.addSource('point', {
    'type': 'geojson',
    'data': {
    'type': 'FeatureCollection',
    'features': [
    {
    'type': 'Feature',
    'geometry': {
    'type': 'Point',
    'coordinates':listing.geometry.coordinates
    }}
    ] }
    });
     
    // Add a layer to use the image to represent the data.
    map.addLayer({
    'id': 'points',
    'type': 'symbol',
    'source': 'point', // reference the data source
    'layout': {
    'icon-image': 'airbnb', // reference the image
    'icon-size': 0.10,
    'icon-offset':[0,150], 
    
    }
    });
    }
    );
    }));
  