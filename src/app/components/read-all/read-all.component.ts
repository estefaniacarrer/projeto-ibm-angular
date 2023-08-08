import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../models/reserva';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {

  list: Reserva[] = [];
  novaReserva: Reserva = {
    nomeHospede: '',
    dataInicio: new Date(),
    dataFim: new Date(),
    quantidadePessoas: ''
  };
  isReservaSaved: boolean = false;
  isReservaCanceled = false;
  idReservaBusca: number | undefined;
  isEditing: boolean = false;


  constructor(private service: ReservaService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.list = resposta;
    });
  }

  criarReserva(): void {
    this.service.create(this.novaReserva).subscribe(() => {
      this.isReservaSaved = true;
      this.limparFormulario();
      setTimeout(() => {
        this.isReservaSaved = false;
      }, 3000);
    });
  }

  limparFormulario(): void {
    this.novaReserva.nomeHospede = '';
    this.novaReserva.dataInicio = new Date();
    this.novaReserva.dataFim = new Date();
    this.novaReserva.quantidadePessoas = '';
  }

  atualizarLista(): void {
    this.findAll();
  }

  cancelarReserva(item: Reserva): void {
    item.status = 'CANCELADA';
    this.service.atualizarReserva(item).subscribe(() => {
      this.isReservaCanceled = true;
      setTimeout(() => {
        this.isReservaCanceled = false;
      }, 5000);
    });
  }

  buscarReserva(): void {
    if (this.idReservaBusca !== undefined) {
      this.service.buscarPorId(this.idReservaBusca).subscribe((reservaEncontrada) => {
        this.list = [reservaEncontrada];
      }, (error) => {
        console.error(error);
        this.list = [];
      });
    }
  }

  editarReserva(item: Reserva): void {
    this.isEditing = true;
  }

  atualizarReserva(item: Reserva): void {
    this.service.atualizarReserva(item).subscribe(() => {
      this.isEditing = false;
    });
  }

  cancelarEdicao(item: Reserva): void {
    this.isEditing = false;
  }
}


