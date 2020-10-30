# Pokedex-challenge


Pokedex challenge is a challenge proposed by UpperSoft, this consist in an REST API that provide somes data about Pokemon. 

Live demo - https://pokechallengex.herokuapp.com/

### Dependencies

  - [node.js] -  an open-source, cross-platform, JavaScript runtime environment. 
  - [Express] - fast node.js network app framework
  - [yarn] or [npm] - javascript package manager
  
### Installation


Firstly, you need to clone this repository.
```sh
$ git clone https://github.com/yantxs/pokedex-desafio.git
```
Install the dependencies and start the server.

```sh
$ cd pokedex-desafio
$ npm install
$ node index.js
```
Done! You server should be running on the port 3000! You can acess on http://localhost:3000


### Routes

Below, the ENDPOINTs of API

| METHOD | ENDPOINT |RETURN |
| ------ | ------ | ------ |
| GET | /api/v1/pokemon | Return all pokemons existing | 
| GET | /api/v1/pokemon/{nome-pokemon} | Return atributtes from informed pokemon | 
|  POST | /api/v1/advantage/{nome-pokemon} | Returns a list of pokemon that has disavantages against the informed pokemon |
| POST | /api/v1/weakness/{nome-pokemon} | Return a list of pokemon that has advantages against the informed pokemon |

### Usage
Once running the app you can acess the endpoints on your browser or using [Postman], [Imnsonia] etc
You can also acess it clicking [HERE]!

### Todos

 - Refactor all the code
 
### License
The MIT License (MIT)

Copyright (c) 2020 [Yan Teixeira]


   [Node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [npm]: <https://www.npmjs.com/>
   [yarn]: <https://yarnpkg.com/>
   [Imnsonia]: <https://insomnia.rest/>
   [Postman]: <https://www.postman.com/>
   [HERE]: <https://pokechallengex.herokuapp.com/>
   [Yan Teixeira]: <https://www.linkedin.com/in/yan-teixeira/>
