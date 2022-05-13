# mytraveLog

<br>



## Description

Travel log where users can create logs with photos from countries/cities visited, in order to organize and keep track of all the travels made. 



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage with log in and sign up. 
- **sign up** - As a user I want to sign up on the web page so that I can create my travel log.
- **login** - As a user I want to be able to log in on the web page so that I can use my account.
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **profile** - As a user I want to be able to edit my profile and my travels.
- **my travels result** - As a user I want to see the list of coutries/date filter by my preferences.
- **my travels details** - As a user I want to see more details of the travels I made, and also be able to create, edit and delete them from my profile.
- **favorite list** - As a user I want to see the list of my favorite travels and delete them.
- **wishlist** - As a user I would like to have a list of the countries I would like to visit next.

<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  username, email, password  }                                    |
| `GET`      | `/private/profile`                 | Private route. Renders `profile` form view.             |                                                          |
| `PUT`      | `/private/profile`                 | Private route. Sends profile info to server and updates user in DB. | { email, password, username, imageUrl } |

| `GET`      | `/private/travels`                 | Renders `travel-list` view (country/date)                            |                                     
| `GET`      | `/private/travels/search-travel`      | Renders `search-travel` view (by country - API /date)                            |                                                          

| `GET`      | `/private/travels/create`        | Private route. Renders `travel-create` form view.             |                                                          |
| `PUT`      | `/private/travels/create`             | Private route. Sends travel info to server and updates user travel in DB | (country, imageUrl, description, date) |
| `GET`      | `/private/travels/:id/edit`        | Private route. Renders `travel-edit` form view.             |                                                          |
| `PUT`      | `/private/travels/:id/edit`         | Private route. Sends travel info to server and updates travel in DB | (country, imageUrl, description, date) |
| `GET`      | `/private/travels/details/:id`     | Renders `travel-details` view for a particular travel. |                                                   
                                                
| `DELETE`      | `/private/travels/:id/delete`       | Private route. Deletes the existing item from the current user.
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/private/favorites/`              | Private route. Adds a new favorite for the current user.     | { name, travel, city, }     
| `DELETE`   | `/private/favorites/:travelId`     | Private route. Deletes the existing favorite from the current user. |   
| `GET`      | `/private/wishlist`                | Private route. Render the `wishlist` view.                   |                                                          |
| `POST`     | `/private/wishlist /`              | Private route. Adds a new wishlist item for the current user. | { name, country, city, }          
| `DELETE`   | `/private/wishlist/:countryId`     | Private route. Deletes the existing item from the current user. |                                                  






## Models

User model

```javascript

 username: {
      type: String,
      trim: true,
      required: [true, 'Please input username'],
      travels: TravelId,
      ImageUrl: {
  type: String,
  default: ""
}
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Please input a password'],
    },
  },

```

Travel model

```javascript
title: String,
country: {
type: String,
required: true
},
city: String,
date: {
type: Number,
required: true
},
 description: String,
 ImageUrl: {
  type: String,
  default: ""
}
}

```

Favorites model

```javascript
{
  travelId: String,
}

```

Wishlist model

```javascript
{
  countryId: String,
}

```



<br>

## API's

https://restcountries.com/

<br>


## Packages



<br>



## Backlog

[See the Trello board.](https://trello.com/b/SQTMZBkg/modelo)



<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/MarinaPalma/Project2)

[Deploy Link](https://marinaproject.herokuapp.com/)



<br>



### Slides

The url to your presentation slides

[Slides Link]()

### Contributors
Marina Palma - [`https://github.com/MarinaPalma`](https://github.com/MarinaPalma) - [`https://www.linkedin.com/in/marina-palma-6740a923a/`](https://www.linkedin.com/in/marina-palma-6740a923a/)

Alexandre Alves - [`https://github.com/aletrad`](https://github.com/aletrad) - [`https://www.linkedin.com/in/alexandre-alves-20258823a/`](https://www.linkedin.com/in/alexandre-alves-20258823a/)
