# Estágio de Build - ATUALIZADO PARA NODE 22
# Alterando a versão de 22 para 20 pois utiliza menos memória. Meu ambiente tem apenas 1gb
FROM node:20-alpine as build-stage
WORKDIR /app

COPY package*.json ./

#RUN npm install
# 2. Instala com menos consumo
RUN npm cache clean --force && \
    npm install --loglevel info
# 3. VERIFICAÇÃO: Se este comando falhar, o build para aqui e sabemos que não instalou
RUN ls -d node_modules && ls node_modules/.bin/vite

COPY . .

# evita estourar 1GB durante build
ENV NODE_OPTIONS="--max-old-space-size=512"

#RUN npm run build
# Adicionado pois está dando erro de Vite nao encontrado
RUN ./node_modules/.bin/vite build

# Estágio de Produção
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]