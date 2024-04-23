# AngularApp

This project was generated with Angular CLI version 16.1.0.
You can view this project online at: https://app-angular-21bc4.web.app/pagina1


## Table of Contents
### Introduction
### Structure
### Technologies used
### Usability


## Introduction

This initial Angular project consists of having a SPA where we can display on the first page a list of BMW brand car models, followed by various descriptions such as power supply, power, displacement, color and price.
On the second page we have a dedicated part with photos of various BMW models on sale in 2023.


## Structure

The project structure is governed by the classic angular structure.
It is made up of the various components that perform the various functions.

The components are in turn made up of 3 main files:

.../component.html
.../component.ts
.../component.css


The files dedicated to the Log-in and Log-out functionality are:

Auth.guard.ts
Auth.service.ts

Connecting to the firebase database is done via:
Firebase.service

Input form for user withdrawal and log-in:
User.model.ts


## Tecnology used


I used several technologies to create this AngularApp:

Visual Studio Code, as editor for writing the code.
Angular Material to compose the various components present.
Html was used in conjunction with angular material.
Typescript for the various added features.
Css to add a touch of personal class.
Auth.guard to implement the registration and sign-in components and finally Firebase.service to implement the database.


## Usability
To access the platform, registration is required by the user, once registered you will have to log in with your credentials.
The platform is connected to a Firebase database. Through the input form below we can take the data, view it, modify it and delete it.
The modification occurs by selecting the element via the checkbox that you want to modify and then inserting the data you want to modify in the desired input.
Deletion, however, always occurs by selecting the desired element(s) via the checkbox and sending the "Delete" command
