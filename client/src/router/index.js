import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login'
import Home from '../views/home/index'
import api from "../api/index"

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: "addExam",
          component: () => import("../views/home/child/addExam.vue"),
          meta: {
            flag: true
          }
        },
        {
          path: "addQuestions",
          component: () => import("../views/home/child/addQuestions.vue"),
          meta: {
            flag: true
          }
        },
        {
          path: "editQuestions",
          component: () => import("../views/home/child/addQuestions.vue"),
          meta: {
            flag: true
          }
        },
        {
          path: "addUser",
          component: () => import("../views/home/child/addUser.vue"),
          meta: {
            flag: true
          }
        },
        {
          path: "examList",
          component: () => import("../views/home/child/examList.vue"),
          meta: {
            flag: true
          }
        },
        {
          path: "grade",
          component: () => import("../views/home/child/grade.vue"),
          meta: {
            flag: true
          }
        },
        {
          path: "notFont",
          component: () => import("../views/home/child/notFont.vue")
        },
        {
          path: "questionsType",
          component: () => import("../views/home/child/questionsType.vue"),
          meta: {
            flag: true
          }
        },
        {
          path: "room",
          component: () => import("../views/home/child/room.vue"),
          meta: {
            flag: true
          }
        },
        {
          path: "showUser",
          component: () => import("../views/home/child/showUser.vue"),
          meta: {
            flag: true
          }
        },
        {
          path: "student",
          component: () => import("../views/home/child/student.vue"),
          meta: {
            flag: true
          }
        },
        {
          path: "watchQuestions",
          component: () => import("../views/home/child/watchQuestions.vue"),
          meta: {
            flag: true
          }
        },
        {
          path: "welcome",
          component: () => import("../views/home/child/welcome.vue")
        },
        {
          path: "/home",
          redirect: "/home/welcome"
        }
      ]
    },
    {
      path: "/",
      redirect: "/login"
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.path.includes("/home")) {
    let token = await sessionStorage.getItem("authorization")
    if (!token) {
      next("/login")
    } else {
      let res = await api.userinfo().then(res => res)
      let { code, data } = res
      let { user_id, identity_text, user_name } = data
      sessionStorage.setItem("userinfo", JSON.stringify({ user_id, identity_text, user_name }))
      if (!code) {
        next("/home/welcome")
      } else {
        if (to.meta.flag) {
          let { user_id } = JSON.parse(sessionStorage.getItem('userinfo'))
          let ress = await api.list({ user_id: user_id }).then(res => res)
          let { code, data } = ress;
          if (code) {
            let path = to.path.slice(1).replace("/", "-").replace("home", "main")
            let flag = data.find(item => item.view_id === path)
            if (flag) {
              next()
            } else {
              next("/home/notFont")
            }
          }
        } else {
          next()
        }
      }
    }
  } else {
    next()
  }
})


export default router;