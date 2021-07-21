FROM node:12-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install
RUN npm install -g @angular/cli
COPY . .
RUN ng build --prod
ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ENV PORT=4001
EXPOSE 4001
CMD ["npm", "start"]

