import { Component } from '@angular/core';
import { OrganizationService } from './organization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string;

  constructor(private organizationService: OrganizationService) {
    organizationService.getOrganization().then(x => x.name()).then(x => this.title = x);
  }
}
