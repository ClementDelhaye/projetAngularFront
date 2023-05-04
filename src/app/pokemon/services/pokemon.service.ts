import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pokemon } from '../models/pokemon';
import { environment } from './../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }
  get() : Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(environment.iutApiBaseUrl+"/pokemons");
  }
  delete(id: number): Observable<string>{
    return this.http.delete<string>(environment.iutApiBaseUrl+"/pokemons/"+id);
  }
  update(pokemon: Pokemon): Observable<string>{
    return this.http.put<string>(environment.iutApiBaseUrl+"/pokemons/"+pokemon.id, pokemon);
  }

  create(pokemon: Pokemon): Observable<string>{
    return this.http.post<string>(environment.iutApiBaseUrl+"/pokemons", pokemon);
  }
  getById(id: number): Observable<Pokemon>{
    return this.http.get<Pokemon>(environment.iutApiBaseUrl+"/pokemons/"+id);
  }
}
