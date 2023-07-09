import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/app/lib/mongodb";
import UserTracker from "@/models/userTracker/UserTracker";

const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.JWT_SECRET,

  callbacks: {
    async signIn({ user }) {
      await dbConnect();

      const users = await UserTracker.find({ email: user.email });

      const works: any[] = [];

      if (users.length === 0) {
        const newUser = new UserTracker({
          email: user.email,
          name: user.name,
          works,
        });

        await newUser.save();
      }

      return true;
    },
  },
});

export { authHandler as GET, authHandler as POST };
