## API

Next, it's presented a web API builded on .NET CORE 2.2

The project is divided in three layers: API layer is the RESTful API, DTO layer is for the entities, BLL layer is for business logic, DAL layer is for the data access and UT layer is for unit tests. 
The endpoints are: 

## Create game
 http://localhost:51506/api/game (POST)
## Get game
http://localhost:51506/api/game/:gameId (GET)
## Get game’ rounds
http://localhost:51506/api/game/:gameId/rounds (GET)
## Get round
http://localhost:51506/api/round/:roundId (GET)
## Create round 
http://localhost:51506/api/round (POST)

I left a [Postman](https://www.getpostman.com/) file to use these endpoints.  

Note: Don’t forget to configure connectionstring in appsettings.json file on API layer to set a endpoint for the SQL Server database 
