# Chartissimo

Chartissimo is a web application to visualize randomly generated weather data of different locations.

## Technologies

- Javascript
  - React
  - Chart.js
  - Node.js
  - Express
- CSS 
  - Bootstrap
  - Sass
- HTML5
- Docker
- MariaDB
- MongoDB

## Installation

### startup.sh

Executes the shell script "startup.sh". This script will start up the Docker containers and initialize the databases.

After a successfull initialization you can use the "docker-compose up" command to start up your container.

Only use the startup script for the **initial** installation otherwise it will cause intialization errors on the databases.


## Data

### User data

I already created a user for you so you can login straight away:

- username: chartissimo
- password: chartissimo

### Weather data

The generated weather are structured in a three day rotation like:
  - on the first day (1,4,7...) is a complete dataset
  - on the second day (2,5,8...) is a partial dataset
  - on the third day (3,6,9...) aren't any datasets 

## Examples

#### Create a chart

![create a chart](https://media.giphy.com/media/mWrpYSOp5d2LqbLxlE/giphy.gif)

#### Customize the data

![edit your chart](https://media.giphy.com/media/ndUp0xoIJuq707w97l/giphy.gif)

#### Customize the fontsize

![customize your chart](https://media.giphy.com/media/mAjSMk529L5OkknMLa/giphy.gif)

#### Save the chart and view it in the Gallery

![save and view your chart](https://media.giphy.com/media/tlkCxy9XFzd6zhOSNT/giphy.gif)

