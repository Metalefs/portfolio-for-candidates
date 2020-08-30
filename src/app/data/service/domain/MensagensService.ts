import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { routes } from 'src/app/data/schema/routes';
import { retry, catchError } from 'rxjs/operators';
import { RowActionService } from '@clr/angular/data/datagrid/providers/row-action-service';
import { AuthenticationService } from 'src/app/core/service/authentication/authentication.service';
import { StateService } from 'src/app/core/service/state/state.service';
import { ServicoBase } from 'src/app/data/service/domain/ServicoBase';
import { Mensagens } from 'src/app/data/schema/domain/Mensagens';

@Injectable({
    providedIn: 'root'
})

export class MensagensService extends ServicoBase {
    constructor(protected http: HttpClient, protected AuthenticationService: AuthenticationService, protected StateService: StateService) {
		super(http,StateService);
	}
    
    Ler(): Observable<Mensagens[]> {
        return this.http.get<Mensagens[]>(environment.endpoint + routes.Mensagens).pipe(
            retry(3), 
            catchError(this.handleError)
        );
    }
    
    ObterTeste(): Mensagens{
        return new Mensagens(
            1,
            'Yes, we can',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            // 'Barack Hussein Obama II é um advogado e político norte-americano que serviu como o 44.º presidente dos Estados Unidos de 2009 a 2017, sendo o primeiro afro-americano a ocupar o cargo. ',
            'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu. ',
            'Sobre',
            'Quer me fazer uma pergunta?',
            'Obama foi eleito para o segundo mandato em 6 de novembro de 2012, derrotando o concorrente republicano Mitt Romney com 65.9 milhões de votos populares e 332 votos eleitorais, citando seus objetivos para o segundo mandato em seu discurso de vitória.',
            'Projetos que desenvolvi'
        );
    }

	Incluir(item: Mensagens): Observable<any> {
        return this.http.post<Mensagens>(environment.endpoint + routes.Gerenciamento + routes.Mensagens, {}).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    Editar(item: Mensagens): any {
        let payload = this.AuthenticationService.tokenize({Mensagens:item});
        console.log(payload);
        return this.http.put<Mensagens>(environment.endpoint + routes.Gerenciamento + routes.Mensagens,
            payload).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }
	
    Remover(id: string): Observable<any>{
        return this.http.delete<Mensagens>(environment.endpoint + routes.Gerenciamento + routes.Mensagens).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }	

    handleError(error) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // this.StateService.currentState.subscribe(x=>{
		// 	x.Funcional = false;
		// 	x.Mensagem  = errorMessage;
		// });
        return throwError(errorMessage);
    }
}