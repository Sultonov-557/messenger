# Messenger API

A real-time messaging API built with NestJS and TypeScript that supports direct messaging, group chats, and real-time updates via WebSockets.

## Features

- **User Management**: Registration, authentication, profile management
- **Direct Messaging**: Send and receive private messages between users
- **Group Chats**: Create and manage group conversations
- **Real-time Updates**: Instant message delivery using WebSockets/Socket.io
- **Secure Communication**: JWT authentication, encrypted messages
- **API Documentation**: Swagger UI available in development environment

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MySQL with TypeORM
- **Real-time Communication**: Socket.io
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger
- **Validation**: class-validator
- **Security**: helmet, bcrypt

## Prerequisites

- Node.js (v16+)
- Bun package manager
- MySQL database

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   bun install
   ```
3. Configure environment variables:

   ```
   cp .env.example .env
   ```

   Update the values in `.env` with your configuration

4. Start the development server:
   ```
   bun run dev
   ```

## Environment Variables

| Variable             | Description               | Default   |
| -------------------- | ------------------------- | --------- |
| PORT                 | Port the server runs on   | 3000      |
| ENV                  | Environment (dev/prod)    | dev       |
| DB_HOST              | Database host             | localhost |
| DB_PORT              | Database port             | 3306      |
| DB_USERNAME          | Database username         | root      |
| DB_PASSWORD          | Database password         | root      |
| DB_NAME              | Database name             | test      |
| DB_SYNC              | Auto-sync database schema | 1         |
| PASSPHRASE           | Encryption passphrase     | -         |
| ACCESS_TOKEN_SECRET  | JWT access token secret   | -         |
| REFRESH_TOKEN_SECRET | JWT refresh token secret  | -         |

## Available Scripts

- `bun run build` - Build the application
- `bun run format` - Format code with Prettier
- `bun run start` - Start the application
- `bun run dev` - Start the application in watch mode
- `bun run debug` - Start the application in debug mode
- `bun run prod` - Run production build
- `bun run lint` - Lint the code

## API Endpoints

### Authentication

- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Authenticate a user

### User Management

- `GET /api/user/profile` - Get current user profile
- `PUT /api/user/profile` - Update user profile

### Messages

- `GET /api/message/:userId` - Get messages between current user and specified user
- `POST /api/message/:userId` - Send a message to specified user

### Groups

- `GET /api/group` - Get user's groups
- `POST /api/group` - Create a new group
- `GET /api/group/:groupId` - Get group details
- `PUT /api/group/:groupId` - Update group details
- `POST /api/group/:groupId/message` - Send a message to the group

## WebSocket Events

The application uses Socket.io for real-time communication:

- `message` - Emitted when a new direct message is sent
- `group-message` - Emitted when a new group message is sent
- `typing` - Emitted when a user is typing
- `online` - Emitted when a user comes online
- `offline` - Emitted when a user goes offline

## Development

### API Documentation

When running in development mode, Swagger documentation is available at:

```
http://localhost:3000/docs
```

### Database

The application uses TypeORM with MySQL. Database migrations are managed through TypeORM.

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Message encryption
- HTTP security headers with Helmet
- Input validation with class-validator

## Production Deployment

1. Build the application:

   ```
   bun run build
   ```

2. Set environment variables for production:

   ```
   ENV=prod
   ```

3. Run the production build:
   ```
   bun run prod
   ```

## License

This project is licensed under [UNLICENSED]
