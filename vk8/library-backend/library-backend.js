require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)


mongoose.connect(MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
)
.then(() => {
  console.log('connected to MONGODB')
})
.catch(error => {
  console.log('error connecting to mongo:', error.message)
})

const typeDefs = gql`

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {}
      if (args.genre)
        filter['genres'] = { $in: args.genre }

        const temp = await Book.find(filter)
          .populate('author')

      if (!args.author) return temp

      return temp.filter(b => b.toObject().author.name === args.author)
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book
        .find({})
        .populate('author')
      const sum = books
        .map(mongooseThingy => mongooseThingy.toObject())
        .reduce((sum, book) => 
        {
          return book.author.name === root.name
          ? sum+1
          : sum
        }, 0)
      return sum
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
          author = new Author({ name: args.author })
          try {
            author = await author.save()
          } catch (e) {
            throw new UserInputError(e.message, {
              invalidArgs: args,
            })
          }
      }
      const book = new Book({ ...args, author: author.id })
      try {
        await book.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      const retval = Author.findOneAndUpdate(
        { name: args.name }, { born: args.setBornTo }, { new: true })
      if (!retval.editAuthor)
        throw new UserInputError('author not found', {
          invalidArgs: args
        })
      return retval
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
