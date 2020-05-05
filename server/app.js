const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')

const app = express();

// connecting to mlab database
mongoose.connect("mongodb+srv://adminDB:adminDB@projects-ybsru.gcp.mongodb.net/test?retryWrites=true&w=majority");
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

// a middleware that let's you interact with the graphql, 
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000')
})