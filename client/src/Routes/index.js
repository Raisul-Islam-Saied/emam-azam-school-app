import { lazy } from "react";

import SeeResults from "../components/Admin/SeeResults";
import PublishResult from "../components/Admin/PublishResult";
import AddStudent from "../components/Admin/AddStudent";
import StudentInfo from "../components/Admin/StudentInfo";
import AddSyllabus from "../components/Admin/AddSyllabus";
import SeeSyllabus from "../components/Admin/SeeSyllabus";
import AddTeacher from "../components/Admin/AddTeacher";
import Support from "../components/Support";

const AddResult = lazy(() => import("../components/Admin/AddResult"));
const Home = lazy(() => import("../components/Home"))
const Login = lazy(() => import("../Pages/Login"))
const Result = lazy(() => import("../Pages/Result"))
const ClassRoutine = lazy(() => import("../Pages/ClassRoutine"))
const coreRoute = [
    {
        path: '/',
        title: 'Home',
        component: Home,
    },
    {
        path: '/result',
        title: 'Result',
        component: Result,
    }, {
        path: '/routine',
        title: 'Routine',
        component: ClassRoutine,
    }, {
        path: '/support',
        title: 'Support',
        component: Support,
    },
    {
        path: '/login',
        title: 'Routine',
        component: Login,
    },
];
const admin = [
    {
        path: '/result/add_results',
        title: 'Add Results',
        component: AddResult,
    },
    {
        path: '/result/see_results',
        title: 'See Results',
        component: SeeResults,
    },
    {
        path: '/result/publish_results',
        title: 'See Results',
        component: PublishResult,
    },
    {
        path: '/student/add_student',
        title: 'add student',
        component: AddStudent,
    }, {
        path: '/teacher/add_teacher',
        title: 'add teacher',
        component: AddTeacher,
    },
    {
        path: '/student/student_info',
        title: 'student_info',
        component: StudentInfo,
    },
    {
        path: '/syllabus/add_syllabus',
        title: 'add syllabus',
        component: AddSyllabus,
    }, {
        path: '/syllabus/see_syllabus',
        title: 'add syllabus',
        component: SeeSyllabus,
    },

];

const adminRoutes = [...admin];
const routes = [...coreRoute]
export { adminRoutes, routes }
