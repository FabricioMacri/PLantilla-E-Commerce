
fetch('http://localhost:9000/api', {mode: 'cors'})
    .then(function(response) {
    return response.text();
    })
    .then(function(text) {
    console.log('Request successful', text);
    })
    .catch(function(error) {
    console.log('Request failed', error)
    });