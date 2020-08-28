import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicoPaginas } from 'src/app/data/service/ServicoPaginas';
import { ServicoRedesSociais } from 'src/app/data/service/ServicoRedesSociais';
import { OpcaoNavbar } from 'src/app/data/schema/OpcoesNavbar';
import { RedeSocial } from 'src/app/data/schema/RedeSocial';
import { NavState } from '../content-layout/content-layout.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  constructor( private ServicoPaginas: ServicoPaginas, private ServicoRedesSociais: ServicoRedesSociais, ) { 
    
  }
  @Input()NavState:NavState;
  Subtitulo:string = "Portifólio do Nome Candidato";
  paginas: OpcaoNavbar[] = [];
  redesSociais: RedeSocial[] = [];
  Copyright:string = "@Conecta Candidato";
  
  ToggleNav(){
    this.NavState.open = this.NavState.open ? false : true;
  }

  ngOnInit(): void {
    this.paginas = this.ServicoPaginas.GetAllPages();
    this.redesSociais = this.ServicoRedesSociais.GetAllRedesSociais();
  }

}
