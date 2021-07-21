import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userDetails: any;
  name: any;
  currentStats: any;
  loginTime: any;
  timeScene: any;
  currentDate: any = new Date(Date.now()).toLocaleString().split(',')[0]
  products: any;
  itemSelected:any;

  constructor(public gs: GlobalService, private router: Router) { }

  ngOnInit(): void {
    this.userDetails = localStorage.getItem('userDetails');
    this.userDetails = JSON.parse(this.userDetails);
    this.name = this.userDetails.user;
    this.fetchProduct();
    this.fetchDetails();
    interval(5000).subscribe(x => {
      this.fetchDetails()
    });
  }

  async fetchDetails() {
    try {
      let resp: any = await this.gs.post('tasks/todaysLog', {
        username: this.name,
        product: this.itemSelected
      });
      if (resp.statusCode == 200 && resp.statusMsg.toLowerCase() === "success") {
        this.currentStats = resp.data;
        if (this.currentStats.loginTime) {
          this.loginTime = moment(this.currentStats.loginTime).format('hh:mm A').split(" ")[0]
          this.timeScene = moment(this.currentStats.loginTime).format('hh:mm A').split(" ")[1]

        }
      }
    } catch (error) {
      console.log('[debug] > file: home.component.ts > line 24 > HomeComponent > fetchDetails > error', error)
    }
  }

  async fetchProduct() {
    try {
      let resp: any = await this.gs.post('tasks/get-user-products', {
        username: this.name
      });
      if (resp.statusCode == 200 && resp.statusMsg.toLowerCase() === "success") {
        this.products = resp.data;
        this.itemSelected = this.products[0]
      }
    } catch (error) {
      console.log('[debug] > file: home.component.ts > line 24 > HomeComponent > fetchDetails > error', error)
    }
  }

  logOut() {
    try {

      localStorage.removeItem('userDetails');
      this.router.navigate(['/login']);
      // let resp: any = await this.gs.post('tasks/todaysLog', {});
      // if (resp.statusCode == 200 && resp.statusMsg.toLowerCase() === "success") {
      //   this.currentStats = resp.data;
      //   console.log('[debug] > file: home.component.ts > line 28 > HomeComponent > fetchDetails > this.currentStats', this.currentStats)
      // }
    } catch (error) {
      console.log('[debug] > file: home.component.ts > line 24 > HomeComponent > fetchDetails > error', error)

    }
  }

}
