import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmedOrder } from '../../Payment/iorder-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  activeTab: string = 'all';
  allOrders: ConfirmedOrder[] = [];
  filteredOrders: ConfirmedOrder[] = [];
  isLoading: boolean = true;

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.getAllOrdersByUserID().subscribe({
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
          order.orderStatus.toLowerCase() === 'shipped' || 
          order.orderStatus.toLowerCase() === 'paymentreceived'
        );
        break;
      case 'delivered':
        this.filteredOrders = this.allOrders.filter(order => 
          order.orderStatus.toLowerCase() === 'delivered'
        );
        break;
      case 'canceled':
        this.filteredOrders = this.allOrders.filter(order => 
          order.orderStatus.toLowerCase() === 'canceled'
        );
        break;
      default:
        this.filteredOrders = [...this.allOrders];
    }
  }

  getStatusClass(status: string): string {
    const statusLower = status.toLowerCase();
    if (statusLower === 'paymentreceived') {
      return 'status-pending';
    }
    return `status-${statusLower}`;
  }

  canTrack(order: ConfirmedOrder): boolean {
    const trackableStatuses = ['shipped', 'paymentreceived'];
    return trackableStatuses.includes(order.orderStatus.toLowerCase());
  }

  canReorder(order: ConfirmedOrder): boolean {
    return order.orderStatus.toLowerCase() === 'delivered';
  }

  viewOrderDetails(orderId: number): void {
    this.router.navigate(['/order-details', orderId]);
  }

  trackOrder(orderId: number): void {
    this.router.navigate(['/track-order', orderId]);
  }

  reorder(order: ConfirmedOrder): void {
    // Implement reorder logic
    console.log('Reordering:', order.orderId);
    // This would typically add all items to cart
    // or navigate to a reorder confirmation page
  }
}