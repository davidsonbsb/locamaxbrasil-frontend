import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { environment } from './../environments/environment.prod';


import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';


@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'Bravox Tecnologia';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService
  ) {
    this.titleService.setTitle(this.title);
    // iconSet singleton
    this.iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });

    this.getInfo();
  }

  getInfo() {

    let host = environment.host;

    let apiHost = host + '/' + environment.api;

    const data = {
      host: host,
      api: environment.api,
      apiHost: apiHost,
      release: environment.release,
      build: environment.build,
    }

    localStorage['host'] = data.host;
    localStorage['apiHost'] = data.apiHost;
    localStorage['build'] = data.build;
    localStorage['release'] = data.release;

}

}
