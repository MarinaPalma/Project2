# Project2
# Project Name

<br>



## Description

Travel log where users can add files with photos, cities and hotels to organize and keep track of all the travels made. 



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage with log in and sign up. 
- **sign up** - As a user I want to sign up on the web page so that I can create my travel log.
- **login** - As a user I want to be able to log in on the web page so that I can use my account.
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **favorite list** - As a user I want to see the list of my favorite travels and delete them.
- **wishlist** - As a user I would like to have a list of the countries I would like to visit next.
- **profile** - As a user I want to be able to edit my profile and my travels.
- **result** - As a user I want to see the list of coutries/date filter by my preferences.
- **my travels** - As a user I want to see more details of the travels I made, and also be able to create, edit and delete them from my profile.


<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  firstName, lastName, email, password  }                                    |
| `GET`      | `/private/profile`                 | Private route. Renders `profile` form view.             |                                                          |
| `PUT`      | `/private/profile`                 | Private route. Sends profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/private/travels/create`        | Private route. Renders `travel-create` form view.             |                                                          |
| `PUT`      | `/private/travels/create`             | Private route. Sends travel info to server and updates user travel in DB (country, photos, description) |
| `GET`      | `/private/travels/:id/edit`        | Private route. Renders `travel-edit` form view.             |                                                          |
| `PUT`      | `/private/travels/:id/edit`         | Private route. Sends travel info to server and updates travel in DB (country, photos, description) |
| `DELETE`      | `/private/travels/:id/delete`       | Private route. Deletes the existing item from the current user.
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/private/favorites/`              | Private route. Adds a new favorite for the current user.     | { name, travel, city, }     
| `DELETE`   | `/private/favorites/:travelId`     | Private route. Deletes the existing favorite from the current user. |   
| `GET`      | `/private/wishlist`                | Private route. Render the `wishlist` view.                   |                                                          |
| `POST`     | `/private/wishlist /`              | Private route. Adds a new wishlist item for the current user. | { name, country, city, }          |
| `DELETE`   | `/private/wishlist/:countryId`     | Private route. Deletes the existing item from the current user. |                                                          |
| `GET`      | `/private/travels`                 | Renders `travel-list` view (country/date)                            |                                                          |
| `GET`      | `/private/travels/details/:id`     | Renders `travel-details` view for the particular restaurant. |                                                          |
                                                      |







## Models

User model

```javascript
{
  username: String,
  email: String,
  password: String,
  travels: [TravelId],
}

```



Favorites model

```javascript
{
  placeId: String,
}

```



<br>

## API's


<br>


## Packages



<br>



## Backlog

[See the Trello board.](https://trello.com/b/Ni3giVKf/ironhackproject)



<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)

### Contributors
FirstName LastName - [`<github-username>`](https://github.com/person1-username) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person1-username)

FirstName LastName - [`<github-username>`](https://github.com/person2-username) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person2-username)
