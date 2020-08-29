import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
declare let gtag: Function;

import { ScrollSpyService } from '@uniprank/ngx-scrollspy';
import { NavStateService } from 'src/app/core/service/state/_NavStateService';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';


import { AuthenticationService } from 'src/app/core/service/authentication/authentication.service';
import { fade, slider } from './animations';
import AOS from 'aos';
import { OpcaoNavbar } from 'src/app/data/schema/OpcoesNavbar';
import { Collections } from './data/schema/Collections';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fade
  ]
})

export class AppComponent implements OnInit, AfterViewInit {
  title = "";
  currentUser: Collections.User;
  public ActiveSection$: BehaviorSubject<{ id?: string; elementId?: string; nativeElement?: HTMLElement }> = new BehaviorSubject({});
  private _subscription: Subscription;
  OpcoesNavBar = [
    new OpcaoNavbar("Inicio", "", "Home")
  ];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    
    private _scrollSpyService: ScrollSpyService,
    private NavStateService:NavStateService
  ) {
      // this.router.events.subscribe(event => {
         // if(event instanceof NavigationEnd){
             // gtag('config', 'UA-175817845-1', 
                   // {
                     // 'page_path': event.urlAfterRedirects
                   // }
                  // );
          // }
       // });
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnInit(): void {
    AOS.init();
    // VARIABLES
    const magicalUnderlines = Array.from(document.querySelectorAll('.underline--magical'));

    const gradientAPI = 'https://gist.githubusercontent.com/wking-io/3e116c0e5675c8bcad8b5a6dc6ca5344/raw/4e783ce3ad0bcd98811c6531e40256b8feeb8fc8/gradient.json';

    // HELPER FUNCTIONS

    // 1. Get random number in range. Used to get random index from array.
    const randNumInRange = max => Math.floor(Math.random() * (max - 1));

    // 2. Merge two separate array values at the same index to 
    // be the same value in new array.
    const mergeArrays = (arrOne, arrTwo) => arrOne.
    map((item, i) => `${item} ${arrTwo[i]}`).
    join(', ');

    // 3. Curried function to add a background to array of elms
    const addBackground = elms => color => {
      elms.forEach(el => {
        el.style.backgroundImage = color;
      });
    };
    // 4. Function to get data from API
    const getData = async url => {
      const response = await fetch(url);
      const data = await response.json();
      return data.data;
    };

    // 5. Partial Application of addBackground to always apply 
    // background to the magicalUnderlines constant
    const addBackgroundToUnderlines = addBackground(magicalUnderlines);

    // GRADIENT FUNCTIONS

    // 1. Build CSS formatted linear-gradient from API data
    const buildGradient = obj => `linear-gradient(${obj.direction}, ${mergeArrays(obj.colors, obj.positions)})`;

    // 2. Get single gradient from data pulled in array and
    // apply single gradient to a callback function
    const applyGradient = async (url, callback) => {
      const data = await getData(url);
      const gradient = buildGradient(data[randNumInRange(data.length)]);
      callback(gradient);
    };

    // RESULT
    applyGradient(gradientAPI, addBackgroundToUnderlines);this._scrollSpyService.setOffset('window', 50);
    
    this._subscription = this._scrollSpyService.observe('window').subscribe(item => {
        if (item != null) {
            const _nextSection = {
                id: item.id,
                elementId: item.scrollElementId
            };
            this.setActiveSection(_nextSection);
            console.info(`ScrollSpyService: item:`, item);
        }
    });
  }

  ngOnDestroy() {
    if (this._subscription) {
        this._subscription.unsubscribe();
    }
  }

  setActiveSection(section: any): void {
    this.ActiveSection$.next(section);
    this.NavStateService.currentState.subscribe(y=>{
      console.log(y);
      y.forEach(x=>{
        if(x.pagina != section.id){
          x.is_active = false;
        }
        else{
          x.pagina = section.id;
          x.is_active = true;
          x.is_solid = true;
          console.log(x)
        }
      })
      this.NavStateService.update(y);
      
    }) 
  }

  ngAfterViewInit(){

  }

}
