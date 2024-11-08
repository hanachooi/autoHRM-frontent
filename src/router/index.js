import { createRouter, createWebHistory } from 'vue-router'
import {checkUserRole} from "@/utils/auth";
import SignIn from "@/components/SignIn.vue";
import FindAllowance from "@/components/Employee/FindAllowance.vue";
import ManagerHome from "@/components/Manager/ManagerHome.vue";
import EmployeeHome from "@/components/Employee/EmployeeHome.vue";
import EmployeeCreate from "@/components/Manager/EmployeeCreate.vue";
import SalariesComponent from "@/components/Manager/SalariesComponent.vue";
import PayCheckout from "@/components/Manager/PayCheckout.vue";

const routes = [
    {
        path: '/',
        name: 'signin',
        component: SignIn
    },
    {
        path: "/employee/home",
        name: "EmployeeHome",
        component: EmployeeHome,
    },
    {
        path: "/manager/home",
        name: "ManagerHome",
        component: ManagerHome,
    },
        {
        path:"/manager/employee/create",
        name:"CreateEmployee",
        component: EmployeeCreate
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
    },
    {
        path:"/manager/salaries",
        name:"Salaries",
        component: SalariesComponent
    },
    {
        path: "/manager/pay",
        name: "PayComponent",
        component: PayCheckout,
    },
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


