import DiscordProvider from "@auth/core/providers/discord";
import GoogleProvider from "@auth/core/providers/google";
import type { SolidAuthConfig } from "@solid-auth/base";

export const authOptions: SolidAuthConfig = {
  secret: process.env.AUTH_SECRET as string,

  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};
