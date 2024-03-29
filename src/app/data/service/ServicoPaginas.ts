import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { OpcaoNavbarFA } from 'src/app/data/schema/OpcoesNavbar';
import { faHome, faRss, faTasks, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faRProject } from '@fortawesome/free-brands-svg-icons';


@Injectable({
    providedIn: 'root'
})

export class ServicoPaginas{
    constructor(){
		
	}

    GetAllPages(): OpcaoNavbarFA[] {
      return [
          new OpcaoNavbarFA("Inicio","/inicio",faHome,["inicio"]),
          new OpcaoNavbarFA("Biografia","/biografia",faAddressCard,["biografia"]),
          new OpcaoNavbarFA("Propostas","/propostas",faTasks,["propostas","projeto"]),
          new OpcaoNavbarFA("Feed","/feed",faRss,["feed"])
        ]
    }
	
	
}