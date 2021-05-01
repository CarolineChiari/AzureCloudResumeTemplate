# Cloud Resume Template

## Table of Content
- [Cloud Resume Template](#cloud-resume-template)
  - [Table of Content](#table-of-content)
  - [Introduction](#introduction)
  - [Setup](#setup)
    - [Prerequisites](#prerequisites)
    - [Pick a location](#pick-a-location)
    - [Pick a name for your resources](#pick-a-name-for-your-resources)
    - [Create a new resource group for your site](#create-a-new-resource-group-for-your-site)
    - [Azure Storage Account](#azure-storage-account)
    - [Azure AD Application](#azure-ad-application)
    - [Cosmos DB](#cosmos-db)
    - [Azure Functions](#azure-functions)

## Introduction

This code was created for the [A Cloud Guru Azure Cloud Resume Challenge](https://acloudguru.com/blog/engineering/cloudguruchallenge-your-resume-in-azure). This single page app was designed to require a more extensive cloud knowledge than the basics. The topics covered here are:
- Azure Content Delivery Network
- Azure Blob Storage
- Azure Storage Queue
- Azure Functions
- Azure API Management
- Azure Application Insight
- Azure Maps
- Azure Cosmos DB

## Setup

### Prerequisites

1. Azure Subscription
2. Azure DevOps Account

### Pick a location

You should pick a location for all your resources so they are all in the same region and compatible with each other.

If you don't know which location to choose, here are two things to keep in mind:
1. Distance from your users
2. Costs (see [Azure pricing calculator](https://azure.microsoft.com/en-us/pricing/calculator/))

You should strive to optimize both.

### Pick a name for your resources

Even though it is not a requirement, it is best practice to name all the resources related to the same project in a similar way. It makes it easier to identify the resources related to each other.

### Create a new resource group for your site

Even though you don't need to, it's best practice to group resources together in a resource group. Even better would be a new subscription, but for a personal subscriptions it's not necessary.

### Azure Storage Account

To host this website, you will need an [Azure Storage account](docs/AzureStorage/AzureStorage.md)

### Azure AD Application

This website requires an [Azure AD application registration](docs/AzureAD/AzureAD.md) so you can enter data easily and securely from within the website.

### Cosmos DB

[Create a Cosmos DB](docs/CosmosDB/CosmosDBSetup.md) to store the data

### Azure Functions

[Create an Azure Function App](/docs/Azure%20Functions/Front-End_Functions.md) to handle the API requests.
