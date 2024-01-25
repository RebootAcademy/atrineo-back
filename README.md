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

| Method | Description           | Endpoint     | Returns                                                    | Role   |
|--------|-----------------------|--------------|------------------------------------------------------------|--------|
| POST   | Create Organization   | /            | { success: boolean, message: String, result: Object }      | wizard |
| GET    | Get All Organizations | /            | { success: boolean, message: String, result: Object }      | wizard |
| GET    | Get One Organization  | /:id         | { success: boolean, message: String, result: Object }      | wizard |
| PATCH  | Update Organization   | /:id         | { success: boolean, message: String, result: Object }      | wizard |
| DELETE | Delete Organization   | /:id         | { success: boolean, message: String, result: Object }      | wizard |


### /users

| Method | Description                    | Endpoint     |  Returns                                               | Role   |
|--------|--------------------------------|--------------|--------------------------------------------------------|--------|
| POST   | Create Own Organization User   | /admin       | { success: boolean, message: String, result: Object }  | admin  |
| GET    | Get All Own Organization Users | /admin       | { success: boolean, message: String, result: Object }  | admin  |
| GET    | Get One Own Organization User  | /admin/:id   | { success: boolean, message: String, result: Object }  | admin  |
| PATCH  | Update Own Organization User   | /admin/:id   | { success: boolean, message: String, result: Object }  | admin  |
| DELETE | Delete Own Organization User   | /admin/:id   | { success: boolean, message: String, result: Object }  | admin  |
| POST   | Create User                    | /:organizationId | { success: boolean, message: String, result: Object } | wizard |
| GET    | Get All Users                  | /            | { success: boolean, message: String, result: Object }  | wizard |
| GET    | Get One User   | /:id             | { success: boolean, message: String, result: Object }         | wizard |
| PATCH  | Update User   | /:id             | { success: boolean, message: String, result: Object }  | wizard |
| DELETE | Delete User   | /:id             | { success: boolean, message: String, result: Object }  | wizard |


### /auth

| Method | Description | Endpoint  | Returns                            | Role  |
|--------|-------------|-----------|------------------------------------|-------|
| POST   | Login       | /login    | { message: String, result: token } | guest |


### /country

| Method | Description       | Endpoint | Returns                                                | Role   |
|--------|-------------------|----------|--------------------------------------------------------|--------|
| POST   | Create Country    | /        | { success: boolean, message: String, result: Object }  | wizard |
| GET    | Get All Countries | /        | { success: boolean, message: String, result: Object }  | guest  |
| GET    | Get One Country   | /:id     | { success: boolean, message: String, result: Object }  | guest  |
| PATCH  | Update Country    | /:id     | { success: boolean, message: String, result: Object }  | wizard |
| DELETE | Delete Country    | /:id     | { success: boolean, message: String, result: Object }  | wizard |


### /division1

| Method | Description       | Endpoint | Returns                                                  | Role   |
|--------|-------------------|----------|----------------------------------------------------------|--------|
| POST   | Create Division1  | /        | { success: boolean, message: String, result: Object }    | wizard |
| GET    | Get All Division1 | /        | { success: boolean, message: String, result: Object }    | guest  |
| GET    | Get One Division1 | /:id     | { success: boolean, message: String, result: Object }    | guest  |
| PATCH  | Update Division1  | /:id     | { success: boolean, message: String, result: Object }    | wizard |
| DELETE | Delete Division1 | /:id     | { success: boolean, message: String, result: Object }    | wizard |


### /division2

| Method | Description       | Endpoint | Returns                                               | Role   |
|--------|-------------------|----------|-------------------------------------------------------|--------|
| POST   | Create Division2  | /        | { success: boolean, message: String, result: Object } | wizard |
| GET    | Get All Division2 | /        | { success: boolean, message: String, result: Object } | guest  |
| GET    | Get One Division2 | /:id     | { success: boolean, message: String, result: Object } | guest  |
| PATCH  | Update Division2  | /:id     | { success: boolean, message: String, result: Object } | wizard |
| DELETE | Delete Division2  | /:id     | { success: boolean, message: String, result: Object } | wizard |


### /division3

| Method | Endpoint | Returns                                                  | Role   |
|--------|----------|----------------------------------------------------------|--------|
| POST   | Create Division3 | /        | { success: boolean, message: String, result: Object }                    | wizard |
| GET    | Get All Division3 | /        | { success: boolean, message: String, result: Object }      | guest  |
| GET    | Get One Division3 | /:id     | { success: boolean, message: String, result: Object }         | guest  |
| PATCH  | Update Division3 | /:id     | { success: boolean, message: String, result: Object }  | wizard |
| DELETE | Delete Division3 | /:id     | { success: boolean, message: String, result: Object }  | wizard |


### /division4

| Method | Description       | Endpoint | Returns                                                | Role   |
|--------|-------------------|----------|--------------------------------------------------------|--------|
| POST   | Create Division4  | /        | { success: boolean, message: String, result: Object }  | wizard |
| GET    | Get All Division4 | /        | { success: boolean, message: String, result: Object }  | guest  |
| GET    | Get One Division4 | /:id     | { success: boolean, message: String, result: Object }  | guest  |
| PATCH  | Update Division4  | /:id     | { success: boolean, message: String, result: Object }  | wizard |
| DELETE | Delete Division4  | /:id     | { success: boolean, message: String, result: Object }  | wizard |


### /location

| Method | Description       | Endpoint | Returns                                                 | Role   |
|--------|-------------------|----------|---------------------------------------------------------|--------|
| POST   | Create Location   | /        |                                                         | wizard |
| GET    | Get All Locations | /        | { success: boolean, message: String, result: Object }   | wizard |
| GET    | Get One Location  | /:id     | { success: boolean, message: String, result: Object }   | wizard |
| PATCH  | Update Location   | /:id     | { success: boolean, message: String, result: Object }   | wizard |
| DELETE | Delete Location   | /:id     | { success: boolean, message: String, result: Object }   | wizard |


### /collection

| Method | Description         | Endpoint      | Returns                                               | Role   |
|--------|---------------------|---------------|-------------------------------------------------------|--------|
| POST   | Create Collection   | /:ownerId     | { success: boolean, message: String, result: Object } | wizard |
| GET    | Get All Collections | /             | { success: boolean, message: String, result: Object } | guest  |
| GET    | Get One Location    | /:id          | { success: boolean, message: String, result: Object } | guest  |
| PATCH  | Update Location     | /:id          | { success: boolean, message: String, result: Object } | wizard |
| DELETE | Delete Location     | /:id          | { success: boolean, message: String, result: Object } | wizard |


### /data

| Method | Description  | Endpoint        | Returns                                               | Role   |
|--------| -------------|-----------------|-------------------------------------------------------|--------|
| POST   | Create Data  | /:collectionId  | { success: boolean, message: String, result: Object } | wizard |
| GET    | Get All Data | /               | { success: boolean, message: String, result: Object } | wizard |
| GET    | Get One Data | /:id            | { success: boolean, message: String, result: Object } | wizard |
| PATCH  | Update Data  | /:id            | { success: boolean, message: String, result: Object } | wizard |
| DELETE | Delete Data  | /:id            | { success: boolean, message: String, result: Object } | wizard |


## Team
Made with ❤️ from Reboot Tech Team