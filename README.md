# Edvora - Learn & Grow

> Edvora is an Edtech platform.

## How to run project

- Clone the repository

```bash
git clone https://github.com/Goldfish7718/edvora.git
```

### Frontend setup Instructions

- Refer the [.env.example](client/.env.example) for any required API keys.

- Install dependencies and start the development server

```bash
pnpm install
pnpm run dev
```

### Backend setup Instructions

- Refer the [.env.example](server/.env.example) for any required API keys.

- Install dependencies

```bash
pnpm install
```
- Migrate schema to database and generate prisma client

```bash
pnpm prisma migrate dev
pnpm prisma generate
```

### Important note
- For local development, you need to make sure that the cookies sent from the server in [user controllers file](server/src/controllers/user.controllers.ts) have the following options set. This will require a small change in just the Sign Up and Log in controller.

```javascript
{
    httpOnly: true,
    secure: true,
    sameSite: "none",
}
```

- Compile typescript (optional)

```bash
pnpm run watch
```

- Run the development server

```bash
pnpm run dev
```

## Contributors 👥

- [Goldfish7718](https://github.com/Goldfish7718)

# Contact 🔗

- For any questions, please contact me on my email: [tejasnanoti2@gmail.com](mailto:tejasnanoti2@gmail.com)
- [![Twitter: tejas_jsx](https://img.shields.io/twitter/follow/tejas_jsx?style=social)](https://twitter.com/tejas_jsx)
- [![Linkedin: tejasnanoti](https://img.shields.io/badge/-tejasnanoti-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tejas-nanoti-23965823b/)](https://www.linkedin.com/in/tejas-nanoti-23965823b/)
- [![GitHub Goldfish7718](https://img.shields.io/github/followers/Goldfish7718?label=follow&style=social)](https://github.com/Goldfish7718)