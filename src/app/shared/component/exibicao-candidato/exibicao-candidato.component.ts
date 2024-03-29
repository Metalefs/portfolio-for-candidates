import { Component, OnInit, ViewChild, ElementRef,Input } from '@angular/core';
import { CandidatoService } from 'src/app/data/service/domain/CandidatoService';
import { ServicoRedesSociais } from 'src/app/data/service/ServicoRedesSociais';
import * as CaminhoHelper from 'src/app/_helpers/caminho_helper';
import { Candidato } from 'src/app/data/schema/domain';
import { TipoImagem } from 'src/app/data/schema/TipoImagem';
import { fade, slide } from 'src/app/animations';
import { RedeSocial } from 'src/app/data/schema/RedeSocial';
import { of } from 'rxjs';

@Component({
  selector: 'app-exibicao-candidato',
  templateUrl: './exibicao-candidato.component.html',
  styleUrls: ['./exibicao-candidato.component.css'],
  animations: [fade,slide]
})
export class ExibicaoCandidatoComponent implements OnInit {
  @Input()
  isBg:boolean = false;
  constructor( private CandidatoService: CandidatoService,
    private ServicoRedesSociais:ServicoRedesSociais) { 
    this.candidato_bg = CaminhoHelper.CaminhoImagemCandidato(TipoImagem.Capa);
  }
  
  @ViewChild('canvasEl') canvasEl: ElementRef;
  @ViewChild('MobilecanvasEl') MobilecanvasEl: ElementRef;
  @ViewChild('canvasContainer') container: ElementRef;
  private c: CanvasRenderingContext2D;
  candidato_bg:string;
  @Input()
  Candidato:Candidato;
  nome = "";
  redes: RedeSocial[] = [];
  ObterNomeCandidato(){
    return this.Candidato.nome;
  }
  ObterCaminhoIconePartido(){
    return CaminhoHelper.ObterCaminhoIconePartido();
  }
  ObterCaminhoIconeConectaCandidato(){
    return CaminhoHelper.ObterCaminhoIconeConectaCandidato();
  }
  ngOnInit(): void {
    this.CandidatoService.Ler().subscribe(x=>{
      this.Candidato=x;
      this.nome = this.Candidato.nome;
      this.redes = this.ServicoRedesSociais.GetAllRedesSociais(this.Candidato);
    })
  }

  ngAfterViewInit() {
    this.canvasDot();
    this.startCanvasAnimation();
  }

  startCanvasAnimation(){
    this.c = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
        
    let x;
    let y;

    (this.canvasEl.nativeElement as HTMLCanvasElement).height = (this.container.nativeElement as HTMLDivElement).offsetHeight;
    (this.canvasEl.nativeElement as HTMLCanvasElement).width  = (this.container.nativeElement as HTMLDivElement).clientWidth;

    const draw = (c) => {

        // earth color scheme
        var earth = [
            'rgba(0, 38, 28, x)',
            // 'rgba(4, 76, 41, x)',
            // 'rgba(22, 127, 57, x)',
            // 'rgba(69, 191, 85, x)',
            // 'rgba(150, 237, 137, x)',
            'rgba(255,255,255, x)'
        ];

        // fire color scheme
        var fire = [
            'rgba(242, 193, 102, x)',
            // 'rgba(242, 134, 39, x)',
            // 'rgba(217, 63, 7, x)',
            // 'rgba(140, 29, 4, x)',
            // 'rgba(65, 15, 4, x)',
            'rgba(255,255,255, x)'
        ];

        // water color scheme
        var water = [
            'rgba(0, 48, 90, x)',
            // 'rgba(0, 75, 141, x)',
            // 'rgba(0, 116, 217, x)',
            // 'rgba(65, 147, 217, x)',
            // 'rgba(122, 186, 242, x)',
            'rgba(255,255,255, x)'
        ];

        // collection of earth, fire and water
        var colorArray = [earth, fire, water];

        // current color accessor
        var colors = colorArray[0];

        function Circle(x, y, vx, vy, r, growth,c) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.r = r;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = 1;

            this.draw = function () {
                c.beginPath();
                c.strokeStyle = this.color.replace('x', + this.alpha);
                c.arc(this.x, this.y, this.r, Math.PI * 2, false);
                c.lineWidth = 2;
                c.stroke();
                c.fillStyle = 'transparent';
                c.fillStyle = this.color.replace('x', + this.alpha);
                c.fill();
            }

            this.update = function () {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > c.width) this.vx *= -this.vx;
                if (this.y < 0 || this.y > c.height) this.vy *= -this.vy;

                this.alpha -= 0.0015;
                if(r< 50)
                this.r += growth;
                this.draw();
            }
        }

