import { Component, OnInit, Input } from '@angular/core';
import { StaticInjector } from '@angular/core/src/di/injector';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-rodada',
  templateUrl: './rodada.component.html',
  styleUrls: ['./rodada.component.css']
})
export class RodadaComponent implements OnInit {


  constructor() {

  }

  ngOnInit() {

  }


  // Variavel que ficara a palavra digitada
  @Input() public palavra: string;
  @Input() public letra: string = '';

  public tempo: number = 0;
  public contador: any;
  public Bloquear: boolean = true;
  public qtdLetras: number = 0;
  public qtdErros: number = 0;
  public qtdAcertos: number = 0;
  public marcacao: String = "";
  public recuperaLetras = "";



  // atualiza a palavra a ser advinhada.
  atualizaPalavra(palavra: Event): void {
    this.palavra = (<HTMLInputElement>palavra.target).value;
  }

  // retorna a letra 
  atualizaLetra(letra: Event): void {
    this.letra = (<HTMLInputElement>letra.target).value;
  }


  // INICIA A CONTAGEM DE TEMPO 
  ExetuarTempo(): void {
    // E AUTOMATICAMENTE JÁ SE INICIA O TIME 
    if (this.contador == undefined) {
      this.contador = setInterval(() => {
        this.tempo += 1;
        if (this.tempo == 20) {
          this.ZerarTempo();
        }
      }, 1000);
    }
  }

  //FUNÇÃO UTILIZADA PARA ZERAR O CONTADOR
  ZerarTempo(): void {
    this.tempo = 0;
    clearInterval(this.contador);
  }




  // EXECUTADO QUANDO O USUÁRIO CLICA NO BOTÃO COMEÇAR
  public IniciarJogo(): void {

    //BLOQUEIA PARA NÃO DIGITAR MAIS INFORMAÇÕES NO QUADRO DE PALAVRA
    this.Bloquear = false;

    //VERIFICA QUANTAS LETRAS TEM A PALAVRA
    this.qtdLetras = this.palavra.length;

    // FAZ UM LOOP PARA FORMAR OS ENCAIXES PARA AS LETRAS
    for (var cont = 0; cont < this.palavra.length; cont++) {
      if (cont == 0) {
        this.marcacao = this.marcacao + "__";
      } else {
        this.marcacao = this.marcacao + " __";
      }

    }
    //EXECUTO O METODO DE CONTAGEM DE TEMPO
    this.ExetuarTempo();
  }



  // BUSCA A LETRA / EXECUTADO PELO BOTÃO CHUTE 
  public BuscarLetras(): void {

    //VERIFICA SE NÃO POSSUI LETRA DIGITADA OU NÃO POSSUI NADA VINCULADO A LETRA
    if ((this.letra == '') || (this.letra == undefined) || (this.letra == ' ') || (this.recuperaLetras.indexOf(this.letra) >= 0)) {
      alert("Deve ser digitado uma letra ainda não utilizada para completar seu chute!");

    } else {
      
      this.recuperaLetras = this.letra + " - " + this.recuperaLetras ;

      var palavraArray = this.marcacao.split(" ");
      var verificaAcerto = 0;
      for (var cont = 0; cont < this.palavra.length; cont++) {

        if (this.palavra.charAt(cont) == this.letra) {

          palavraArray[cont] = this.letra;
          this.marcacao = palavraArray.toString();
          // SUBSTITUO AS , RETORNADAS PELO TOSTRIGN COM ESPAÇOS EM BRANCO.
          this.marcacao = this.marcacao.replace(/,/g, " ");
          verificaAcerto++;
        }


      }

      // Verifica se acertou no chute
      if(verificaAcerto > 0){
        this.qtdAcertos++;
      }else {
        this.qtdErros++;
      }

      // Setar a letra para ficar em branco
      this.letra = '';

      // Zera o tempo, Seta o contador para undefined e Executa o time novamente.
      this.ZerarTempo();
      this.contador = undefined;
      this.ExetuarTempo();
    }



  }







}
