# PersonalBlog

## Project Setup

```sh
docker compose up -d
```

### Compile and Hot-Reload for Development

```sh
docker exec -it techrepo-vite sh -c "npm i && npm run dev"
```

### Compile and Minify for Production

```sh
docker exec -it techrepo-vite sh -c "npm i && npm run build"
```
