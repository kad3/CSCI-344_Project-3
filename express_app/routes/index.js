
exports.index = function(req, res){
  res.render('index', { title: 'awesome links' , message: '' })
};

exports.user = function(req,res) {
  res.render('user', { title: req.params.user })
};


var redis = require('redis');
var client = redis.createClient();

exports.awesome = function(req, res){
  client.lrange('links',0,10,function(err, links) {
    var larray = new Array();
    if(err) console.log(err);
    else {
      if (links) {

        for (var i = 0; i < 10; i++){
          if(links[i]){
            console.log(links[i]);
            larray[i] = links[i];
          } else {
            links[i] == "";
          }
        }

        res.render('awesome', { word: "awesome" ,
                                link0: larray[0] ,
                                link1: larray[1] ,
                                link2: larray[2] ,
                                link3: larray[3] ,
                                link4: larray[4] ,
                                link5: larray[5] ,
                                link6: larray[6] ,
                                link7: larray[7] ,
                                link8: larray[8] ,
                                link9: larray[9] 
                                });

      } else {
        res.render('index', { title: 'awesome links' , message: 'No links for "awesome" have been tracked yet.' })
      }
    }
  });
};


exports.linux = function(req, res){
  client.lrange('linux',0,10,function(err, links) {
    var larray = new Array();
    if(err) console.log(err);
    else {
      if (links) {
        for (var i = 0; i < 10; i++){
          if(links[i]){
            console.log(links[i]);
            larray[i] = links[i];
          } else {
            links[i] == "";
          }
        }

        res.render('awesome', { word: "linux" ,
                                link0: larray[0] ,
                                link1: larray[1] ,
                                link2: larray[2] ,
                                link3: larray[3] ,
                                link4: larray[4] ,
                                link5: larray[5] ,
                                link6: larray[6] ,
                                link7: larray[7] ,
                                link8: larray[8] ,
                                link9: larray[9] 
                                });

      } else {
        res.render('index', { title: 'awesome links' , message: 'No links for "linux" have been tracked yet.' })
      }
    }
  });
};
