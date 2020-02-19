import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {NavItem} from '../../models/nav-item';



@Injectable()
export class NavService {
  private navItems = [
    {label: 'Hot Tub', path: 'first', iconName: 'hot_tub'},
    {label: 'Beach', path: 'second', iconName: 'beach_access'},
    {label: 'Gym', path: 'third', iconName: 'fitness_center'},
    {label: 'Children', path: 'fake', iconName: 'child_friendly'},
    {label: 'Child Care', path: 'fake', iconName: 'child_care'},
    {label: 'Golf', path: 'fake', iconName: 'golf_course'},
    {label: 'Spa', path: 'fake', iconName: 'spa'},
    {label: 'Pool', path: 'fake', iconName: 'pool'},
    {label: 'Service', path: 'fake', iconName: 'room_service'},
    {label: 'Casino', path: 'fake', iconName: 'casino'},
    {label: 'Business', path: 'fake', iconName: 'business_center'},
    {label: 'Coffee', path: 'fake', iconName: 'free_breakfast'}
  ];

  getNavItems(): Observable<NavItem[]> {
    return of(this.navItems);
  }
}
