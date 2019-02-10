var key;

axios.get('/key')
.then(function (res) {
  key = res.data;
});

setInterval(function() {
  axios.post('/getLoc', {
    'car' : key
  }).then(function (res) {
    console.log(res.data);
  })
}, 500);
