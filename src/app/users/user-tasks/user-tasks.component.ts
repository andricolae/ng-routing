import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})

export class UserTasksComponent implements OnInit {
  userName= input.required<string>();;
  message = input.required<string>();
  // userId = input.required<string>();
  // private userService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  // userName = computed(()=> this.userService.users.find(user => user.id === this.userId())?.name);
  // private destroyRedf = inject(DestroyRef);
  // ngOnInit(): void {
  //   console.log('input data:' + this.message());
  //   console.log(this.activatedRoute.snapshot);
  //   console.log(this.activatedRoute.snapshot.paramMap.get('userId'));
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paraMap) => {
  //       this.userName = this.userService.users.find((u)=> u.id === paraMap.get('userId'))?.name || '';
  //     }
  //   });
  //   this.destroyRedf.onDestroy(() => subscription.unsubscribe());
  // }

  private activatedRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        console.log(data);
      }
    })
  }
}

export const resolveUsername: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const userService = inject(UsersService)
  const userName = userService.users.find((u)=> u.id === activatedRoute.paramMap.get('userId'))?.name || '';

  return userName;
}

export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  routerState ) => {
    return resolveUsername(activatedRoute, routerState) + '\'s tasks';
  }
