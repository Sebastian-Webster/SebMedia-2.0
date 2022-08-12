//Initialize connection to MongoDB Atlas database
require('./config/db')

var express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const ports = [80, 443, 8080]
const servers = []

const UserRoute = require('./routes/User');

ports.forEach(port => {
    servers.push(express())
})

servers.forEach((server, index) => {
    server.use(cors())

    server.use(bodyParser.json())

    server.use('/user', UserRoute)
    
    server.listen(ports[index], () => {
        console.log(`Server ${index + 1} is listening on port ${ports[index]}`)
    })
})