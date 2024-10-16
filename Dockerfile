FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

COPY  . .

RUN pnpm install

RUN pnpm run build

FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
