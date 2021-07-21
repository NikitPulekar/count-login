FROM node:12-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install
COPY . .
ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ENV PORT=4001
EXPOSE 4001
CMD ["npm", "start"]

