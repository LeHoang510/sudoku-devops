# Using official ubuntu image as a parent image
FROM maven:3.8-openjdk-11

# Setting the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# EXPOSE port
EXPOSE 4445

# Run spring boot application
CMD ["mvn", "spring-boot:run"]