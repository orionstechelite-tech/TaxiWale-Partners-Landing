# Live Website Preview Commands

## Development Preview (Recommended for Testing)

Run the development server for live preview with hot-reload:

```bash
npm run dev
```

This will start the Next.js development server at: **http://localhost:3000**

Press `Ctrl + C` in the terminal to stop the server.

---

## Production Preview (Build and Start)

To preview the production build:

1. Build the project:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

This will also run at: **http://localhost:3000**

---

## Quick Reference

| Command         | Purpose                            | URL                   |
| --------------- | ---------------------------------- | --------------------- |
| `npm run dev`   | Development server with hot-reload | http://localhost:3000 |
| `npm run build` | Build for production               | -                     |
| `npm start`     | Run production server              | http://localhost:3000 |
| `npm run lint`  | Check for code errors              | -                     |

---

## Notes

- Make sure dependencies are installed first: `npm install`
- The development server automatically reloads when you save changes
- Check the terminal output for any errors or the actual port number if 3000 is occupied
