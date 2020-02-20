import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/api/data-api.service';
import { NgForm } from '@angular/forms';
import { ArtistInterface } from 'src/app/models/artist';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  public artists = [];
  public artist = '';
  ngOnInit() {
    this.dataApi.getAllArtists().subscribe( artists => {
      this.artists = artists;
    })
  }

  onDeleteArtist(idArtist: string) {
    const confirmacion = confirm('¿Estás seguro de eliminarlo?');
    if(confirmacion)
      this.dataApi.deleteArtist(idArtist);
  }

  onPreUpdateArtist(artist: ArtistInterface) {
    this.dataApi.selectedArtist = Object.assign({}, artist)
  }

}
