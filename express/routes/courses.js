const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Using an array instead of a database
const courses = [
    {id:1 , name:"course1"},
    {id:2 , name:"course2"},
    {id:3 , name:"course3"},
  ];
  
  // Handling GET requests
  
  router.get('/', (req, res) => {
    res.send(courses);
  });
  
  router.get('/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    
    if(!course){
      res.status(404).send("Course not found!");
      return;
    }
    res.send(course);
  });
  
  // Handling POST requests
  router.post('/', (req, res) => {
    // Validation
    const { error } = validateCourse(req.body);
    if(error){
      res.status(400).send(result.error.details[0].message);
      return;
    }
  
    // Updating the course
    const course = {
      id: courses.length + 1,
      name: req.body.name
    };
    courses.push(course);
  
    res.send(course);
  });
  
  // Handling POST requests
  router.put('/:id', (req, res) => {
    // Checking if the course exists
    let course = courses.find(c => c.id === parseInt(req.params.id));
    
    if(!course){
      res.status(404).send("Course not found!");
      return;
    }
  
    // Validation
    const { error } = validateCourse(req.body);
    if(error){
      res.status(400).send(result.error.details[0].message);
      return;
    }
  
    // Updating the resource
    course.name = req.body.name;
    res.send(course);
  });
  
  // Handling DELETE requests
  router.delete('/:id', (req, res) => {
    // Checking if the course exists
    const course =  courses.find(c => c.id === parseInt(req.params.id))
    
    if (!course){
      res.status(404).send('course not found!');
      return; 
    }
  
    // Deleting the course
    const index = courses.indexOf(course);
    // Go to the index and reove 1 object
    courses.splice(index, 1);
  
    res.send(course);
  });
  
  function validateCourse(course){
    const schema = {
      name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
  };
  
  module.exports = router;