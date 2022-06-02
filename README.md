# About the project

## Project dependencies
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The api consumed by the project are available with the link (https://petstore.swagger.io/).
The user interface is build with [Mui/Boostrap]
The api call is build with [fetch]

## Project folder architecture

### `components`

Container of all available components in our application.Composed into 2 folders.

#### `pets`
Contain the listing component for pets

#### `sharedComponents`

The shared components that can be used by multiple components

### `api`
Contain services and api call 

## Logic explanation

The UI is composed by header component and ListPets components.
The ListPets component is the parent component for TableComponent and PetsModal component.
It provide the necessary state and callback functions for children.
When a children component is composed by other UI that can be shared it will act also as 
parent component for his childrens

## Problems occured
-The result of listing api for pets contain objects with same id ,it cause problem
of items duplication during rerendering the list.(In react each item of list must have unique id)
-The api of delete return 404 when deleting object that have duplicated id
-The api of store photo of pet is not working

## Run the project

### `npm install`
### `npm start`

