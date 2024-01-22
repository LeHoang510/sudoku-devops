# Using official ubuntu image as a parent image
FROM maven:3.8-openjdk-11

COPY /game /game
COPY /map /map
COPY target/game-backend-0.0.1.jar /

EXPOSE 4445
CMD ["java", "-jar", "/game-backend-0.0.1.jar"]
