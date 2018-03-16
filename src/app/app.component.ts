import { Component } from '@angular/core';
import { OrganizationService } from './organization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string;
  address: string;
  currentAccountIsOrganizationOwner: boolean;

  constructor(private organizationService: OrganizationService) {
    // this.organizationService.getOrganization().then(x => x.name()).then(x => this.title = x); // TODO pobierać z bazy
    this.organizationService.getOrganization().then(x => this.address = x.address);
    this.organizationService.currentAccountIsOrganizationOwner().then(x => this.currentAccountIsOrganizationOwner = x);
  }
}
