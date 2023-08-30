require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./config/db')
// const errorHandler = require('./middleware/error')
const path = require('path')

app.use("/images", express.static(path.join(__dirname, "images")));
// app.use('/images', express.static('images'));
connectDB()

app.use(express.json({limit: "50mb"}));
app.use(cors());

// app.use(errorHandler)

app.use('/api',require('./routers/Register'));
app.use('/api',require('./routers/auth'));
app.use('/api',require('./routers/user'));
app.use('/api',require('./routers/provider'));
app.use('/api',require('./routers/ServicesRequest'));






const server = app.listen(process.env.PORT,() => console.log(` server is running in port ${process.env.PORT}`));

process.on("unhandledRejection", (err,promise) => {
console.log(` logged error:${err}`)
server.close(() => process.exit(1))
})