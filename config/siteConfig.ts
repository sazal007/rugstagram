export const siteConfig = {
  backendUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  admin: {
    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
  },
};