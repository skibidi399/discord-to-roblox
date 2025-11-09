# discord-to-roblox

Simple Express server that accepts POST /publish and exposes GET /messages for Roblox to poll.
Set `SHARED_SECRET` environment variable (Render / hosting service) to secure the endpoints.

- POST /publish  (header: Authorization: Bearer <secret>) body: { author, content }
- GET  /messages?since=<timestamp>&secret=<secret>  OR use Authorization header

Deploy to Render and set SHARED_SECRET in environment variables.# discord-to-roblox
