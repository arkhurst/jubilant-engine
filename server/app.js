const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config()

const app = express();

// allow cross-origin-request
app.use(cors())

// connecting to mlab database
mongoose.connect(process.env.DATABASE_URI,{useNewUrlParser: true, useUnifiedTopology: true},);
mongoose.connection.once('open', () => {
    console.log('connected to database')
}).catch(err => console.log(err))

// a middleware that let's you interact with the graphql, 
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000')
})