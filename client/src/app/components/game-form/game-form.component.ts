import { Component, HostBinding, OnInit } from '@angular/core';
import { Game } from 'src/app/models/Game';

import Swal from 'sweetalert2'

import { GamesService } from '../../services/games.service';
import {  ActivatedRoute, Router  } from '@angular/router'


@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };

  edit: boolean = false;
  

  constructor(private gameService: GamesService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;

    if(params.id){
      this.gameService.getGame(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.game = res;
            this.edit = true;
          },
          err=> console.log(err)
        )
    }
    
  }

  saveNewGame() {
    this.gameService.saveGame(this.game)
    .subscribe(
      res => {
        console.log(res);        
        this.router.navigate(['/games']);
      },
      err => console.error()
      
    )
  }

  updateGame(){
    const params = this.activedRoute.snapshot.params;
    this.gameService.updateGame(params.id, this.game)
        .subscribe(
          res=>{
            console.log(res);            
            this.router.navigate(['/games']);
          },
          err=> console.log(err)
        )
  }


  updateSwalGame(){
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        this.updateGame();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


  SaveNewGameSwal(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your game has been saved',
      showConfirmButton: false,
      timer: 1500
    }),
    this.saveNewGame();
  }


  

}




