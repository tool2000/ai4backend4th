const express = require('express')
const jwt = require('jsonwebtoken')

const { verifyToken } = require('./middleware.js')

const router = express.Router()

router.get('/token', async (req, res) => {
    try {
        const token = jwt.sign({
            id: '내sns사용자',
            nick: 'consumer88',
            grade: 'premium'
        }, process.env.JWT_SECRET, {
            expiresIn: '60m',
            issuer: 'mySNS'
        })


    }
})



router.get('/test')