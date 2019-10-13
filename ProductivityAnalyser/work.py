from scipy.spatial import distance as dist
from imutils.video import VideoStream
from imutils import face_utils
from threading import Thread
import argparse
import pandas as pd
import numpy as np
import playsound
import imutils
import time
import dlib
import cv2
import pandas as pd

ap = argparse.ArgumentParser()
ap.add_argument("-p", "--shape-predictor", required=True,
    help="path to facial landmark predictor")
ap.add_argument("-v", "--video", type=str, default="",
    help="path to input video file")
args = vars(ap.parse_args())

start_time=time.time()

def eye_aspect_ratio(eye):
	# compute the euclidean distances between the two sets of
	# vertical eye landmarks (x, y)-coordinates
	A = dist.euclidean(eye[1], eye[5])
	B = dist.euclidean(eye[2], eye[4])

	# compute the euclidean distance between the horizontal
	# eye landmark (x, y)-coordinates
	C = dist.euclidean(eye[0], eye[3])

	# compute the eye aspect ratio
	ear = (A + B) / (2.0 * C)

	# return the eye aspect ratio
	return ear

def smile_ratio(mouth):
    left = mouth[0]
    top = mouth[3]
    right = mouth[6]
    bottom = mouth[9]
    return (dist.euclidean(left,top)+dist.euclidean(right,top))/(dist.euclidean(left,bottom)+dist.euclidean(right,bottom))

def isSmiling(SmileRatio):
    return (SmileRatio<0.85)
    
def yawn_ratio(mouth):
	left = mouth[0]
	top = mouth[3]
	right = mouth[6]
	bottom = mouth[9]
	return dist.euclidean(top,bottom)/dist.euclidean(left,right)

def isYawning(YawnRatio):
	return (YawnRatio>0.6)
	
def look_away(points):
	left = points[0]
	right = points[1]
	center = points[2]
	return dist.euclidean(left,center)/dist.euclidean(center,right)
	
	
	

data_dict={}
data_dict['time_away']=0
data_dict['drowsy']=0
data_dict['yawn']=0
data_dict['Blinks'] = 0
data_dict['Looked_Away']=0
data_dict['time smiling'] = 0

EYE_AR_THRESH = 0.3
EYE_AR_CONSEC_FRAMES_blink = 3
EYE_AR_CONSEC_FRAMES_drowsy = 48
YAWN_THRESH = 30
SMILE_CONSEC_FRAMES = 30

# initialize the frame counters and the total number of blinks
BLINK_COUNTER = 0
DROWSY_COUNTER=0
YAWNCOUNTER = 0
SMILECOUNTER = 0

ALARM_ON=False

(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]
(mStart, mEnd) = face_utils.FACIAL_LANDMARKS_IDXS["mouth"]

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(args["shape_predictor"])


vs = VideoStream(src=0).start()
# vs = VideoStream(usePiCamera=True).start()
fileStream = False
time.sleep(1.0)
looking_away_timer=0
smiling_timer = 0
temp_count=0
prev_time=float('Inf')
smile_start_time = float('Inf')

while True:
	if fileStream and not vs.more():
		break

	frame = vs.read()
	frame = imutils.resize(frame, width=450)
	gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
	rects = detector(gray, 0)


	looking_away_timer+=1
	
	if(time.time()-prev_time>3 and temp_count==0):
			print('looking away')
			cur_time=time.time()
			data_dict['Looked_Away']+=1
			temp_count=1
		
	
	for rect in rects:
		prev_time=time.time()
		if(temp_count==1):
			data_dict['time_away']+=(prev_time-cur_time)
			temp_count=0
		
		looking_away_timer=0
		

		
		shape = predictor(gray, rect)
		shape = face_utils.shape_to_np(shape)

		leftEye = shape[lStart:lEnd]
		rightEye = shape[rStart:rEnd]
		leftEAR = eye_aspect_ratio(leftEye)
		rightEAR = eye_aspect_ratio(rightEye)
		mouth = shape[mStart:mEnd]
		SmileRatio = smile_ratio(mouth)
		YawnRatio = yawn_ratio(mouth)
		points = [shape[0],shape[16],shape[27],shape[33],shape[8]]
		if (isSmiling(SmileRatio)):
			smile ='smiling'
		else:
			smile ='not smiling'
			
		if (isYawning(YawnRatio)):
			yawn ='yawning'
		else:
			yawn ='not yawning'
			
		if(isSmiling(SmileRatio)):
			SMILECOUNTER+=1
			if(smile_start_time==float('inf')):
				smile_start_time = time.time()
		else:
			if(SMILECOUNTER>SMILE_CONSEC_FRAMES):
				data_dict['time smiling']+= time.time()-smile_start_time
				smile_start_time = float('Inf')
			SMILECOUNTER=0
			
		if(isYawning(YawnRatio)):
			YAWNCOUNTER+=1
		else:
			if(YAWNCOUNTER>YAWN_THRESH):
				data_dict['yawn']+=1
			YAWNCOUNTER=0
		
		ear = (leftEAR + rightEAR) / 2.0

		leftEyeHull = cv2.convexHull(leftEye)
		rightEyeHull = cv2.convexHull(rightEye)
		
		cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
		cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)

		if (ear < EYE_AR_THRESH):
			BLINK_COUNTER += 1
			DROWSY_COUNTER += 1
			
			if(DROWSY_COUNTER>=EYE_AR_CONSEC_FRAMES_drowsy):
				ALARM_ON=True
				cv2.putText(frame, "Drowsiness: {:.2f}".format(ear), (300, 30),cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
		else:
			# if the eyes were closed for a sufficient number of
			# then increment the total number of blinks
			if BLINK_COUNTER >= EYE_AR_CONSEC_FRAMES_blink:
				data_dict['Blinks'] += 1
			
			if(DROWSY_COUNTER !=0):
				data_dict['drowsy']+=1
			
			BLINK_COUNTER = 0
			DROWSY_COUNTER = 0
   
            


		# draw the total number of blinks on the frame along with
		# the computed eye aspect ratio for the frame
		cv2.putText(frame, smile, (10, 30),
			cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
		cv2.putText(frame, yawn, (10, 50),
			cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
		for (x,y) in points:
			cv2.circle(frame, (x, y), 1, (0, 0, 255), -1)
		cv2.putText(frame, str(look_away(points)), (300, 30),
			cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

	# show the frame
	cv2.imshow("Frame", frame)
	key = cv2.waitKey(1) & 0xFF

	# if the `q` key was pressed, break from the loop
	if key == ord("q"):
		data=pd.read_csv('data.csv')
		
		data_dict['Total_working_time']=time.time()-start_time
		data=data.append(data_dict,ignore_index=True)
		data.to_csv('data.csv',index=False)

		break

# do a bit of cleanup
cv2.destroyAllWindows()
vs.stop()

data=pd.read_csv('data.csv')
print(data)
