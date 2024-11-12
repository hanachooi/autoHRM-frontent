import { createRouter, createWebHistory } from 'vue-router'
import {checkUserRole} from "@/utils/auth";
import SignIn from "@/components/SignIn.vue";
import FindAllowance from "@/components/Employee/FindAllowance.vue";
import ManagerHome from "@/components/Manager/ManagerHome.vue";
import EmployeeHome from "@/components/Employee/EmployeeHome.vue";
import EmployeeCreate from "@/components/Manager/EmployeeCreate.vue";
import SalariesComponent from "@/components/Manager/SalariesComponent.vue";
import PayCheckout from "@/components/Manager/PayCheckout.vue";
import PaySuccess from "@/components/Manager/PaySuccess.vue";
import PayFail from "@/components/Manager/PayFail.vue";
import EmployeeCommutes from "@/components/Manager/EmployeeCommutes.vue";
import FindApply from "@/components/Manager/FindApply.vue";
import ManagerComplaint from "@/components/Manager/ManagerComplaint.vue";

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
    {
        path: "/manager/pay/success",
        name: "PaySuccess",
        component: PaySuccess,
        props: route => ({
            name: route.query.name,
            email: route.query.email,
            year: route.query.year,
            month: route.query.month,
            unpaid: route.query.unpaid,
            id:route.query.id
        })
    },
    {
        path: "/manager/pay/fail",
        name: "PayFail",
        component: PayFail,
    },
    {
        path: "/manager/commutes",
        name: "EmployeeCommutes",
        component: EmployeeCommutes,
    },
    {
        path: "/manager/applies",
        name: "FindApply",
        component: FindApply,
    },
    {
        path: "/manager/complaint",
        name: "ManagerComplaint",
        component: ManagerComplaint,
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


