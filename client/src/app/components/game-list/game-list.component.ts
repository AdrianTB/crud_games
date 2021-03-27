import { Component, Host, HostBinding, OnInit } from '@angular/core';

import { GamesService } from '../../services/games.service'
import { HttpClientModule } from '@angular/common/http'

import Swal from 'sweetalert2'

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',  
  styleUrls: ['./game-list.component.css']
})


export class GameListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  games: any = [];

  constructor(private gamesservice: GamesService, private http: HttpClientModule) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(){
    this.gamesservice.getGames().subscribe(
      res => {
        this.games = res;
      },
      err => console.error(err)
    );
  }

  deleteGame(id: string){

    this.gamesservice.deleteGame(id)
        .subscribe(
          res => {
            this.getGames();            
          }
        );
  }

  deleteGameSwal(id: string){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ),
        this.deleteGame(id);
      }
    })

  }




}
