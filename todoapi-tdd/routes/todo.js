var express = require('express');
var router = express.Router();

const todos = [{id:1, name: 'Learn TDD', done: false}];

/* GET todos listing. */
router.get('/', function(req, res, next) {
  res.json(todos);
});


/* GET todo by ID*/
router.get('/:id', function(req, res, next) {
  const resultTodo = todos.find(todo => (todo.id === Number(req.params.id)));
  
  if(!resultTodo)
  {
    res.status(404).end();
  }
  res.json(resultTodo);

});

/* POST todos. */
router.post('/', function(req, res, next) {
  const {body}  = req;

  if(typeof body.name !== 'string')
  {
    return res.status(400).end();
  }
  const newtodo = {
    id: todos.length +1,
    name: body.name,
    done: body.done
  };
  todos.push(newtodo);
  res.status(201).json(newtodo);
});


module.exports = router;
