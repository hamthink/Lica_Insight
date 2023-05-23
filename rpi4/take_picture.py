import picamera

camera = picamera.PiCamera()
camera.resolution = (960, 540)

index = 0
while True:
	command = int(input())
	if command == 1:
		camera.start_preview()
		camera.capture('./images/' + str(index) + '.jpg')
		index = index + 1
	else:
		break

