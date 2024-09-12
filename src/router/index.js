import { getCookie } from "@/utils/cookie";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      requiresAuth: true,
      layout: "UserLayout",
    },
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
    meta: {
      requiresAuth: true,
      layout: "UserLayout",
    },
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      requiresAuth: false,
      layout: "BlankLayout",
    },
    props: (route) => ({
      dangerMessage: route.query.dangerMessage,
      successMessage: route.query.successMessage,
    }),
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      requiresAuth: false,
      layout: "BlankLayout",
    },
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/verify-email",
    name: "verify-email",
    meta: {
      requiresAuth: false,
      layout: "BlankLayout",
    },
    component: () => import("../views/VerifyEmailView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (getCookie("refresh_token") != null) {
      next();
    } else {
      router.replace("/login");
    }
  } else {
    if (getCookie("refresh_token") == null) {
      next();
    } else {
      router.replace("/");
    }
  }
});

export default router;
