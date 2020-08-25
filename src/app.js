const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//should be able to list the repositories
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

//should be able to create a new repository
app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;

  const repository = {
  id: uuidv4(),
  url,
  title,
  techs,
  likes: 0
  };

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = repositories.find(repository => repository.id == id);

  if(!repository){
    return response.status(400).send();
  }

  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const repository = repositories.find(repository => repository.id == id);

  if(!repository){
    return response.status(400).send();
  }

  repositories.splice(repository);

  return response.status(204).send();

});

//should be able to give a like to the repository
app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params;

  const repository = repositories.find(repository => repository.id == id);

  if(!repository){
    return response.status(400).send();
  }

  repository.likes += 1;

  return response.json(repository);

});

module.exports = app;
