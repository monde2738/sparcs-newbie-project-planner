const express = require('express');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const authMiddleware = require('../middleware/auth');
const jwt = require("jsonwebtoken");