const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt , 
    GraphQLList} = graphql;

//dummy data
let books = [
    {id:'1', name:'The Hunt for Red',genre:'Thriller',authorID:'1'},
    {id:'2',name:'The Outsider', genre:'Horror', authorID:'2'},
    {id:'3',name:'The Hero of ages', genre:'Fiction',authorID:'3'},
    {id:'4',name:'Without Remorse', genre:'Thriller-Novel',authorID:'1'},
    {id:'5',name:'The Stand', genre:'Fantasy',authorID:'2'},
    {id:'6',name:'Attalos, Athens and the Akropolis', genre:'History',authorID:'3'},
]

let authors = [
    {id:'1',name:'Tom Clancy',  age:64},
    {id:'2',name:'Stephen King',age:69 },
    {id:'3', name:'Isaac Andrew Stewart',age:32 }
]

const BookType = new GraphQLObjectType({
    name:"Book",
    fields:() => ({
        id:{ type: GraphQLID },
        name:{ type: GraphQLString },
        genre:{ type: GraphQLString },
        author:{
            type: AuthorType,
            resolve(parent,args){
                const { authorID } = parent
                console.log(parent)
                return _.find(authors,{id: authorID})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:() => ({
        id:{ type: GraphQLID },
        name:{ type: GraphQLString },
        age:{ type: GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                const { id } = parent
                return _.filter(books,{authorID:id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
   // individual books
       book:{
           type:BookType,
           args:{id:{ type: GraphQLID }},
           resolve(parent,args){
               const { id } = args
               //args.id
               //code to get data from db/other source
              return _.find(books, { id })
           }
       },
    //  individual authors  
       author:{
           type:AuthorType,
           args:{id:{ type: GraphQLID }},
           resolve(parent,args){
               const { id } = args
               return _.find(authors, { id })
           }
       },
    //   root query for all books
       books:{
           type: new GraphQLList(BookType),
           resolve(parent,args){
               return books
           }
       },
    //  root query for all authors
       authors:{
           type: new GraphQLList(AuthorType),
           resolve(parent,args){
               return authors
           }
       }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
});     