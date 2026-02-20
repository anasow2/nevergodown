
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, map, startWith } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './src/app.component.html',
  imports: [RouterOutlet, CommonModule, BottomNavComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private router = inject(Router);

  private isUrlHidden(url: string): boolean {
    const hiddenRoutes = ['/new', '/chat', '/item'];
    return hiddenRoutes.some(route => url.startsWith(route));
  }

  private readonly isNavHidden: Signal<boolean> = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => this.isUrlHidden(event.urlAfterRedirects)),
      startWith(this.isUrlHidden(this.router.url))
    ),
    { requireSync: true }
  );

  readonly showBottomNav = computed(() => !this.isNavHidden());
}
