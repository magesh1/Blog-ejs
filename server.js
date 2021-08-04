const express = require('express')
const app = express();
const database = require('./database/database')
const blogModel = require('./models/blogmodel');


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))


app.get('/compose', (req, res) => {
    res.render('compose.ejs')
})


app.get('/', async (req, res) => {
    blogModel.find({}, (err, items) => {
        res.render('index.ejs', { content: items })
    }).sort({
        createdAt: 'desc'
    })
})

app.post('/blog', async (req, res) => {
    let contents = new blogModel({
        email: req.body.email,
        title: req.body.title,
        description: req.body.description,
    });

    try {
        await contents.save();
        res.redirect('/');
    } catch (err) {
        res.redirect('/');
    }

})

app.route('/delete/:id').get((req, res) => {
    const id = req.params.id;
    blogModel.findByIdAndRemove(id, (err) => {
        if (err) {
            return res.send(500, err);
        }
        res.redirect('/');
    })
})



app.route('/edit/:id').get((req, res) => {
    const id = req.params.id;
    blogModel.find({}, (err, tasks) => {
        res.render("edit.ejs", { Idtask: id, makeTask: tasks });
    })

}).post((req, res) => {
    const id = req.params.id;
    blogModel.findByIdAndUpdate(id, {
        email: req.body.email,
        title: req.body.title,
        description: req.body.description
    }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
})



app.listen(process.env.PORT || 3000, () => console.log('server running successfully..'));