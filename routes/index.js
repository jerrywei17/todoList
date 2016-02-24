var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );

/* GET home page. */
router.get('/', function(req, res, next) {
	Todo.find( function ( err, todos, count ){
		res.render( 'index', {
		    title : 'Todo List',
		    todos : todos
		});
	});
});

/* POST to Add List */
router.post('/addlist', function(req, res) {
	new Todo({
    content    : req.body.content,
    updated_at : Date.now()
  }).save( function( err, todo, count ){
    res.redirect( '/' );
  }); 
});

/* GET to delete List */
router.get('/delete/:id', function(req, res, next) {
	Todo.findById( req.params.id, function ( err, todo ){
		todo.remove( function ( err, todo ){
			res.redirect( '/' );
		});
	});
});

/* GET to edit List */
router.get('/edit/:id', function(req, res, next) {
  Todo.find( function ( err, todos ){
    res.render( 'edit', {
        title   : 'Todo List',
        todos   : todos,
        current : req.params.id,
		compared: function(num){
			return req.params.id == num;
		}
    });
  });
});


/* GET to update List */
router.get('/update/:id', function(req, res, next) {
  Todo.findById( req.params.id, function ( err, todo ){
    todo.content    = req.body.content;
    todo.updated_at = Date.now();
    todo.save( function ( err, todo, count ){
      res.redirect( '/' );
    });
  });
});



module.exports = router;
