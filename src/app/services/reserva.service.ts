import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

   findAll(): Observable<Reserva[]> {
     return this.http.get<Reserva[]>(this.baseUrl);
  }

  create(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.baseUrl, reserva);
  }

  atualizarReserva(reserva: Reserva): Observable<Reserva> {
    const url = `${this.baseUrl}/${reserva.id}`;
    return this.http.put<Reserva>(url, reserva);
  }

  buscarPorId(id: number): Observable<Reserva> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Reserva>(url);
  }

}
