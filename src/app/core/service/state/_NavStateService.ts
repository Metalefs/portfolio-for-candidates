import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EstadoNav } from 'src/app/data/schema/EstadoNav';

@Injectable({ providedIn: 'root' })
export class NavStateService {
    private EstadoNav: BehaviorSubject<EstadoNav[]>;
    public currentState: Observable<EstadoNav[]>;

    constructor(private http: HttpClient) {
        if(localStorage.getItem('EstadoNav'))
            this.EstadoNav = new BehaviorSubject<EstadoNav[]>(JSON.parse(localStorage.getItem('EstadoNav')));
        else
            this.EstadoNav = new BehaviorSubject<EstadoNav[]>(
                [
                    new EstadoNav(
                        "inicio",
                        false,
                        true,
                        true,
                    ),
                    new EstadoNav(
                        "biografia",
                        false,
                        false,
                        false,
                    ),
                    new EstadoNav(
                        "projetos",
                        false,
                        false,
                        false,
                    ),
                    new EstadoNav(
                        "feed",
                        false,
                        false,
                        false,
                    )
                ]
            );
        this.currentState = this.EstadoNav.asObservable();
    }

    public get currentStateValue(): EstadoNav[] {
        return this.EstadoNav.value;
    }
    
    async getActiveNav(): Promise<EstadoNav>{
        let self = this;
        return new Promise(function(resolve,reject) {
            if(self.EstadoNav != undefined) {
                self.EstadoNav.subscribe(x=>{
                    x.forEach(y=>{
                        if(y.is_active)
                        resolve(y)
                    })
                })  
            }
        })
    }

    async getNavState(pagina:string): Promise<EstadoNav>{
        let self = this;
        return new Promise(function(resolve,reject) {
            if(self.EstadoNav != undefined) {
                self.EstadoNav.subscribe(x=>{
                    let o = x.find(obj => {
                        return obj.pagina === pagina
                    });
                    resolve(o)
                })  
            }
        })
    }

    update(state : EstadoNav[]){
        if(state != undefined){
            localStorage.setItem('EstadoNav', JSON.stringify(state));
        }
    }

}