FROM vue.itest.info/library/node:12 as builder
RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY . .
RUN npm install
RUN npm run build

FROM vue.itest.info/library/nginx:1.19
RUN mkdir -p /srv/vue-template/dist
COPY nginx/vue.conf /etc/nginx/vue.d/
COPY --from=builder /opt/app/dist /srv/vue-template/dist
