const graphql = require('graphql');
const _ = require('lodash');

const Book = require('../model/book');
const Author = require('../model/author');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt , 
    GraphQLList, 
    GraphQLNonNull} = graphql;

//dummy data


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
                // return _.find(authors,{id: authorID})
                return Author.findById(authorID)
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
                // return _.filter(books,{authorID:id})
               return Book.find({ authorID : parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
       book:{
           type:BookType,
           args:{id:{ type: GraphQLID }},
           resolve(parent,args){
               const { id } = args
            //return _.find(books, { id })
               return Book.findById(id);
           }
       },
       author:{
           type:AuthorType,
           args:{id:{ type: GraphQLID }},
           resolve(parent,args){
               const { id } = args
            //return _.find(authors, { id })
               return Author.findById(id)
           }
       },
       books:{
           type: new GraphQLList(BookType),
           resolve(parent,args){
            //return books
            return Book.find({})
           }
       },
       authors:{
           type: new GraphQLList(AuthorType),
           resolve(parent,args){
            //return authors
            return Author.find({})
           }
       }
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{ type: new GraphQLNonNull(GraphQLString)},
                age:{ type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                const { name, age } = args;
                let author = new Author({
                    name,
                    age
                })
               return author.save()
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{ type: new GraphQLNonNull(GraphQLString) },
                genre:{ type: new GraphQLNonNull(GraphQLString) },
                authorID: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent,args){
                console.log(args)
                const { name, genre, authorID } = args
                let book = new Book({
                    name,
                    genre,
                    authorID
                })
                return book.save()
            }
        }
    }

})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation 
});     