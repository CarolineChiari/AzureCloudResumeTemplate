# Front-End Azure Functions App

## Table of Content
- [Front-End Azure Functions App](#front-end-azure-functions-app)
  - [Table of Content](#table-of-content)
  - [Introduction](#introduction)
  - [Setup](#setup)
  - [Get Jobs](#get-jobs)
  - [Get User](#get-user)
  - [Post Visitor](#post-visitor)

## Introduction

This Azure Function App is for the non-administrative part of the cloud resume. It will fetch all the information on your resume that needs to be displayed to the user.

## Setup

This Azure Functions app will have 4 functions:
- [getJobs](#get-jobs)
- getUser
- postVisitor
- processVisitors

In order to proceed any further, you will need to [set up an Azure Functions App](./Azure-Functions_General-Operations.md#creating-an-azure-functions-app) with an appropriate name in the proper region.

**Note**: We will create an Administrative Azure Functions App later.

## Get Jobs
This function fetches the list of jobs from the [Cosmos Database](../CosmosDB/CosmosDBSetup.md).

[Create a new HTTP function](./Azure-Functions_General-Operations.md#creating-a-new-http-function) and name it **getJob**.

[Create an input integration with your Cosmos DB](./Azure-Functions_General-Operations.md#cosmosdb-integration) using the following:
- **Document Parameter Name**: Jobs
- **Database**: data
- **Collection Name**: jobs

:mortar_board: **Challenge**: Write the code for the function to retrieve and return the jobs from the database.

:key: The code for the function to retrieve and return the jobs from the database is as follows:

``` PowerShell
using namespace System.Net

# Input bindings are passed in via param block.
param($Request, $TriggerMetadata, $Jobs) # <-- $Jobs is the Cosmos DB data from the integration

# Sort the jobs by start date
$Jobs = $Jobs | Sort-Object {[datetime]$_.StartDate} -Descending

# Return the jobs in the body of the HTTP response
Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
    StatusCode = [HttpStatusCode]::OK
    Body = ($Jobs  | ConvertTo-JSON -Depth 4)
})
```

## Get User

This function fetches your information from the [Cosmos Database](../CosmosDB/CosmosDBSetup.md).

[Create a new HTTP function](./Azure-Functions_General-Operations.md#creating-a-new-http-function) and name it **getUser**.

[Create an input integration with your Cosmos DB](./Azure-Functions_General-Operations.md#cosmosdb-integration) using the following:
- **Document Parameter Name**: Users  
- **Database**: data
- **Collection Name**: user

:mortar_board: **Challenge**: Write the code for the function to retrieve and return your information. Be sure to handle if there is duplicate data being recovered.

:key: The code for the function to retrieve and return your information from the database is as follows:

``` PowerShell
using namespace System.Net

# Input bindings are passed in via param block.
param($Request, $TriggerMetadata, $Users) # <-- $Users is the Cosmos DB data from the integration

# Make sure that data is being retrieved from the database
if ($Users) {
    $body = $Users[0] | ConvertTo-JSON
}else{
    $body = "Error, no user found"
}

# Return the user data in the body.
Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
    StatusCode = [HttpStatusCode]::OK
    Body = $body
})
```

## Post Visitor

In this function, we will get the total number of visitors from the 
Cosmos DB and return **total + 1** to the HTTP response. At the same time, we will add the user's IP address to the [storage queue](../AzureStorage/AzureStorage.md#visitors-processing-queue) created previously for later processing by the next Azure Function.

[Create a new HTTP function](./Azure-Functions_General-Operations.md#creating-a-new-http-function) and name it **postVisitor**.

[Create an input integration with your Cosmos DB](./Azure-Functions_General-Operations.md#cosmosdb-integration) using the following:
- **Document Parameter Name**: totalDocument  
- **Database**: data
- **Collection Name**: visitors
- **SQL Query**: `SELECT * FROM c Where c.country="total"`

[Create an output integration with your storage queue](./Azure-Functions_General-Operations.md#storage-queue-integration) using the following:
- **Message Parameter Name**: outputQueueItem
- **Queue Name**: visitorsqueue

:mortar_board: **Challenge**: Write the code for the function to retrieve the total number of visitors and return it, and output the incoming IP address to the storage queue. Be sure to handle if the total document does not exist.

:key: The code for the function to retrieve the total number of visitors and return it, and output the incoming IP address to the storage queue is as follows:

``` PowerShell
using namespace System.Net

# Input bindings are passed in via param block.
param($Request, $TriggerMetadata, $totalDocument) #<--- $totalDocument is retrieved from the database
$body = @{count = 1}  # Because current visitor is at least +1 (see below)
if ($totalDocument)
{
  $body.count += $totalDocument.visitors
}
# Collect the IP address from the request headers
$ip = $request.headers['x-forwarded-for'].split(':')[0]
if (-not $ip)
{
    $request.headers['client-ip'].split(':')[0]
}

# Output the IP address to the queue
Push-OutputBinding -name OutputQueueItem -value $ip

# Return the number of users through the HTTP response.
Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
    StatusCode = [HttpStatusCode]::OK
    Body = $body
})
```

