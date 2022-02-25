var express = require('express');
var router = express.Router();

const todoController = require('../controllers/todoController');
const userController = require('../controllers/userController');

function addUserToViews(req, res, next){
    if(req.user){
        res.locals.user = req.user;
    }
    next();
}

function redirectGuests(req, res, next){
    if(!req.user){
        res.redirect('/login');
    } else {
        next();
    }
}

/* GET home page. */
router.get('/', addUserToViews, redirectGuests, todoController.listAll);


router.get('/item/add', addUserToViews, todoController.displayAddItem);
router.post('/item/add', addUserToViews, todoController.addNewItem);

router.get('/item/edit/:id', addUserToViews, todoController.viewEditItem);
router.post('/item/edit/:id', addUserToViews, todoController.saveEditItem);

router.get('/item/delete/:id', addUserToViews, todoController.deleteItem);
router.get('/item/complete/:id', addUserToViews, todoController.makeItemComplete);
router.get('/item/incomplete/:id', addUserToViews, todoController.markItemIncomplete);

router.get('/register', addUserToViews, userController.renderRegistration);
router.post('/register', addUserToViews, userController.register);

router.get('/login', addUserToViews, userController.renderLogin);
router.post('/login', addUserToViews, userController.authenticate);

router.get('/logout', addUserToViews, userController.logout);

module.exports = router;
