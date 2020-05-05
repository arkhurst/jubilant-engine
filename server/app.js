const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

// a middleware that let's you interact with the graphql, 
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000')
})