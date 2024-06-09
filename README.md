# Email Classification Project

This project is a Next.js application that fetches emails, classifies them into categories, and displays them with corresponding colors. It uses NextAuth.js for authentication and fetches email data from an API.

## Features

- **Email Fetching**: Retrieve emails from an API endpoint.
- **Email Classification**: Classify emails into categories such as Important, Promotions, Social, Marketing, Spam, and General.
- **Email Display**: Display emails with classification colors and provide a detailed view in a modal.
- **User Authentication**: Secure the application with user authentication using NextAuth.js.

## Demo Video

Watch the demo video here

https://github.com/Singh-1223/MiMail/assets/126049926/b83634e0-dfc5-4cff-93a4-7d0ba4a2d41f


## Screenshots

LOGIN PAGE

![M1](https://github.com/Singh-1223/MiMail/assets/126049926/5e89488f-f113-49fa-abd0-cb8d8a5d545a)

GETTING GMAILS USING GMAIL API
![M2](https://github.com/Singh-1223/MiMail/assets/126049926/76b7cea3-d1a4-4519-9c30-5ae917c33f7e)

MODAL ON CLICKING SPECIFIC MAIL AND SPECIFIC URL QUERY IN URL
![M3](https://github.com/Singh-1223/MiMail/assets/126049926/6eb9f21f-05f0-4bc0-99a1-335d5ad31db4)

CLASSIFICATION
![M-4](https://github.com/Singh-1223/MiMail/assets/126049926/baeb583e-6da3-4204-a357-474632224cb5)



## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)
- Next js , Tailwind , React

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/email-classification.git
   cd email-classification

2. Install the dependencies

   ```sh
   npm install

3. Add env variables

   ```sh
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   NEXTAUTH_SECRET

4. Run the app

   ```sh
   npm run dev
   

