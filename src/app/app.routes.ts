import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { TaskComponent } from "./tasks/task/task.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUsername, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { routes as userRoutes} from "./users/users.routes"
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) =>{
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if(shouldGetAccess < 1){
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,
        title:'No task selected'
    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        children: userRoutes,
        canMatch: [dummyCanMatch],
        data: {
            message: 'This is a child route',
        },
        resolve:{
            userName: resolveUsername
        },
        title: resolveTitle
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
];