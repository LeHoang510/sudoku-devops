# SUDOKU GAME

## Project is developed by 
- LE Vu Thuy Tu
- Vu Thanh Tung
- NGUYEN Le Hoang 


## Project overview

### Home page 
![](/images/homepage.png)
**Features :**
+ choose levels
+ play with suggestion or not
+ register player name

### Game board
![](/images/board.png)


**Features :**
+ Undo/Redo history 
+ Follow the leader board
+ Check validity of move
+ Track score 
+ save score after the game finish

## How to start the project
### Start the backend 
```
cd game/game-backend
mvn spring-boot:run
```

### Start the frontend
```
cd game/game-frontend
ng serve --open
```
### Docker run for project
```
# terminal 1
cd game/game-backend
docker build -t sudoku-backend .
docker run -d -p 4445:4445 sudoku-backend

# terminal 2
cd game/game-frontend
docker build -t sudoku-frontend .
docker run -d -p 8081:8081 --network host sudoku-frontend
```
## How to deploy the project
You can use Microk8s for deploiement project in your local machine. 
### Instalation Microk8s 
```
sudo snap install microk8s --classic --channel=1.29
```
Microk8s may require admin privilege. To add your current user to the group and gain access to the .kube caching directory, run the following two commands: 
```
sudo usermod -a -G microk8s $USER
sudo chown -f -R $USER ~/.kube
```
You will also need to re-enter the session for the group update to take place:

```
su - $USER
```
To verify your Microk8s works : 
```
microk8s start
microk8s kubectl get all
```
Enable dns module : 
```
microk8s enable dns
```
### Set up environement

- Generate a new token in your gitlab account : https://gitlab.insa-rennes.fr/-/user_settings/personal_access_tokens

- Authenticate to the gitlab insa with your generated token: 
    ```
    docker login gitlab.insa-rennes.fr:5050
    ```  

- In the root of project, add namespace `game` in your cluster : 
    ```
    microk8s kubectl apply -f k8s-namespace.yml
    ```
- Create a secret to have access to gitlab insa : 
    ```
    microk8s kubectl create secret generic secret-insa --from-file=.dockerconfigjson=${HOME}/.docker/config.json --type=kubernetes.io/dockerconfigjson -n game
    ```

### Deploy an app with Microk8s


- Apply this manifest file :

    ```
    microk8s kubectl apply -f k8s-deployment.yml
    ```
- To access the application, you must use `port-forward` to access services running on a Kubernetes cluster from your local machine : 
    ```
    microk8s kubectl port-forward service/backend-service -n game 4445:4445
    microk8s kubectl port-forward service/frontend-service -n game 8080:8080
    ```

 - To run the front-end application, to go this link : `http://localhost:8080`

- To verify the back-end works, to go this link : `http://localhost:4445/game/easy`. A reponse in json will display.

- Debug if there are errors :
    - To see errors : 
        ```
        miccrok8s kubectl logs service/frontend-service -n game 
        miccrok8s kubectl logs service/backend-service -n game 
        ``` 

    - When you apply `k8s-deployment.yml` file, two pods of backend and frontend must be created. To verify this two pods is running : 
        ```
        microk8s kubectl get pods -n game
        ```





# Layout

`sudoku/sudoku-backend` is backend of the application. It contains th Java code of the server.
It is in charge with providing a REST API.

`sudoku/sudoku-frontend` is the Angular front-end of the application.

`sudoku-doc` is the folder that will contain your reports (and its pictures) and the user documentation.

