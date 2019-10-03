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

## Deployment using [Azure](https://azure.microsoft.com/en-us/) cloud platform 

1. You must create an SQL server database in Azure SQL database 
2. Once, you have created the database, you will looking for the connection strings and you will paste it in GameDataContext field on appsettings.Production.json file. Don’t forget to set user and password in the connection strings;
3. On Azure portal, you will add a new app service which the runtime stack will be .NET core 2.2 
4. After, you will upload a publish using Azure App services.  So, you will make a right click on the solution in Visual Studio and then click on publish. After, click on App Service and choice Select Existing. Choice the app service created previously and click on Ok.
5. Finally, you can test this api using the postman file but you need to do some change on the URL
