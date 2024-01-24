# Atrineo App Backend.

The project aims to provide companies dedicated to innovation management with a tool that facilitates easy and quick access to relevant information about other companies in their region. The lack of access to this information hinders the ability to evaluate investment opportunities, identify potential collaborators, and comprehend the research and development activities in the region.

## Table of Contents
- [Deploy](#deploy)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Collections](#collections)
- [API Endpoints](#api-endpoints)
- [Team](#team)

## Deploy
- **API URL** - https://

## Technologies Used
- Node.js
- Express
- MongoDB (DB deployed on Atlas)
- Mongoose

## Installation
1. Clone the repository
1. Install the required packages: **`npm i`**
3. Create a **`.env`** file based on the provided **`.env.example`** file. Specify the values for the environment variables required by the application to work.

## Collections

### Organizations

Organization information.

| Field | Type     | Validations      |
|-------|----------|------------------|
| _id   | ObjectID | -                |
| name  | String   | Required         |
| email | String   | Required, Unique |


### Users

User information. The "role" field indicates the user's role within their associated organization.

| Field         | Type                                       | Validations       |
|---------------|--------------------------------------------|-------------------|
| _id           | ObjectID                                   | -                 |
| organization  | ObjectId (organization)                    | -                 |
| name          | String                                     | Required          |
| email         | String                                     | Required, Unique  |
| password      | String                                     | Required          |
| role          | String (Enum: 'worker', 'admin', 'wizard') | Default: 'worker' |

### Countries

Country information. Each document provides details about a specific country.

| Field      | Type     | Validations                          |
|------------|----------|--------------------------------------|
| _id        | ObjectID | -                                    |
| iso        | String   | Required                             |
| name       | String   | Required                             |
| geojsonId  | Number   | -                                    |
| geometry   | Array    | Example: [[[longitude, latitude]]]   |

### Division1

Information about the first-level administrative divisions, including division type, name, and geographical data.

| Field      | Type                   | Validations                          |
|------------|------------------------|--------------------------------------|
| _id        | ObjectID               | -                                    |
| type       | String                 | Required                             |
| name       | String                 | Required                             |
| geojsonId  | Number                 | -                                    |
| geometry   | Array                  | Example: [[[longitude, latitude]]]   |
| country    | ObjectId (country)     | -                                    |

### Division2

Information about the second-level administrative divisions, including division type, name, and geographical data.

| Field            | Type                   | Validations                          |
|------------------|------------------------|--------------------------------------|
| _id              | ObjectID               | -                                    |
| type             | String                 | Required                             |
| name             | String                 | Required                             |
| geojsonId        | Number                 | -                                    |
| geometry         | Array                  | Example: [[[longitude, latitude]]]   |
| upperDivision    | ObjectId (division1)   | -                                    |

### Division3

Information about the third-level administrative divisions, including division type, name, and geographical data.

| Field            | Type                   | Validations                          |
|------------------|------------------------|--------------------------------------|
| _id              | ObjectID               | -                                    |
| type             | String                 | Required                             |
| name             | String                 | Required                             |
| geojsonId        | Number                 | -                                    |
| geometry         | Array                  | Example: [[[longitude, latitude]]]   |
| upperDivision    | ObjectId (division2)   | -                                    |

### Division4

Information about the fourth-level administrative divisions, including division type, name, and geographical data.

| Field            | Type                                                  | Validations                          |
|------------------|-------------------------------------------------------|--------------------------------------|
| _id              | ObjectID                                              | -                                    |
| type             | String                                                | Default: 'city'                      |
| name             | String                                                | Required                             |
| postalCode       | Array                                                 | Example: [ Number ], Required        |
| referencedId     | ObjectId (referencedModel)                            | -                                    |
| referencedModel  | String (Enum: 'division1', 'division2', 'division3')  | -                                    |

### Locations

Geographical locations with administrative divisions and countries.

| Field        | Type                   | Validations  |
|--------------|------------------------|--------------|
| _id          | ObjectID               | -            |
| country      | ObjectId (country)     | -            |
| division1    | ObjectId (division1)   | -            |
| division2    | ObjectId (division2)   | -            |
| division3    | ObjectId (division3)   | -            |
| division4    | ObjectId (division4)   | -            |


### Collections

Data into collections, each associated with an owner organization and a creator organization.

| Field      | Type                     | Validations    |
|------------|--------------------------|----------------|
| _id        | ObjectID                 | Default: false |
| public     | Boolean                  | -              |
| ownerId    | ObjectId (organization)  | -              |
| creatorId  | ObjectId (organization)  | -              |
| data       | Array ObjectID (data)    | -              |


### Datas

Information related to companies/organizations, including information on location, population, patents, research investment, IT companies, GNP, scholarship years, innovation ecosystem, financing access, life quality, government funds received, and more.


| Field                | Type                                   | Validations       |
|----------------------|----------------------------------------|-------------------|
| _id                  | ObjectID                               | -                 |
| name                 | String                                 | Required, Unique  |
| latitude             | Number                                 | -                 |
| longitude            | Number                                 | -                 |
| districtId           | Number                                 | -                 |
| districtName         | String                                 | -                 |
| geometry             | Array                                  | -                 |
| districtPopulation   | Number                                 | -                 |
| patents              | Number                                 | -                 |
| researchInvestment   | Number                                 | -                 |
| itCompanies          | Number                                 | -                 |
| gnp                  | Number                                 | -                 |
| scholarshipYears     | Number                                 | -                 |
| innovationEcosystem  | Boolean                                | -                 |
| financingAccess      | Boolean                                | -                 |
| lifeQuality          | String (Enum: 'high', 'medium', 'low') | -                 |
| govFundsReceived     | Boolean                                | -                 |
| locationId           | ObjectId (location)                    | -                 |


## API Endpoints

### /organizations

| Method | Endpoint     | Returns                                                    | Role   |
|--------|--------------|------------------------------------------------------------|--------|
| POST   | /            | { success: boolean, message: String, newOrganization }     | wizard |
| GET    | /            | { success: boolean, message: String, organizations }       | wizard |
| GET    | /:id         | { success: boolean, message: String, organization }        | wizard |
| PATCH  | /:id         | { success: boolean, message: String, updatedOrganization } | wizard |
| DELETE | /:id         | { success: boolean, message: String, deletedOrganization } | wizard |


### /users

| Method | Endpoint         |  Returns                                            | Role   |
|--------|------------------|-----------------------------------------------------|--------|
| POST   | /admin           | { success: boolean, message: String, newUser }      | admin  |
| GET    | /admin           | { success: boolean, message: String, users }        | admin  |
| GET    | /admin/:id       | { success: boolean, message: String, user }         | admin  |
| PATCH  | /admin/:id       | { success: boolean, message: String, updatedUser }  | admin  |
| DELETE | /admin/:id       | { success: boolean, message: String, deletedUser }  | admin  |
| POST   | /:organizationId | { success: boolean, message: String, newUser }      | wizard |
| GET    | /                | { success: boolean, message: String, users }        | wizard |
| GET    | /:id             | { success: boolean, message: String, user }         | wizard |
| PATCH  | /:id             | { success: boolean, message: String, updatedUser }  | wizard |
| DELETE | /:id             | { success: boolean, message: String, deletedUser }  | wizard |


### /auth

| Method | Endpoint  | Returns                    | Role  |
|--------|-----------|----------------------------|-------|
| POST   | /login    | { message: String, token } | guest |


### /country

| Method | Endpoint | Returns                                                | Role   |
|--------|----------|--------------------------------------------------------|--------|
| POST   | /        | { success: boolean, message: String }                  | wizard |
| GET    | /        | { success: boolean, message: String, countries }       | guest  |
| GET    | /:id     | { success: boolean, message: String, country }         | guest  |
| PATCH  | /:id     | { success: boolean, message: String, updatedCountry }  | wizard |
| DELETE | /:id     | { success: boolean, message: String, deletedCountry }  | wizard |


### /division1

| Method | Endpoint | Returns                                                  | Role   |
|--------|----------|----------------------------------------------------------|--------|
| POST   | /        | { success: boolean, message: String }                    | wizard |
| GET    | /        | { success: boolean, message: String, allDivision1 }      | guest  |
| GET    | /:id     | { success: boolean, message: String, division1 }         | guest  |
| PATCH  | /:id     | { success: boolean, message: String, updatedDivision1 }  | wizard |
| DELETE | /:id     | { success: boolean, message: String, deletedDivision1 }  | wizard |


### /division2


| Method | Endpoint | Returns                                                  | Role   |
|--------|----------|----------------------------------------------------------|--------|
| POST   | /        | { success: boolean, message: String }                    | wizard |
| GET    | /        | { success: boolean, message: String, allDivision2 }      | guest  |
| GET    | /:id     | { success: boolean, message: String, division2 }         | guest  |
| PATCH  | /:id     | { success: boolean, message: String, updatedDivision2 }  | wizard |
| DELETE | /:id     | { success: boolean, message: String, deletedDivision2 }  | wizard |


### /division3

| Method | Endpoint | Returns                                                  | Role   |
|--------|----------|----------------------------------------------------------|--------|
| POST   | /        | { success: boolean, message: String }                    | wizard |
| GET    | /        | { success: boolean, message: String, allDivision3 }      | guest  |
| GET    | /:id     | { success: boolean, message: String, division3 }         | guest  |
| PATCH  | /:id     | { success: boolean, message: String, updatedDivision3 }  | wizard |
| DELETE | /:id     | { success: boolean, message: String, deletedDivision3 }  | wizard |


### /division4

| Method | Endpoint | Returns                                                  | Role   |
|--------|----------|----------------------------------------------------------|--------|
| POST   | /        | { success: boolean, message: String }                    | wizard |
| GET    | /        | { success: boolean, message: String, allDivision4 }      | guest  |
| GET    | /:id     | { success: boolean, message: String, division4 }         | guest  |
| PATCH  | /:id     | { success: boolean, message: String, updatedDivision4 }  | wizard |
| DELETE | /:id     | { success: boolean, message: String, deletedDivision4 }  | wizard |


### /location

| Method | Endpoint | Returns                                                 | Role   |
|--------|----------|---------------------------------------------------------|--------|
| POST   | /        |                                                         | wizard |
| GET    | /        | { success: boolean, message: String, locations }        | wizard |
| GET    | /:id     | { success: boolean, message: String, location }         | wizard |
| PATCH  | /:id     | { success: boolean, message: String, updatedLocation }  | wizard |
| DELETE | /:id     | { success: boolean, message: String, deletedLocation }  | wizard |


### /collection

| Method | Endpoint      | Returns                                                    | Role   |
|--------|---------------|------------------------------------------------------------|--------|
| POST   | /:ownerId     | { success: boolean, message: String, newCollection }       | wizard |
| GET    | /             | { success: boolean, message: String, collections }         | guest  |
| GET    | /:id          | { success: boolean, message: String, collection }          | guest  |
| PATCH  | /:id          | { success: boolean, message: String, updatedCollections }  | wizard |
| DELETE | /:id          | { success: boolean, message: String, deletedCollections }  | wizard |


### /data

| Method | Endpoint           | Returns                                             | Role   |
|--------|--------------------|-----------------------------------------------------|--------|
| POST   | /:collectionId     | { success: boolean, message: String, newDatas }     | wizard |
| GET    | /                  | { success: boolean, message: String, datas }        | wizard |
| GET    | /:id               | { success: boolean, message: String, data }         | wizard |
| PATCH  | /:id               | { success: boolean, message: String, updatedData }  | wizard |
| DELETE | /:id               | { success: boolean, message: String, deletedData }  | wizard |


## Team
Made with ❤️ from Reboot Tech Team