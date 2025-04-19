import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmedOrder } from '../../Payment/iorder-dto';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule,FormsModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {
  activeTab: string = 'shipped';
  allOrders: ConfirmedOrder [] = [];
  filteredOrders: ConfirmedOrder[] = [];
  isLoading: boolean = true;

  constructor(private _OrderService:OrderService ) { }

  
  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this._OrderService.getAllOrdersByUserID().subscribe({
      next: (orders) => {
        this.allOrders = orders;
        this.filterOrders();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading orders:', err);
        this.isLoading = false;
      }
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.filterOrders();
  }

  filterOrders(): void {
    switch (this.activeTab) {
      case 'shipped':
        this.filteredOrders = this.allOrders.filter(order => 
          order.orderStatus === 'shipped' || order.orderStatus === 'PaymentReceived');
        break;
      case 'delivered':
        this.filteredOrders = this.allOrders.filter(order => 
          order.orderStatus === 'delivered');
        break;
      case 'canceled':
        this.filteredOrders = this.allOrders.filter(order => 
          order.orderStatus === 'canceled');
        break;
      default:
        this.filteredOrders = this.allOrders;
    }
  }




  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'shipped':
      case 'paymentreceived':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'canceled':
        return 'status-canceled';
      default:
        return 'status-default';
    }
  }
}
