FROM node:14.19.3
# set container file dir
RUN mkdir -p /usr/src/app 
# set work dir
WORKDIR /usr/src/app
# 复制packages.json
COPY package*.json /usr/src/app
# 安装依赖
RUN npm install
# 复制所有文件到工作目录
ADD . /usr/src/app
# ORM prisma 生成 类型定义
RUN npm run model:b
# 编译ts
RUN npm run tsc
# 在docker 中要使用前台模式运行
CMD [ "npm", "run" , "start:docker" ]
# 暴露容器端口
EXPOSE 7001