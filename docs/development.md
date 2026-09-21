# Local development

Use `/Users/sameerkapil/portfolio real` as the single working copy. All current
case studies and assets live here.

```sh
cd "/Users/sameerkapil/portfolio real"
npm run dev
```

Open http://localhost:3000. The development command explicitly uses port 3000;
if a server is already running there, it exits instead of opening port 3001.
Reuse the running preview, or stop it before restarting.

Run builds and production previews from this same directory. Stop the development
server before `npm run build` and `npm start`, since both modes share `.next`.
Do not create temporary source copies for previews.
