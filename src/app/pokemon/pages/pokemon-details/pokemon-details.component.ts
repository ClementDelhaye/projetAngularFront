import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Observable } from 'rxjs';
import { Pokemon } from '../../models/pokemon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.sass']
})
export class PokemonDetailsComponent implements OnInit {
  pokemonId: number;
  pokemon: Observable<Pokemon>;
  constructor(private route: ActivatedRoute, private pokemonService: PokemonService, private router: ActivatedRoute, private location: Location){
    route.params.subscribe(params =>{
      this.pokemonId = params['id'];
    });

    this.pokemonId = +this.router.snapshot.paramMap.get('id') as number;
  }
  ngOnInit(): void{
    if(this.pokemonId){
      this.pokemon = this.pokemonService.getById(this.pokemonId);
    }
  }
  goBack(){
    this.location.back();
  }

  showReceivedValue(value: boolean){
    console.log(value);
  }
}
