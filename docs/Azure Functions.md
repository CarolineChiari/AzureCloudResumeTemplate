# Front-End Azure Functions App

## Table of Content
- [Front-End Azure Functions App](#front-end-azure-functions-app)
  - [Table of Content](#table-of-content)
  - [Introduction](#introduction)
  - [Creating the Resource](#creating-the-resource)
  - [Creating the functions](#creating-the-functions)
    - [Get Jobs](#get-jobs)

## Introduction

This Azure Function App is for the non-administrative part of the cloud resume.

## Creating the Resource
1. Go to your site's resource group
2. Click **Add**/**Marketplace**
3. Select or search for **Function App**
4. Make sure that the resource group is the correct one
5. Give your functions app a proper name from [your naming convention](#pick-a-name-for-your-resources)
6. **Publish**: Code
7. **Runtime Stack**: PowerShell Core
8. **Version**: Pick the latest available
9. **Region**: [Your resources' region](#pick-a-location)
10. Click on **Next:Hosting >**
11. For **Storage Account** Click *Create New*
12. Give your storage account a proper name following [your naming convention](#pick-a-name-for-your-resources)
13. Make sure the **Plan Type** is *Consumption (Serverless)*
14. Click **Next: Monitoring >**
15. Select *Yes* for **Enable Application Insight**
16. For **Application Insight** click *Create New*
17. Give your Application Insight account a proper name following [your naming convention](#pick-a-name-for-your-resources)
18. Make sure the location is the same as [your resources region](#pick-a-location)
19. Click **OK**
20. Click on **Review + Create**
21. Click on **Create**

Now your Azure Function App is created. 

## Creating the functions

### Get Jobs

This function retrieves the information about the jobs from the database.



