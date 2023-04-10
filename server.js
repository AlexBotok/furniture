const express = require('express')
const {
    MongoClient
} = require("mongodb")
const mongoose = require('mongoose')
const path = require('path')
const bodyparser = require("body-parser")
const bcrypt = require('bcryptjs')
var cookieParser = require('cookie-parser')
const User = require('./models/Users')
const Product = require('./models/Products')
const {
    upload,
    checkImageSize
} = require('./models/upload')
const {
    verifyToken,
    verifyUserLogin
} = require('./models/verifyToken')
const port = process.env.PORT || 3000
const app = express()

const salt = 10
app.set('view engine', 'ejs')
app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
mongoose.set('strictQuery', true)

const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin:adminalex@cluster0.on6ri4v.mongodb.net/sitedb")
        app.listen(port, () => console.log("server started on port 3000"))
    } catch (e) {
        console.log(e)
    }
}

app.post('/signup', async (req, res) => {
    const {
        email,
        password: plainTextPassword
    } = req.body
    const password = await bcrypt.hash(plainTextPassword, salt)
    try {
        const response = await User.create({
            email,
            password
        })
        return res.redirect('/');
    } catch (error) {
        console.log(JSON.stringify(error))
        if (error.code === 11000) {
            return res.send({
                status: 'error',
                error: 'email already exists'
            })
        }
        throw error
    }
})

app.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body
    const response = await verifyUserLogin(email, password)
    if (response.status === 'ok') {
        res.cookie('token', token, {
            maxAge: 2 * 60 * 60 * 1000,
            httpOnly: true
        }); // ms
        res.redirect('admin')
    } else {
        res.json(response)
    }
})

app.post('/admin', upload.single('img'), async (req, res) => {
    try {
        const imgsrc = req.file ? "/" + req.file.path.replace(/\\/g, '/') : '';
        const {
            name,
            price,
            title,
            type,
            instock
        } = req.body;
        const productCount = await Product.countDocuments({});
        let id = 1;
        if (productCount) {
            const LastProduct = await Product.find().count();
            id = LastProduct + 1;
        }

        if (name && price != '') {
            if (req.file) {
                checkImageSize(req.file.path);
            }
            const response = await Product.create({
                id,
                name,
                price,
                type,
                title,
                instock,
                imgsrc
            });
            res.redirect('/admin');
        } else {
            return res.send('name or price clear');
        }
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.send({
                status: 'error',
                error: 'product error'
            });
        }
        return res.status(400).send(error.message);
    }
})

app.get('/', (req, res) => {
    res.redirect('home')
})

app.get('/admin', (req, res) => {
    const title = 'Admin Panel';
    const {
        token
    } = req.cookies;
    if (verifyToken(token)) {
        return res.render('admin', {
            title
        });
    } else {
        res.redirect('login')
    }
})

app.get('/home', (req, res) => {
    const title = 'Home';
    res.render('home', {
        title
    });
})

app.get('/login', (req, res) => {
    const title = 'Login';
    res.render('signin', {
        title
    });
})

app.get('/signup', (req, res) => {
    const title = 'SignUP';
    res.render('signup', {
        title
    })
})

app.get('/sofas', (req, res) => {
    const title = 'Sofa';
    Product.find().then((product) =>
            res.render('sofas', {
                product,
                title
            }))
        .catch((error) => {
            console.log(error);
        })
})

app.get('/sofas/:id', (req, res) => {
    const pid = req.params.id
    const title = 'Sofa ' + pid;
    Product.find().then((product) =>
            res.render('product', {
                product,
                title,
                pid
            }))
        .catch((error) => {
            console.log(error);
        })
})

app.get('/cart', (req, res) => {
    Product.find()
        .then(product => {
            const title = 'Cart';
            res.render('cart', {
                product,
                title
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Internal server error');
        });
});
app.get('/cart.json', (req, res) => {
    Product.find()
        .then(product => {
            const title = 'Cartjs';
            res.json({
                product
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: 'Internal server error'
            });
        });
});

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`)

app.use((req, res) => {
    const title = 'Error';
    res
        .status(404)
        .render(createPath('error'), { errorCode: 404, title })
})



start()