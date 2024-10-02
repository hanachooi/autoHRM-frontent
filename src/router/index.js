import { createRouter, createWebHistory } from 'vue-router'
import {checkUserRole} from "@/utils/auth";
import SignIn from "@/components/SignIn.vue";
import EmployeeHome from "@/components/EmployeeHome.vue";
import FindAllowance from "@/components/DashBoard/FindAllowance.vue";
// import Dashboard from "../views/Dashboard.vue";

const routes = [
    {
        path: '/',
        name: 'signin',
        component: SignIn
    },
    {
        path: "/home",
        name: "EmployeeHome",
        component: EmployeeHome,
    },
    {
        path: "/sign-in",
        name: "SignIn",
        component: SignIn
    },
    {
        path:"/allowance",
        name:"Allowance",
        component: FindAllowance
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active",
});
router.beforeEach((to, from, next) => {
    if (to.meta.requiredRoles) {
        const hasAccess = checkUserRole(to.meta.requiredRoles);
        console.log(hasAccess);
        if (hasAccess) {
            next();
        } else {
            alert('접근 권한이 없습니다.');
            next({ name: 'SignIn' });
        }
    } else {
        next();
    }
});
export default router;
