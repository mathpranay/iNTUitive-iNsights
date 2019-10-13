# iNTUitive INsights

## Inspiration
As University students, we know the struggle of managing different activities on a day to day basis. Having a program that would help users deliver high efficiency while working for  a limited amount of time would help the user multi task other activities better. 
## What it does
The main purpose of our application is to augment the productivity of our users. We accomplish this by monitoring some specific facial features of the user and then using that data to provide detailed analysis of the user’s working session.
The user starts off by logging into our website and then starting a session. The session starts by loading the python script which tracks the facial features of the user. The user then carries on with his regular work and upon completion of his work, terminates the python script through the website.
After the script is terminated, the software computes the statistics on the data that is generated and displays it using intuitive graphs. The statistics also give a detailed comparison between previous working sessions and the current session in order for the user to have a comparison scale.
This whole concept enables us to monitor working patterns by constantly tracking activities of the user.These insights are useful when assessing employee/student workload and helps in increasing efficiency
## How we built it
The software can be decomposed into 3 sub parts:
### Back end facial tracking
This part is the one where all the facial features are tracked and the data is stored dynamically which is then used for the visualization. This was coded using Python (OpenCV) and Flask web framework.
### Graphs
We use the “Graphs.js” library to create intuitive graphical representations of our data. This is also used to compare the statistics of different work sessions to suggest the ideal time to study.
### Front End 
This part is used to connect the back end with the graphical interface. It consists of a simple web page which displays the purpose of our application and allows the user to commence the activity. This was coded using HTML, CSS, Javascript and bootstrap classes.
## How the facial mapping model works
The model uses a file which has a representation of the facial points.This file is used as a fundamental structure of our model.When the script starts running these points are used to track various facial features and based on them we analyse  different activities such as blinking,yawning, drowsiness and head movements. The values corresponding to these are stored in a csv file and then parsed into a JSON which is then plotted using Graph.js.
## Challenges we ran into
One of the most fundamental issues that we faced was combining all the different models together. Since its cumbersome to compile code in different languages.
With relatively low experience of working with javascript, it was even harder to implement the graphs as it involved tweaking the JSON files in a way they can be plotted easily
Creating functions in order to document different facial movements
## Accomplishments that we're proud of
The efficiency of our face detection model
Lucid compilation of different parts of our code.
Seamless interface navigation using only one click
Intuitive display of graphs
## What we learned
We learned how to use Charts.js
How to develop front end using javascript.
How to use OpenCV models.
## What's next for Intuitive Insights
We believe this software has an immense potential in the current industry.The software can be used by any organisation to track employee productivity levels throughout the day in order to manage their workload effectively.This can also be used by students in order to assess their study patterns 
## Built With
Python
Javascript
OpenCv
Dlib
Graph.js
Flask
POST

Try it out
 
 [Demo](https://youtu.be/Q3RF1sWRjm0)
 
 ## To run the app:
 * pip install requirements.txt //(python 3.6, install Cmake before Dlib)
 
 * run server.py
 
 * run index.html on a live server
 
 

