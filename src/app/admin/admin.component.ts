import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any[];

  constructor(private service: OrderService) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(response => {
        this.users = response.json().data;
        console.log(this.users);
      });
  }
}
