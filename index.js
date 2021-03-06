const express = require("express");
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const ngrok = require('ngrok');

const PORT = process.env.PORT || 5000

ngrok.connect(PORT).then(function(res, err) {
  if(err) {
    console.log(err);
  }
  console.log(res);
});

var key = 0;

var initLocs = [{x: 185, y:30}, {x: 40, y:185}, {x: 185, y:60}];
var locs = [{x: 185, y:30}, {x: 40, y:185}, {x: 185, y:60}];
var dests = [{x: 0, y:0}, {x: 0, y:0}, {x: 0, y:0}];
var destsBool = [false, false, false];

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/'));

app.get('/',function(req,res){
  res.sendFile(__dirname+'/public/index.html');
});

app.get('/key', function(req, res) {

  if (key <= 2) {
    res.send(key.toString());
    key++;
  } else {
    res.sendStatus(502);
  }
});

app.post('/getLoc', function(req, res) {
  var index = req.body.car;

  res.send(locs);

});

app.post('/setDest', function(req, res) {

  var index = req.body.car;
  var dest = {x: req.body.x, y: req.body.y};

  dests[index] = dest;
  destsBool[index] = true;

  if (destsBool[0] === true && destsBool[1] === true && destsBool[2] === true) {
    calcPos();
  }

});

function calcPos() {

  for (var i = 0; i < 3; i++) {

    if (locs[i].x < dests[i].x && canGoRight(i)) {
      locs[i].x += 3;
    } else if (locs[i].x > dests[i].x && canGoLeft(i)) {
      locs[i.x] -= 3;
    }

    if (locs[i].y < dests[i].y && canGoDown(i)) {
      locs[i].y += 3;
    } else if (locs[i].y > dests[i].y && canGoUp(i)) {
      locs[i.y] -= 3;
    }

    if (nearBy(locs[i], dests[i])) {
      locs[i] = initLocs[i];
    }
  }
  setTimeout (calcPos, 100);
}

function canGoUp (i) {

  var dist1 = locs[(i+1)%2].y - locs[i].y;
  var dist2 = locs[(i+1)%2].x - locs[i].x;
  if(dist1 < 0 && dist1 > -30 && Math.abs(dist2) < 15) {
    return false;
  }
  var dist1 = locs[(i+2)%2].y - locs[i].y;
  var dist2 = locs[(i+2)%2].x - locs[i].x;
  if(dist1 < 0 && dist1 > -30 && Math.abs(dist2) < 15) {
    return false;
  }

  if (locs[i].x > 180 && locs[i].x < 210) {
    return true;
  } else if (locs[i].x > 570 && locs[i].x < 600 && locs[i].y > 180) {
    return true;
  } else {
    return false;
  }
}

function canGoDown (index) {

  var dist1 = locs[(index+1)%2].y - locs[index].y;
  var dist2 = locs[(index+1)%2].x - locs[index].x;
  if(dist1 > 0 && dist1 < 30 && Math.abs(dist2) < 15) {
    return false;
  }
  var dist1 = locs[(index+2)%2].y - locs[index].y;
  var dist2 = locs[(index+2)%2].x - locs[index].x;
  if(dist1 > 0 && dist1 < 30 && Math.abs(dist2) < 15) {
    return false;
  }

  if (locs[index].x > 180 && locs[index].x < 210 && locs[index].y < 420) {
    return true;
  } else if (locs[index].x > 570 && locs[index].x < 600) {
    return true;
  } else {
    return false;
  }
}

function canGoRight (index) {
  var dist1 = locs[(index+1)%2].y - locs[index].y;
  var dist2 = locs[(index+1)%2].x - locs[index].x;
  if(dist2 > 0 && dist2 < 30 && Math.abs(dist1) < 15) {
    return false;
  }
  var dist1 = locs[(index+2)%2].y - locs[index].y;
  var dist2 = locs[(index+2)%2].x - locs[index].x;
  if(dist2 > 0 && dist2 < 30 && Math.abs(dist1) < 15) {
    return false;
  }

  if (locs[index].y > 180 && locs[index].y < 210 && locs[index].x < 600) {
    return true;
  } else if (locs[index].y > 390 && locs[index].y < 420) {
    return true;
  } else {
    return false;
  }
}

function canGoLeft (index) {
  var dist1 = locs[(index+1)%2].y - locs[index].y;
  var dist2 = locs[(index+1)%2].x - locs[index].x;
  if(dist2 < 0 && dist2 > -30 && Math.abs(dist1) < 15) {
    return false;
  }
  var dist1 = locs[(index+2)%2].y - locs[index].y;
  var dist2 = locs[(index+2)%2].x - locs[index].x;
  if(dist2 < 0 && dist2 > -30 && Math.abs(dist1) < 15) {
    return false;
  }

  if (locs[index].y > 180 && locs[index].y < 210) {
    return true;
  } else if (locs[index].y > 390 && locs[index].y < 420 && locs[index].x > 180) {
    return true;
  } else {
    return false;
  }
}

function nearBy(a, b) {
  var dist = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  if(dist < 35) {
    return true;
  } else {
    return false;
  }
}

app.listen(PORT);
console.log(PORT);
