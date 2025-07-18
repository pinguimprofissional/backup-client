FROM node:18-alpine AS build
WORKDIR /app

# copia só o package.json
COPY package.json ./

RUN npm install

# copia o restante
COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
