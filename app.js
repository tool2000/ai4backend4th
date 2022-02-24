const express = require('express')
// const passport = require('passport')
const path = require('path')
const morgan = require('morgan')
const session = require('express-session')
const nunjucks = require('nunjucks')
const dotenv = require('dotenv')

dotenv.config()

const v1 = require('./routes/v1')
const indexRouter = require('./routes/index.js')
// const passportConfig = require('./passport')

const app = express()
// passportConfig()
app.set('port', 3000)
app.set('view engine', 'html')
nunjucks.configure('views', {
    express: app,
    watch: true
})

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "elice SNS",
    cookie: {
        httpOnly: true,
        secure: false
    }
}))

app.use('/', indexRouter)
app.use('/v1', v1)

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
    error.status = 404
    next(error)
})

app.use((err, req, res, next)=> {
    res.status(err.status)
    res.send('<h1>Error...</h1>')
})

app.listen(3000, ()=> {
    console.log('3000번 포트에서 웹서버 실행중...')
})
