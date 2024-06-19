import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //invoked on successfull signin
    async signIn({ profile }) {
      //1. connect to database
      //2. check if user exists
      //3. if not add user to database
      //4. return true to sign in user
    },

    // modifies the session
    async session({ session }) {
      //1. Get user from database
      //2. Assign the user id to the session
      //3. return session
    },
  },
};
