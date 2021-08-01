const router = require("express").Router();
const { Users } = require("../../models");

router.post("/", (req, res) => {
    Users.create({
            username: req.body.username,
            password: req.body.password
        })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.userId = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                res.json(dbUserData);
                console.log("USER WAS CREATED")
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/login", (req, res) => {
    Users.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user account found!' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            console.log("++++++++++++++++++++++++++++++")
            console.log(req.session.loggedIn)
            console.log("++++++++++++++++++++++++++++++")

            res.json({ user: dbUserData, message: 'You are now logged in!' });
            console.log("++++++++++++++++++++++++++++++")
            console.log("ESTO DEBERIA SER EL LOGIN")
            console.log(req.session.loggedIn)
            console.log("++++++++++++++++++++++++++++++")
        });
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.delete("/user/:id", (req, res) => {
    Users.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;