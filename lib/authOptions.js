import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/gmail.readonly',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Secret for session management
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token; // Add access token to the JWT
        token.scope = account.scope; // Add scope to the token
        console.log('Scopes:', account.scope); // Debug statement to log scopes
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // Add access token to session
      session.scope = token.scope; // Add scope to the session     
      return session;
    },
  },
};