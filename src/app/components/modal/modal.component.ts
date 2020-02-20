import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataApiService } from '../../services/api/data-api.service';
import { ArtistInterface } from '../../models/artist';
import { NgForm } from '@angular/forms';
import { Button } from 'protractor';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  @ViewChild('btnClose', {static: false}) btnClose: ElementRef;

  ngOnInit() {
  }

  onSaveArtist(artistForm: NgForm): void {
    if(artistForm.value.id == null) {
      //Nuevo artista
      this.dataApi.addArtist(artistForm.value);
    } else {
      //Modificar artista
      this.dataApi.updateArtist(artistForm.value);
    }
    artistForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}
