import { TipoImagem } from 'src/app/data/schema/TipoImagem';

export function CaminhoLogo(nomeLogo: string) : string {
    return `/assets/imagens/icones/${nomeLogo}_icon.png`;
} 

export function ObterCaminhoIconePartido() : string {
    return `/assets/imagens/icones/partido.png`;
} 
export function ObterCaminhoIconeConectaCandidato() : string {
    return `/assets/imagens/icones/Conecta_Candidato.jpg`;
} 
export function ObterCaminhoIconeCampanha() : string {
    return `/assets/imagens/icones/partido.png`;
} 
export function ObterImagemLogoCampanhaCandidato() : string {
    return `assets/imagens/icones/Gleisson_all_white.png`;
} 

export function CaminhoImagemCandidato(tipoImagem: TipoImagem) : string {
    switch(tipoImagem){
        case TipoImagem.Capa:
            return 'assets/imagens/inicio/Candidato-capa.jpg';
        case TipoImagem.PerfilDesktop:
            return 'assets/imagens/inicio/Candidato-perfil-desktop.jpg';
        case TipoImagem.PerfilMobile:
            return 'assets/imagens/inicio/Candidato-perfil-mobile.png';
    }
} 