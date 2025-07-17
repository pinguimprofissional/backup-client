FROM node:18-alpine

WORKDIR /app

# Copia apenas arquivos de dependência primeiro (para cache eficiente)
COPY package*.json ./

# Instala dependências (inclui vite)
RUN npm install

# Copia todo o código
COPY . .

# Expõe porta do Vite
EXPOSE 5173

# Inicia em modo dev acessível externamente
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
