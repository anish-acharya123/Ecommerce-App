import "dotenv/config";

export default {
  expo: {
    name: "my-app",
    slug: "my-app",
    extra: {
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  },
};
