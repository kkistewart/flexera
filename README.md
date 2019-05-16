# API
## Running API in a docker container

open terminal and cd into flexera/codetest/codetest folder and 
run:
```
docker build -t codetest .

docker run --rm -p 5000:80 --name codetest_test codetest
```
this will run the api and will be listening on :5000
(terminal will say :80)

leave terminal open for duration of test

# WEB
## Running Web 
open a new terminal tab and cd into flexera/web and run:
```
npm run start
```
this will start up the front end web and launch the application on
localhost:3000

---