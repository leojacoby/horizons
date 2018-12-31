"use strict";

var baseUrl = "http://gd2.mlb.com/components/game/mlb/"


if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Player = mongoose.model('Player', {
  firstName: String,
  lastName: String,
  pa: String,
  h: String,
  tb: String,
  bb: String,
  hr: String,
  hbp: String,
  so: String,
  sac: String,
  sb: String,
  cs: String,
  g: String
});


function getGameUrl(snippet) {
  return baseUrl + "year_" + snippet.slice(5, 9) + '/month_' + snippet.slice(10, 12) + '/day_' + snippet.slice(13, 15) + '/' + snippet.trim() + "batters/";
}

function getBattersUrl(header) {
  return "http://gd2.mlb.com" + header.slice(9)
}

var dayLinks = [];
for (var i = 4; i < 5; i++) {
  if (i < 10) {
    i = '0' + i;
  } else {
    i = String(i)
  }
  for (var j = 1; j < 4; j++) {
    if (j < 10) {
      j = '0' + j;
    } else {
      j = String(j)
    }
    dayLinks.push("http://gd2.mlb.com/components/game/mlb/year_2016/month_" + i + "/day_" + j + "/");
  }
}

dayLinks.splice(dayLinks.indexOf("http://gd2.mlb.com/components/game/mlb/year_2016/month_04/day_01/"), 1)
dayLinks.splice(dayLinks.indexOf("http://gd2.mlb.com/components/game/mlb/year_2016/month_04/day_02/"), 1)
//dayLinks.splice(dayLinks.indexOf("http://gd2.mlb.com/components/game/mlb/year_2016/month_04/day_31/"), 1)
//dayLinks.splice(dayLinks.indexOf("http://gd2.mlb.com/components/game/mlb/year_2016/month_06/day_31/"), 1)
//dayLinks.splice(dayLinks.indexOf("http://gd2.mlb.com/components/game/mlb/year_2016/month_09/day_31/"), 1)
//dayLinks.push("http://gd2.mlb.com/components/game/mlb/year_2016/month_10/day_01/")
//dayLinks.push("http://gd2.mlb.com/components/game/mlb/year_2016/month_10/day_02/")

var gameLinks = [];
var currentDayLinks;
var currentDayGameLinks;
var currentGameBatters;
var batterLinks = [];
var currentBattersUrl;

dayLinks.forEach(function(dayLink) {
  $.ajax({
    url: dayLink,
    success: function(resp) {
      console.log('inside a day')
      currentDayLinks = $(resp).find('li')
      currentDayLinks = Array.prototype.slice.call(currentDayLinks);
      currentDayGameLinks = currentDayLinks.filter(function(game) {
        var text = $(game).children('a').text().trim();
        return text.slice(0, 3) === "gid"
      })
      currentDayGameLinks.forEach(function(link) {
        $.ajax({
          url: getGameUrl($(link).text()),
          success: function(resp) {
            console.log('inside a game')
            currentBattersUrl = getBattersUrl($(resp).text().slice(6, 100))
            currentGameBatters = $(resp).find('li')
            currentGameBatters = Array.prototype.slice.call(currentGameBatters)
            currentGameBatters = currentGameBatters.slice(1)
            currentGameBatters.forEach(function(batter) {
              batterLinks.push(currentBattersUrl + '/' + $(batter).text().trim())
              console.log(currentBattersUrl)
            })

            batterLinks.forEach(function(link) {
              $.ajax({
                url: link,
                success: function(resp) {
                  var atbats = Array.prototype.slice.call($(resp).find('ab'))
                  var batterName = $($(resp).find('Player')[0]).attr('first_name') + ' ' + $($(resp).find('Player')[0]).attr('last_name')
                  atbats.forEach(function(atbat) {
                    debugger
                  })
                },
                error: function() {
                  alert('Keep pushing through obstacles')
                }
              })
            })
          },
          error: function() {
            throw new Error (getGameUrl($(link).text()) + ":  this game was postponed")
          }
        })
      })
    },
    error: function() {
      alert('Trust the process')
    }
  })
})
