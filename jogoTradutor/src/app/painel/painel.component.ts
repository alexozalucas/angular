import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frase-mock';
import { NumberSymbol } from '@angular/common';
import { Alert } from 'selenium-webdriver';


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES;
  public titulo: string = "Traduza a frase:";
  public resposta: string = '';
  public rodada: number = 0;
  public rodadaFrase: Frase;
  public progresso: number = 0;
  public tentativas: number = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizaRodada();
  }

  ngOnInit() {
  }


  // passa como parâmetro um Event, 
  atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  verificaResposta(): void {

    if (this.rodadaFrase.frasePtBr == this.resposta) {
      


      this.rodada++;

      if (this.rodada == 4) {
       
        this.encerrarJogo.emit('vitoria');

      }


      this.progresso = this.progresso + (100 / this.frases.length);
      this.atualizaRodada();

    } else {

      this.tentativas--
      if (this.tentativas == -1) {
       
        this.encerrarJogo.emit('derrota');

      }

    }

  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = '';

  }



}
