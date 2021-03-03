let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


// connect to schema

let Contacts = require('../models/contacts');

// get route 
router.get('/',(req,res,next)=>{
    Contacts.find((err,ContactsList) => {
        if(err)
        {
            return console.error(err)
        }
        else
        {
           // console.log(ContactsList);
           res.render('contacts',{title: 'Contacts list',ContactsList :ContactsList});
        }
    });
});

/*get for update */
router.get('/update/:id', (req, res, next) => {
    let id = req.params.id;
    Contacts.findById(id, (err, contactsToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('update', { title: 'Update', ContactsList: contactsToEdit })
        }
    });
});

/*post for update */
router.post('/update/:id', (req, res, next) => {
    let id = req.params.id;
    let updatedcontacts = Contacts({
        "_id": id,
        "username": req.body.username,
        "password": req.body.password,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email

    });
    Contacts.updateOne({ _id: id }, updatedcontacts, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/contacts-list');
        }
    });
});

/*get for delete */
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    Contacts.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/contacts-list');
        }
    });
});


module.exports = router;