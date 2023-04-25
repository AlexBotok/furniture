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
const Brand = require('./models/Brand')
const Mechanism = require('./models/Mechanism')
const Extender = require('./models/Extender')
const Frame = require('./models/Frame')
const Box = require('./models/Box')
const City = require('./models/City')
const {
    upload,
    resizeImage
} = require('./models/upload')
const {
    verifyToken,
    verifyUserLogin
} = require('./models/verifyToken')
const port = process.env.PORT || 3001
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
        app.listen(port, () => console.log("server started on port 3001"))
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

app.post('/admin-product', upload.single('img'), async (req, res) => {
    try {
        const imgsrc = req.file ? "/" + req.file.path.replace(/\\/g, '/') : '';
        const {
            name,
            price,
            title,
            type,
            instock,
            brand,
            mechanism,
            extender,
            frame,
            box,
            city
        } = req.body;
        const productCount = await Product.countDocuments({});
        let id = 1;
        if (productCount) {
            const LastProduct = await Product.find().count();
            id = LastProduct + 1;
        }

        if (name && price && type && title && instock != '') {
            if (req.file) {
                resizeImage(req.file.path);
            }
            const response = await Product.create({
                id,
                name,
                price,
                type,
                title,
                instock,
                imgsrc,
                brand,
                mechanism,
                extender,
                frame,
                box,
                city
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

app.post('/admin-brand', async (req, res) => {
    try {
        const {
            brand
        } = req.body;

        if (brand != '') {
            const response = await Brand.create({
                brand
            });
            res.redirect('/admin');
        } else {
            return res.send('brand clear');
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
});

app.post('/admin-mechanism', async (req, res) => {
    try {
        const {
            mechanism
        } = req.body;

        if (mechanism != '') {
            const response = await Mechanism.create({
                mechanism
            });
            res.redirect('/admin');
        } else {
            return res.send('mechanism clear');
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
});

app.post('/admin-extender', async (req, res) => {
    try {
        const {
            extender
        } = req.body;

        if (extender != '') {
            const response = await Extender.create({
                extender
            });
            res.redirect('/admin');
        } else {
            return res.send('extender clear');
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
});

app.post('/admin-frame', async (req, res) => {
    try {
        const {
            frame
        } = req.body;

        if (frame != '') {
            const response = await Frame.create({
                frame
            });
            res.redirect('/admin');
        } else {
            return res.send('frame clear');
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
});

app.post('/admin-box', async (req, res) => {
    try {
        const {
            box
        } = req.body;

        if (box != '') {
            const response = await Box.create({
                box
            });
            res.redirect('/admin');
        } else {
            return res.send('box clear');
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
});

app.post('/admin-city', async (req, res) => {
    try {
        const {
            city
        } = req.body;

        if (city != '') {
            const response = await City.create({
                city
            });
            res.redirect('/admin');
        } else {
            return res.send('city clear');
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
});

app.get('/', (req, res) => {
    res.redirect('home')
})

app.get('/admin', (req, res) => {
    const title = 'Admin Panel';
    const {
        token
    } = req.cookies;
    if (verifyToken(token)) {
        Promise.all([
            Brand.find().exec(),
            Mechanism.find().exec(),
            Extender.find().exec(),
            Frame.find().exec(),
            Box.find().exec(),
            City.find().exec()
        ]).then(([brand, mechanism, extender, frame, box, city]) => {
            res.render('admin', {
                title,
                brand,
                mechanism,
                extender,
                frame,
                box,
                city
            });
        })
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
    Promise.all([
        Product.find().exec(),
        Brand.find().exec(),
        Mechanism.find().exec(),
        Extender.find().exec(),
        Frame.find().exec(),
        Box.find().exec(),
        City.find().exec()
    ]).then(([product, brand, mechanism, extender, frame, box, city]) => {
        res.render('sofas', {
                title,
                product,
                brand,
                mechanism,
                extender,
                frame,
                box,
                city
            })
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
        .render(createPath('error'), {
            errorCode: 404,
            title
        })
})


start()