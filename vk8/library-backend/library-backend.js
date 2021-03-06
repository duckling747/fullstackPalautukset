require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET

const KOVAKOODATTU_SALASANA = 'salaisuus'

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

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
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }

`

const resolvers = {
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
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
    allAuthors: async () => {
      const books = await Book.find({})
        .populate('author')
      let tally = {}
      for (b of books) {
        if (tally[b.author.id]) continue
        tally[b.author.id] = {
          name: b.author.name,
          born: b.author.born,
          id: b.author.id
        }
      }
      for (b of books) {
        tally[b.author.id]['bookCount'] 
          = (tally[b.author.id]['bookCount'] || 0) + 1
      }
      return Object.values(tally)
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) throw new AuthenticationError('not authenticated')

      let author = await Author.findOne({ name: args.author })
      if (!author) {
          author = new Author({ name: args.author })
          author = await author.save()
            .catch(e => {
              throw new UserInputError(e.message, {
                invalidArgs: args,
              })
            })
      }
      let book = new Book({ ...args, author: author.id })
      await book.save()
        .catch(e => {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        })
      book.author = author
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) throw new AuthenticationError('not authenticated')

      const author = await Author.findOne(
        { name: args.name })
      author.born = args.setBornTo
      return author.save()
        .catch(e => {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        })
    },
    createUser: (root, args) => {
      const user = new User(
        { username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(e => {
          throw new UserInputError(e.message), {
            invalidArgs: args,
          }
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== KOVAKOODATTU_SALASANA)
        throw new UserInputError('wrong credentials')
      
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
