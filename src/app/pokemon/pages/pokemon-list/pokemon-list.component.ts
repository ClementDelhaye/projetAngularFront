import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { PokemonFormComponent } from '../../components/pokemon-form/pokemon-form.component';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit, OnDestroy{
  pokemons: Observable<Pokemon[]>;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private pokemonService: PokemonService, private dialog: MatDialog, private _snackBar: MatSnackBar , private router: Router){
    
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.pokemons = this.pokemonService.get();
  }

 displayedColumns: string[] = ['firstName', 'lastName', 'class', 'email', 'update', 'delete'];

 openPokemonForm(pokemon?: Pokemon) {
    const dialogRef = this.dialog.open(PokemonFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: pokemon ? false : true,
        pokemon: pokemon ? pokemon : undefined
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.fetchData();
        }
      });
  }
  
 delete(id: number){
  const ref = this.dialog.open(GenericPopupComponent, {
    data: {
      title: 'Confirmation de suppression',
      message: 'êtes-vous sûr de vouloir supprimer cet étudiant ?',
      typeMessage: 'none',
      yesButtonVisible: true,
      noButtonVisible: true,
      cancelButtonVisible: false,
      defaultButton: 'No',
      yesButtonLabel: 'Oui',
      noButtonLabel: 'Non',
    },
  })

  ref.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      if (result) {
        this.pokemonService.delete(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            this._snackBar.open(result, '', {
              duration: 2000,
              panelClass: ['bg-success']
            });
            this.fetchData();
          });
      }
    });
 }

 showPokemonDetails(pokemonId:number){
  this.router.navigate(['/pokemons/'+ pokemonId]);
 }
}
