var express = require('express')
const ports = [80, 443]
const servers = []

ports.forEach(port => {
    servers.push(express())
})

servers.forEach(server => {
    
})