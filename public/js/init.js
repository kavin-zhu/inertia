var key = 0;
var carLocs = [{x: 185, y:30}, {x: 40, y:185}, {x: 185, y:60}];

axios.get('/key')
.then(function (res) {
  key = res.data;
});

setInterval(function() {
  axios.post('/getLoc', {
    'car' : key
  }).then(function (res) {
    carLocs = res.data;
  })
}, 500);
