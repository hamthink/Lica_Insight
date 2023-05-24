# LiCa-Insight

카메라 영상에서부터 추적 대상의 공간상의 위치를 계산하고 수집한 동선 데이터를 웹사이트를 통해 시각화하여 제공합니다.

# Acknowledgement
- 활용된 MOT(Multiple Object Tracking) 모델은 [noahcao/OC_SORT](https://github.com/noahcao/OC_SORT) 레포지토리에서 제공하는 pretrained 모델입니다.
- 프로젝트 요구사항에 맞춰 OC_SORT의 demo_track.py 스크립트를 커스텀 하였습니다.
- ocsort_custom/tools 디렉토리에서 커스텀된 스크립트를 확인할 수 있습니다. 

# Demo
삼성청년SW아카데미 서울캠퍼스 휴게실을 지나드는 교육생들의 동선 데이터를 수집하고 시각화한 데모입니다.

## Location Dots
![location_dots](/uploads/740435ea81392c5610d874a9c3a10d17/location_dots.png)

## Heatmap
![heatmap](/uploads/643085175fe466b4916b24037a0152b8/heatmap.png)

## Tracking
### 1
![2023-05-18-10-05-00-_-10-05-30](/uploads/f684ee5c65e988facd3243aa86961d78/2023-05-18-10-05-00-_-10-05-30.gif)
![2023-05-18_10-05-00___10-05-30_-_Trace](/uploads/45ce5debdccd528b67c4037951a7bf2b/2023-05-18_10-05-00___10-05-30_-_Trace.png)

### 2
<img src="/uploads/5c237162f8093707a77b8db76682ad27/2023-05-18-10-09-30-_-10-10-30.gif">
<img src="/uploads/7a36bd15ec5bb52ab7eecc75d6a71708/2023-05-18_10-09-30___10-10-30_-_Trace.png">

### 3
![2023-05-18-10-14-30-_10-15-00](/uploads/e8769046f209842f1959baea17ce29ab/2023-05-18-10-14-30-_10-15-00.gif)
![2023-05-18_10-14-30___10-15-00_-_Trace](/uploads/3b591f38522497943a255288d715162a/2023-05-18_10-14-30___10-15-00_-_Trace.png)

# System Architecture

# Built With
## Frontend
---
<div>
    <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
    <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
    <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
    <img src="https://img.shields.io/badge/recoil-3578e5?style=for-the-badge">
</div>

## Backend
<div>
    <img src="https://img.shields.io/badge/spring_boot-2.7.11-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
    <img src="https://img.shields.io/badge/spring_security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
    <img src="https://img.shields.io/badge/jwt-0.9.1-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">
    <img src="https://img.shields.io/badge/spring_amqp-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
    <img src="https://img.shields.io/badge/spring_data_jpa-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
    <img src="https://img.shields.io/badge/sendinblue-6.0.0-0092FF?style=for-the-badge&logo=sendinblue&logoColor=white">
    <img src="https://img.shields.io/badge/swagger-3.0.0-85EA2D?style=for-the-badge&logo=swagger&logoColor=white">
    <img src="https://img.shields.io/badge/gradle-7.6.1-02303A?style=for-the-badge&logo=gradle&logoColor=white">
    <br>
    <img src="https://img.shields.io/badge/python-3.9.13-3776AB?style=for-the-badge&logo=python&logoColor=white">
    <img src="https://img.shields.io/badge/pika-1.3.1-3776AB?style=for-the-badge&logo=python&logoColor=white">
    <img src="https://img.shields.io/badge/opencv-4.7.0-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white">
</div>

## Embedded
<div>
    <img src="https://img.shields.io/badge/raspberrypi_4-CD2355?style=for-the-badge">
    <img src="https://img.shields.io/badge/python-3.9.13-3776AB?style=for-the-badge&logo=python&logoColor=white">
    <img src="https://img.shields.io/badge/pika-1.3.1-3776AB?style=for-the-badge&logo=python&logoColor=white">
    <img src="https://img.shields.io/badge/opencv-4.7.0-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white">
</div>

## Infra
<img src="https://img.shields.io/badge/aws_ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
<img src="https://img.shields.io/badge/ubuntu-20.04_LTS-E95420?style=for-the-badge&logo=ubuntu&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white">
<img src="https://img.shields.io/badge/rabbitmq-3--management-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white">
<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
