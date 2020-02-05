const express = require('express');
const Twitter = require('twit');
const app = express();
const dotenv = require('dotenv');
sw = require('stopword')
dotenv.config();
const arrayfilter = require('arrayfilter');
var cors = require('cors')

app.use(cors())


const twitClient = new Twitter({

    consumer_key: "OifqLIQIufeY9znQCkbvg", consumer_secret: "IedFvi0JitR9yaYw9HwcCCEy4KYaLxf4p4rHRqGgX80", app_only_auth: true

    /*consumer_key: 'ZnCGn7IcEvcl84EdBVe6t9wtu',
    consumer_secret: 'N815bHYXKzgNRhJ3NLSwquDY6raHm3gBFpclaHMyzCRcRwfiku',
    access_token: '1122907867005190150-xkpBjeizhHo7hsupqcoVpHCJuDmlPN',
    access_token_secret: 't6M7KVsIjmgFGD9HA5izuZ2qTCuPxDF7mKQdqHwizxma4'

    consumer_key: process.env.CONSUMER_KEY || '',
    consumer_secret: process.env.CONSUMER_SECRET || '',
    access_token: process.env.ACCESS_TOKEN || '',
    access_token_secret: process.env.ACCESS_TOKEN_SECRET || ''*/


})

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});


app.get('/search/:keyword', (request, response) => {


    var keyword = request.params.keyword;
    var keyword2 = keyword.toLowerCase();
    const totalTweets = 100;
    var words = "";
    var arrayz;
    var inList = Boolean;
    var wordCounts = [];
    var tweetStack = []


    twitClient.get("search/tweets", {
        q: keyword,
        count: 100
    }).then(tweets1 => {


        var last_id = tweets1.data.statuses[tweets1.data.statuses.length - 1].id_str;
        tweetStack.push(tweets1.data.statuses)

        twitClient.get("search/tweets", {
            q: keyword,
            count: 100,
            max_id: last_id
        }).then(tweets2 => {

            Array.prototype.push.apply(tweetStack, tweets2.data.statuses)
            var last_id2 = tweets2.data.statuses[tweets2.data.statuses.length - 1].id_str;

            twitClient.get("search/tweets", {
                q: keyword,
                count: 100,
                max_id: last_id2
            }).then(tweets3 => {
                Array.prototype.push.apply(tweetStack, tweets3.data.statuses)
                var last_id3 = tweets3.data.statuses[tweets3.data.statuses.length - 1].id_str;

                twitClient.get("search/tweets", {
                    q: keyword,
                    count: 100,
                    max_id: last_id3
                }).then(tweets4 => {
                    Array.prototype.push.apply(tweetStack, tweets4.data.statuses)
                    var last_id4 = tweets4.data.statuses[tweets4.data.statuses.length - 1].id_str;

                    twitClient.get("search/tweets", {
                        q: keyword,
                        count: 100,
                        max_id: last_id4
                    }).then(tweets5 => {
                        Array.prototype.push.apply(tweetStack, tweets5.data.statuses)
                        var last_id5 = tweets5.data.statuses[tweets5.data.statuses.length - 1].id_str;

                        twitClient.get("search/tweets", {
                            q: keyword,
                            count: 100,
                            max_id: last_id5
                        }).then(tweets6 => {
                            Array.prototype.push.apply(tweetStack, tweets6.data.statuses)
                            var last_id6 = tweets6.data.statuses[tweets6.data.statuses.length - 1].id_str;

                            twitClient.get("search/tweets", {
                                q: keyword,
                                count: 100,
                                max_id: last_id6
                            }).then(tweets7 => {
                                Array.prototype.push.apply(tweetStack, tweets6.data.statuses)
                                var last_id7 = tweets7.data.statuses[tweets7.data.statuses.length - 1].id_str;

                                twitClient.get("search/tweets", {
                                    q: keyword,
                                    count: 100,
                                    max_id: last_id7
                                }).then(tweets8 => {
                                    Array.prototype.push.apply(tweetStack, tweets7.data.statuses)
                                    var last_id8 = tweets8.data.statuses[tweets8.data.statuses.length - 1].id_str;

                                    twitClient.get("search/tweets", {
                                        q: keyword,
                                        count: 100,
                                        max_id: last_id8
                                    }).then(tweets9 => {
                                        Array.prototype.push.apply(tweetStack, tweets9.data.statuses)
                                        var last_id9 = tweets9.data.statuses[tweets9.data.statuses.length - 1].id_str;

                                        twitClient.get("search/tweets", {
                                            q: keyword,
                                            count: 100,
                                            max_id: last_id9
                                        }).then(tweets10 => {
                                            Array.prototype.push.apply(tweetStack, tweets10.data.statuses)
                                            var last_id10 = tweets10.data.statuses[tweets10.data.statuses.length - 1].id_str;

                                            for (var i = 0; i <= tweetStack.length - 1; i++) {

                                                words += tweetStack[i].text;

                                            }

                                            arrayz = words.split(' ')

                                            const arrayfilter = require('arrayfilter');
                                            let rejectFo = arrayfilter.patternReject(keyword);
                                            let rejectFo2 = arrayfilter.patternReject(keyword2);
                                            let rejectEmpty = arrayfilter.emptyReject();

                                            var wordsToArray1 = sw.removeStopwords(arrayz) // removes famous stopwords
                                            wordsToArray1 = sw.removeStopwords(wordsToArray1, sw.es) // removes spanish stop words
                                            wordsToArray1 = sw.removeStopwords(wordsToArray1, [
                                                "*",
                                                "-",
                                                ".",
                                                "&",
                                                "&amp;",
                                                "—",
                                                ":",
                                                ";",
                                                "ー",
                                                "...",
                                                "e", "es"
                                            ]) // removes various stop characters
                                            let wordsToArray2 = wordsToArray1.filter(rejectFo); // removes instance of keyword
                                            let wordsToArray3 = wordsToArray2.filter(rejectFo2); // removes lowercase instance of keyword
                                            let wordsToArray = wordsToArray3.filter(rejectEmpty); // removes null entries


                                            for (var i = 0; i <= wordsToArray.length - 1; i++) {
                                                inList = false;

                                                if (wordCounts.length == 0) {
                                                    wordCounts.push({text: wordsToArray[i], weight: 0})
                                                }
                                                for (var j = 0; j <= wordCounts.length - 1; j++) {

                                                    if (wordCounts[j].text == wordsToArray[i]) {
                                                        wordCounts[j].weight ++
                                                        inList = true;

                                                    }
                                                    if (inList == false && j == wordCounts.length - 1) {
                                                        wordCounts.push({text: wordsToArray[i], weight: 0})
                                                    }
                                                }

                                            }

                                            response.send(wordCounts.sort(function (a, b) {
                                                return b.weight - a.weight
                                            }));

                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })

});


app.get('/user/:username', (request, response) => {
    var username = request.params.username;
    var words = "";
    var arrayz;
    var inList = Boolean;
    var wordCounts = [];


    twitClient.get("statuses/user_timeline", {
        screen_name: username,
        count: 100
    }, function (err, data1, response) {
        console.log(data1)

        var last_id = data1[data1.length - 1].id_str;
        console.log(last_id)

        twitClient.get("statuses/user_timeline", {
            screen_name: username,
            count: 100,
            max_id: last_id
        }, function (err, data2, response) {
            console.log(data2)
            Array.prototype.push.apply(data1, data2)
            var last_id2 = data2[data2.length - 1].id_str;

            twitClient.get("statuses/user_timeline", {
                screen_name: username,
                count: 100,
                max_id: last_id2
            }, function (err, data3, response) {
                console.log(data3)
                Array.prototype.push.apply(data1, data3);
                var last_id3 = data3[data3.length - 1].id_str;

                twitClient.get("statuses/user_timeline", {
                    screen_name: username,
                    count: 100,
                    max_id: last_id3
                }, function (err, data4, response) {
                    console.log(data4)
                    var last_id4 = data4[data4.length - 1].id_str;
                    Array.prototype.push.apply(data1, data4);

                    twitClient.get("statuses/user_timeline", {
                        screen_name: username,
                        count: 100,
                        max_id: last_id4
                    }, function (err, data5, response) {
                        console.log(data5)
                        var last_id5 = data5[data5.length - 1].id_str;
                        Array.prototype.push.apply(data1, data5);

                        twitClient.get("statuses/user_timeline", {
                            screen_name: username,
                            count: 100,
                            max_id: last_id5
                        }, function (err, data6, response) {
                            console.log(data6)
                            var last_id6 = data6[data6.length - 1].id_str;
                            Array.prototype.push.apply(data1, data6);

                            twitClient.get("statuses/user_timeline", {
                                screen_name: username,
                                count: 100,
                                max_id: last_id6
                            }, function (err, data7, response) {
                                var last_id7 = data7[data7.length - 1].id_str;
                                Array.prototype.push.apply(data1, data7);

                                twitClient.get("statuses/user_timeline", {
                                    screen_name: username,
                                    count: 100,
                                    max_id: last_id7
                                }, function (err, data8, response) {
                                    var last_id8 = data8[data8.length - 1].id_str;
                                    Array.prototype.push.apply(data1, data8);

                                    twitClient.get("statuses/user_timeline", {
                                        screen_name: username,
                                        count: 100,
                                        max_id: last_id8
                                    }, function (err, data9, response) {
                                        var last_id9 = data9[data9.length - 1].id_str;
                                        Array.prototype.push.apply(data1, data9);

                                        twitClient.get("statuses/user_timeline", {
                                            screen_name: username,
                                            count: 100,
                                            max_id: last_id9
                                        }, function (err, data10, response) {
                                            var last_id10 = data10[data10.length - 1].id_str;
                                            Array.prototype.push.apply(data1, data10);

                                            twitClient.get("statuses/user_timeline", {
                                                screen_name: username,
                                                count: 100,
                                                max_id: last_id10
                                            }, function (err, data11, response) {
                                                var last_id11 = data11[data11.length - 1].id_str;
                                                Array.prototype.push.apply(data1, data11);

                                                twitClient.get("statuses/user_timeline", {
                                                    screen_name: username,
                                                    count: 100,
                                                    max_id: last_id11
                                                }, function (err, data12, response) {
                                                    var last_id12 = data12[data12.length - 1].id_str;
                                                    Array.prototype.push.apply(data1, data12);

                                                    twitClient.get("statuses/user_timeline", {
                                                        screen_name: username,
                                                        count: 100,
                                                        max_id: last_id12
                                                    }, function (err, data13, response) {
                                                        var last_id13 = data13[data13.length - 1].id_str;
                                                        Array.prototype.push.apply(data1, data13);

                                                        twitClient.get("statuses/user_timeline", {
                                                            screen_name: username,
                                                            count: 100,
                                                            max_id: last_id13
                                                        }, function (err, data14, response) {
                                                            var last_id14 = data14[data14.length - 1].id_str;
                                                            Array.prototype.push.apply(data1, data14);

                                                            twitClient.get("statuses/user_timeline", {
                                                                screen_name: username,
                                                                count: 100,
                                                                max_id: last_id14
                                                            }, function (err, data15, response) {
                                                                var last_id15 = data15[data15.length - 1].id_str;
                                                                Array.prototype.push.apply(data1, data15);

                                                                twitClient.get("statuses/user_timeline", {
                                                                    screen_name: username,
                                                                    count: 100,
                                                                    max_id: last_id15
                                                                }, function (err, data16, response) {
                                                                    var last_id16 = data16[data16.length - 1].id_str;
                                                                    Array.prototype.push.apply(data1, data16);

                                                                    sendIt(data1);
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })

    function sendIt(databig) { // response.send(databig)

        for (var i = 0; i <= databig.length - 1; i++) {

            words += databig[i].text;
        }

        arrayz = words.split(' ')

        const arrayfilter = require('arrayfilter');
        let rejectEmpty = arrayfilter.emptyReject();
        var wordsToArray1 = sw.removeStopwords(arrayz) // removes famous stopwords
        let wordsToArray = wordsToArray1.filter(rejectEmpty); // removes null entries
        console.log('parsing');
        for (var i = 0; i <= wordsToArray.length - 1; i++) {

            inList = false;

            if (wordCounts.length == 0) {
                wordCounts.push({text: wordsToArray[i], weight: 0})
            }

            for (var j = 0; j <= wordCounts.length - 1; j++) {

                if (wordCounts[j].text == wordsToArray[i]) {
                    wordCounts[j].weight ++
                    inList = true;
                }
                if (inList == false && j == wordCounts.length - 1 && wordsToArray) {
                    wordCounts.push({text: wordsToArray[i], weight: 0})
                }
            }
        }
        response.send(wordCounts.sort(function (a, b) {
            return b.weight - a.weight
        }));
    }
})
