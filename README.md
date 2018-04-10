- Project Description

Readable project for the Udacity React and Redux Nanodegree course. 

- Getting Started

As you'd expect, just do
	
    npm install

to install modules and then

	npm start
    
to start the front end server. (The API server will of course have to be running as well.)

- Notes

1. There are warnings in the console about anchors not appearing as decsendants of themselves. I'm afraid I'm not a HTML / CSS
   expert so I've used reactstrap to style things, and I couldn't see a simple way of fixing this warning without having to 
   spend time making the component look proper. I preferred to spend my time learning react & redux :)

2. The rubric mentions being able to upvote / downvote a post from the detail page. I have not implemented this because of the way
   you can make edits and then discard them on the page in my implementation; there is no API call, as far as I could see, to set
   a voteScore instead of having to hit the API (n) times if they upVote repeatedly and then save. I hope this is OK. 
   
3. I've left a logger running to display messages in the Console.

