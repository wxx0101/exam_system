import request from "../utils/request"

const login = (data) => request.post('/user/login', data)  //登录接口
const userinfo = () => request.get("/user/userInfo")  //获取当前用户信息
const list = (data) => request.get("/user/new", { params: data })  //根据用户id，返回该用户的视图权限
const getQuestionsType = () => request.get("/exam/getQuestionsType")  //获取所有的试题类型
const insertQuestionsType = (data) => request.get("/exam/insertQuestionsType", { params: data })  //添加试题类型
const examType = () => request.get("/exam/examType")  //获取所有的考试类型
const subject = () => request.get("/exam/subject")  //获取所有的课程
const questions = (data) => request.post("/exam/questions", data)  //添加试题接口
const questionsTest = () => request.get("/exam/questions/new")  //获取所有的试题
const questionsCondition = (data) => request.get("/exam/questions/condition", { params: data })  //按条件获取试题
const identityViewAuthorityRelation = () => request.get("/user/identity_view_authority_relation")  //视图接口权限
const identityApiAuthorityRelation = () => request.get("/user/identity_api_authority_relation")  //api接口权限
const identity = () => request.get("/user/identity")   //获取身份
const user = () => request.get("/user/user")  //更新用户信息(用户名，用户密码，用户身份)
const addUser = (data) => request.post("/user", data)   //添加用户
const userIdentityEdit = (data) => request.get("/user/identity/edit", { params: data })   //添加身份 
const userAuthorityApiEdit = (data) => request.get("/user/authorityApi/edit", { params: data })  //添加api接口权限
const userAuthorityViewEdit = (data) => request.get("/user/authorityView/edit", { params: data })  //添加视图权限
const userSetIdentityView = (data) => request.post("/user/setIdentityView", data)  //给身份设定视图权限
const userSetIdentityApi = (data) => request.post("/user/setIdentityApi", data)  //给身份设定api接口权限

export default { login, userinfo, list, getQuestionsType, insertQuestionsType, examType, subject, questions, questionsTest, questionsCondition, identity, user, identityViewAuthorityRelation, identityApiAuthorityRelation, addUser, userIdentityEdit, userAuthorityApiEdit, userAuthorityViewEdit, userSetIdentityView, userSetIdentityApi }    