        // array of circles
        var circles = [];

        // mouse position
        var mouse = {
            x: undefined,
            y: undefined
        };

        // on mousemovement, update coordinates of mouse
      

        // change color scheme on click and rotate colorArray
        window.addEventListener('click', function () {
            colorArray.push(colorArray.shift());
            colors = colorArray[0];
            var vx = (Math.random() - 0.5) * 10 + (Math.random() < 0.5 ? -2 : 12);
            var vy = (Math.random() - 0.5) * 10 + (Math.random() < 0.5 ? -2 : 12);
            let r = 1;
            let g = 2;
            circles.push(new Circle(mouse.x, mouse.y, vx, vy, r, g, c));
        });

        // ensure canvas is always full size of browser window
        // window.addEventListener('resize', function () {
        //   (this.canvasEl.nativeElement as HTMLCanvasElement).width = innerWidth;

        // });
        window.addEventListener("mousemove", (evt) => {
            mouse.x = evt.x;
            mouse.y = evt.y;
        });

        function animate() {
            window.requestAnimationFrame(animate);
            c.clearRect(0, 0, innerWidth, innerHeight);

            var vx = (Math.random() - 0.5) * 5 + (Math.random() < 0.5 ? -2 : 2);
            var vy = (Math.random() - 0.5) * 5 + (Math.random() < 0.5 ? -2 : 2);


            if (x < 0 || x > c.width) vx = -vx;
            if (y < 0 || y > c.height) vy = -vy;

            // var r = Math.random() * 20 + 30;
            // if(r > 0)
            // circles.push(new Circle(mouse.x, mouse.y, vx, vy, r, 0.5, c));

            for (let i = 0; i < circles.length; ++i) {
                circles[i].update();
                // remove the circle if it is transparent or too small
                if (
                    circles[i].alpha < 0 ||
                    circles[i].r < 3 ||
                    circles.length > 50
                   ) {
                    circles.splice(i, 1);
                }
            }
          
        }

        animate();

    };
    draw(this.c);
  }
 
  canvasDot(){
    if(this.MobilecanvasEl == undefined)
      return
    (this.MobilecanvasEl.nativeElement as HTMLCanvasElement).height = (this.container.nativeElement as HTMLDivElement).offsetHeight;
    (this.MobilecanvasEl.nativeElement as HTMLCanvasElement).width  = (this.container.nativeElement as HTMLDivElement).clientWidth;
    
    let ctx = (this.MobilecanvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    let canvas = (this.MobilecanvasEl.nativeElement as HTMLCanvasElement);    
    //let x;
    let y;
        
    var stars = [], // Array that contains the stars
    FPS = 60, // Frames per second
    x = 15, // Number of stars
    mouse = {
      x: 0,
      y: 0
    };  // mouse location

    // Push stars to array

    for (var i = 0; i < x; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 1,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25
      });
    }

    // Draw the scene

    function draw() {
      ctx.clearRect(0,0,canvas.width,canvas.height);

      ctx.globalCompositeOperation = "lighter";

      for (var i = 0, x = stars.length; i < x; i++) {
        var s = stars[i];

        ctx.fillStyle = "rgba(255,255,255,.5)";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.stroke();
      }

      ctx.beginPath();
      for (var i = 0, x = stars.length; i < x; i++) {
        var starI = stars[i];
        ctx.moveTo(starI.x,starI.y); 
        if(distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
        for (var j = 0, x = stars.length; j < x; j++) {
          var starII = stars[j];
          if(distance(starI, starII) < 150) {
            //ctx.globalAlpha = (1 / 150 * distance(starI, starII).toFixed(1));
            ctx.lineTo(starII.x,starII.y); 
          }
        }
      }
      ctx.lineWidth = 0.05;
      ctx.strokeStyle = 'white';
      ctx.stroke();
    }

    function distance( point1, point2 ){
      var xs = 0;
      var ys = 0;

      xs = point2.x - point1.x;
      xs = xs * xs;

      ys = point2.y - point1.y;
      ys = ys * ys;

      return Math.sqrt( xs + ys );
    }

    // Update star locations

    function update() {
      for (var i = 0, x = stars.length; i < x; i++) {
        var s = stars[i];

        s.x += s.vx / FPS;
        s.y += s.vy / FPS;

        if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
        if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
      }
    }

    canvas.addEventListener('mousemove', function(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    });

    // Update and draw

    function tick() {
      draw();
      update();
      requestAnimationFrame(tick);
    }

    tick();
  }

}
