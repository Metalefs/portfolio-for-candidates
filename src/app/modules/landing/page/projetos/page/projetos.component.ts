import { Component, OnInit } from '@angular/core';
import { MensagensService } from 'src/app/data/service/domain/MensagensService';
import { Mensagens } from 'src/app/data/schema/domain/Mensagens';
import { ProjetoService } from 'src/app/data/service/domain/ProjetoService';

import { AuthenticationService } from 'src/app/core/service/authentication/authentication.service';
import { Lightbox } from 'ngx-lightbox';


import { fade } from 'src/app/animations';
import { Projeto } from 'src/app/data/schema/domain/Projeto';
import { LightboxEvent, LIGHTBOX_EVENT } from 'ngx-lightbox';

@Component({
  selector: 'projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {

  constructor(private MensagensService: MensagensService,
     private ProjetoService:ProjetoService, private Lightbox:Lightbox) {

	  //   this.ProjetoService.Ler().subscribe(x => {
    //       this.Projetos = x;
    //       x.forEach(p=>{

    //           const album = {
    //             src: p.FotoSrc,
    //             caption: p.Nome,
    //             thumb: p.Descricao
    //           };
          
    //         this._albums.push(album);
    //         console.log(this._albums);
            
    //       })
    // });
    this.Projetos = this.ProjetoService.ObterTeste();
    this.Projetos.forEach(p=>{

          const album = {
            src: p.FotoSrc,
            caption: p.Nome,
            thumb: p.Descricao
          };
      
        this._albums.push(album);
        console.log(this._albums);
        
    });
	  this.Mensagens = this.MensagensService.ObterTeste();//this.MensagensService.Ler().subscribe(x => this.Mensagens = x[0]);
  }
  Projetos:Projeto[] = [];
  _albums:Array<Album> = [];
  Mensagens:Mensagens;
  open(index: number): void {

    this.Lightbox.open(this._albums, index);
  }
  ngOnInit(): void {

  }

}
interface Album{
    src: string;
    caption: string;
    thumb: string;
}