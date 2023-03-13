import cv2
import mediapipe as mp
from websocket import create_connection
import asyncio
import json


ws = create_connection("ws://localhost:4041")
ws.send(json.dumps({"type": "detection", "message": "connected"}))

mp_drawing = mp.solutions.drawing_utils
mp_hands = mp.solutions.hands

cap = cv2.VideoCapture(0)

index_w = 0
index_h = 0

check_hand = False

move = False
thumb_Ly = 0
thumb_Ry = 0
index_Ly = 0
index_Ry = 0

with mp_hands.Hands(min_detection_confidence=0.5, min_tracking_confidence=0.5) as hands:
    while cap.isOpened():
        ret, frame = cap.read()

        # Convert the image to RGB and process it with Mediapipe
        frame = cv2.flip(frame, 1)
        frame_height, frame_width, _ = frame.shape
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(image)

        # Draw the hand landmarks on the image
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        if results.multi_hand_landmarks:
            check_hand = True
            
            for hand_landmarks in results.multi_hand_landmarks:
                # print(hand_landmarks)
                # Check if the hand is left or right
                if check_hand:

                    if hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].x < hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].x:

                        for id, landmark in enumerate(hand_landmarks.landmark):

                            x = int(landmark.x*frame_width)
                            y = int(landmark.y*frame_height)

                            if id == 4:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(0, 255, 255))
                                thumb_Lx = x
                                thumb_Ly = y
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "l_thumb", "x": x, "y": y}))

                            # Thumb
                            if id == 5:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(0, 255, 255))
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "l_A0", "x": x, "y": y}))

                            if id == 6:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(0, 255, 255))
                                index_Lx = x
                                index_Ly = y
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "l_B0", "x": x, "y": y}))

                            if id == 9:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(0, 255, 255))
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "l_A1", "x": x, "y": y}))

                            if id == 10:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(0, 255, 255))
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "l_B1", "x": x, "y": y}))

                            if id == 13:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(0, 255, 255))
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "l_A2", "x": x, "y": y}))

                            if id == 14:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(0, 255, 255))
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "l_B2", "x": x, "y": y}))

                            if id == 17:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(0, 255, 255))
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "l_A3", "x": x, "y": y}))

                            if id == 18:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(0, 255, 255))
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "l_B3", "x": x, "y": y}))

                    else:

                        for id, landmark in enumerate(hand_landmarks.landmark):

                            x = int(landmark.x*frame_width)
                            y = int(landmark.y*frame_height)

                            if id == 4:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(255, 0, 255))
                                thumb_Rx = x
                                thumb_Ry = y
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "r_thumb", "x": x, "y": y}))

                            # Thumb
                            if id == 5:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(255, 0, 255))
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "r_A0", "x": x, "y": y}))

                            if id == 6:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(255, 0, 255))
                                index_Rx = x
                                index_Ry = y
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "r_B0", "x": x, "y": y}))

                            if id == 9:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(255, 0, 255))
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "r_A1", "x": x, "y": y}))

                            if id == 10:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(255, 0, 255))
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "r_B1", "x": x, "y": y}))

                            if id == 13:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(255, 0, 255))
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "r_A2", "x": x, "y": y}))

                            if id == 14:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(255, 0, 255))
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "r_B2", "x": x, "y": y}))

                            if id == 17:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(255, 0, 255))
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "r_A3", "x": x, "y": y}))

                            if id == 18:
                                # cv2.circle(img=image, center=(x, y),
                                #         radius=10, color=(255, 0, 255))
                                ws.send(json.dumps(
                                    {"type": "detection", "message": "send_data", "finger": "r_B3", "x": x, "y": y}))
                                
                        
                        if index_Ly - thumb_Ly<20 or index_Ly- thumb_Ly<20 :
                              
                                if move:
                                        pass
                                else:
                                        ws.send(json.dumps({"type": "detection", "message": "move"}))  
                                        move = True
                        else:
                                if move:
                                        ws.send(json.dumps({"type": "board", "data": "stop_car"}))  
                                        move = False
                               

        else:
                if(check_hand):    
                        ws.send(json.dumps({"type": "detection", "message": "no_hand"}))
                        thumb_L = 0
                        thumb_R = 0
                        check_hand = False
                        ws.send(json.dumps({"type": "board", "data": "stop_car"}))  
                        move = False
    

        cv2.imshow("Hand Tracking", image)
        if cv2.waitKey(10) & 0xFF == ord("q"):
            
            break

cap.release()
cv2.destroyAllWindows()
