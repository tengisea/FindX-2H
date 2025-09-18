# FindX Backend API

This is a Next.js backend API server with GraphQL support using Apollo Server.

## Features

- **GraphQL API** with Apollo Server integration
- **MongoDB** database connection with Mongoose
- **Next.js App Router** for API routes
- **TypeScript** support with code generation
- **CORS** enabled for cross-origin requests

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Environment variables configured

### Environment Variables

Create a `.env.local` file in the root directory with:

```env
FindX_MONGODB_URL=mongodb://localhost:27017/findx
OPENAI_API_KEY=your_openai_api_key_here
```

### Installation

```bash
npm install
# or
yarn install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

The server will start on [http://localhost:3000](http://localhost:3000)

### API Endpoints

- **GraphQL Playground**: [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)
- **GraphQL Endpoint**: `POST http://localhost:3000/api/graphql`

### Code Generation

The project uses GraphQL Code Generator to generate TypeScript types:

```bash
npm run codegen
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
