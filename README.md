# TweetCloud

## Made with Angular and Material design for Angular (uses Twitter API)

## This tool provides the functionality to scan recent tweets for a user specified keyword and display the words most used in conjunction with that keyword in table and cloud format. (Also provides the number of times these words are used in conjunction)

## This tool also provides the functionality to search for a username or Twitter handle and display the words this account or person uses the most based on their recent tweets.

##How To Run 

git clone <URL>
cd <PathToFiles>/Project 
npm install
cd <PathToFiles>/Project/Server 
npm start
cd <PathToFiles>/Project/SocialMediaFeed 
npm start

Server runs on port 8080 - note proper credentials are required
Client runs on port 4200

##Server Features
Get(/search/:keyword)
* by default searches for 500 tweets with the corresponding keyword
	* can be altered with parameter called numberOfTweets
* parses all text from tweets and counts words the occur the most

Get(/user/:username)
* gets recent tweets from a user
* parses all text from tweets and counts words the occur the most

Note both methods return a json array with the following structure:
	array = { text: <word>, weight: <number of occurences of word> }
	
##Client Features
* makes use of both methods provided by API
* creates a wordcloud and list showing words that occur the most

##Major Changes
* began with idea for a single user to have access to multiple twitter feeds from a single account
* pivoted to data vizuliation of tweets because it would invite more users
	* easier to use and no account needed
