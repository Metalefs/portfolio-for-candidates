import { Component, OnInit, NgModule } from '@angular/core';

import { Collections } from 'src/app/data/schema/Collections';
import { RedeSocial } from 'src/app/data/schema/RedeSocial';
import { Candidato } from 'src/app/data/schema/domain/Candidato';
import { CaminhoLogo } from 'src/app/_helpers/caminho_helper';
import { SobreService } from 'src/app/data/service/domain/SobreService';
import { InformacoesContatoService } from 'src/app/data/service/domain/InformacoesContatoService';
import { MensagensService } from 'src/app/data/service/domain/MensagensService';
import { CandidatoService } from 'src/app/data/service/domain/CandidatoService';

import { AuthenticationService } from 'src/app/core/service/authentication/authentication.service';
import { fade } from 'src/app/animations';
import { Mensagens } from 'src/app/data/schema/domain/Mensagens';

@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  animations:[fade]
})

export class InicioComponent implements OnInit {

  
  constructor(private SobreService: SobreService, 
    private InfoContatoService: InformacoesContatoService,
    private CandidatoService: CandidatoService,
    private MensagensService: MensagensService,
    private authenticationService: AuthenticationService,
	) 
	{ 
    this.CandidatoService.BuscarOuCriarCandidato();
	  this.MensagensService.Ler().subscribe(x => this.Mensagens = x[0]);
	  this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  
  loading = false;

  Sobre:Collections.Sobre;
  InformacaoContato:Collections.InformacoesContato;
  Mensagens:Mensagens;
  currentUser: Collections.User;

  Candidato: Candidato = new Candidato(
    1,
    "Nome candidato",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "Numero campanha",
    "/assets/imagens/fundos/inicio/President_Barack_Obama.jpg",
    true
  );

  async LerSobre(){
    
    this.SobreService.Ler().subscribe(data=>{
      this.Sobre = data[0];
    });
  }

  async LerInfoContato(){
   
    this.InfoContatoService.Ler().subscribe(data=>{
      this.InformacaoContato = data[0];
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.loading = true;
    // this.LerSobre();
    // this.LerInfoContato();
  }

}
