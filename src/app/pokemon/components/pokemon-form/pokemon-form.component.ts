import { PokemonService } from './../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PokemonFormData {
  isCreateForm: boolean;
  pokemon: Pokemon;
}

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  pokemonForm = this.fb.group({
    id: [0, [Validators.required]],
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    description: ['', [Validators.required]],
    poids: [0, [Validators.required]],
    taille: [0, [Validators.required]]
  });

  constructor(public dialogRef: MatDialogRef<PokemonFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PokemonFormData, private fb: FormBuilder, 
    private pokemonService : PokemonService, private _snackBar: MatSnackBar) {

      if(!data.isCreateForm){
        this.setPokemonForm(data.pokemon);
      }

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setPokemonForm(pokemon: Pokemon) {
    this.pokemonForm.setValue({
      id: pokemon.id,
      name: pokemon.name,
      type: pokemon.type,
      description: pokemon.description, 
      poids: pokemon.poids, 
      taille: pokemon.taille
    });
  }

  get title(){
    if(this.data.isCreateForm){
      return 'Formulaire de création';
    }
    return 'Formulaire de modification';
  }

  get submitBtnName(){
    if(this.data.isCreateForm){
      return 'Ajouter';
    }
    return 'Modifier';
  }

  onSubmit(){
    if(this.pokemonForm.valid){
      if(this.data.isCreateForm){
        this.pokemonForm.value.id = Date.now() + Math.random();
        this.pokemonService.create(this.pokemonForm.value as Pokemon)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this._snackBar.open(result, '', {
            duration: 2000,
            panelClass: ['bg-success']
          });

          this.dialogRef.close(true);
        });
      }else{
        this.pokemonService.update(this.pokemonForm.value as Pokemon)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this._snackBar.open(result, '', {
            duration: 2000,
            panelClass: ['bg-success']
          });
          this.dialogRef.close(true);
        });
      }
    }
  }
}
