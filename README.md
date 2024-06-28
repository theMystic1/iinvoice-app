
# Invoice App

## Overview

Invoice App is a web application built with Next.js that leverages Supabase for the backend and NextAuth for authentication. This application provides users with a seamless way to create, manage, and send invoices.

## Features

- User authentication and authorization with NextAuth
- Secure data management with Supabase
- Create, view, edit, and delete invoices
- Responsive design for mobile and desktop
- Real-time updates and data synchronization

## Installation

### Prerequisites

- Node.js (version 14.x or higher)
- npm or yarn

### Steps

1. Clone the repository:

```bash
git clone https://github.com/yourusername/invoice-app.git
cd invoice-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Usage

1. Start the development server:

```bash
npm run dev
# or
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

- **React**
- **Next.js**
- **Supabase**
- **NextAuth**

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Supabase](https://supabase.io/)
- [NextAuth](https://next-auth.js.org/)
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
