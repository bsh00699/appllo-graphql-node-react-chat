# appllo-graphql-node-react-chat
Apollo Server 是一个开源的、符合规范的 GraphQL 服务器,它兼容任何 GraphQL 客户端，包括Apollo Client。
在这里利用他们，开发一个简单的chat app 

### 特征（优势）
#### 服务端
* 抛开繁重的RESTFul开发方式，全面拥抱Graphql快速开发（例如 添加功能、版本发布）
* 应用现有Node.js中间件的附加组件（例如 Express 或 koa)，实现我们想要的功能（例如 静态服务器，文件上传等等）
* 增量采用，允许你根据需要添加功能
#### 客户端
* 抛开繁重的class组件开发方式，全面拥抱Hooks
* 抛开redux繁琐的action、reducer、dispatch等等，利用Apollo Client全局管理store，让其变得简单、直白
* 声明式数据获取：编写查询并接收数据，无需手动跟踪加载状态
* 专为现代React设计：利用最新的React功能，例如Hooks

### 技术栈
#### 服务端
* Apollo-server + nodejs + express
* sequelize + mysql
#### 客户端
* react-app框架
* ant.design组件库
* react hooks组件开发方式
* apollo-client全局管理state

### 运行
#### 服务端
```
npm install
npm run dev
```
#### 客户端
```
cd client
npm install
npm start
```
### 预览
![login](https://github.com/bsh00699/appllo-graphql-node-react-chat/blob/master/previewImg/login.png)
![register](https://github.com/bsh00699/appllo-graphql-node-react-chat/blob/master/previewImg/register.png)
![home](https://github.com/bsh00699/appllo-graphql-node-react-chat/blob/master/previewImg/home.png)

### 参考
* [apollo官方文档](https://www.apollographql.com/docs/)
* [sequelize官方文档](https://www.sequelize.com.cn/core-concepts/model-basics)
* [antDesign在create-react-app中使用](https://ant.design/docs/react/use-with-create-react-app-cn)
