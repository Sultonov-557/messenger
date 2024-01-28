######### Build #########
FROM node:18-alpine3.17 as build
WORKDIR /home/klinx-api/
COPY . .
RUN yarn install --silent && yarn build

######### Production #########
FROM node:18-alpine3.17
COPY --from=build /home/klinx-api/package.json package.json
COPY --from=build /home/klinx-api/yarn.lock yarn.lock
COPY --from=build /home/klinx-api/dist ./dist
COPY --from=build /home/klinx-api/node_modules node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]
