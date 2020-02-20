import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ArtistInterface } from '../../models/artist';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) {
    this.artistsCollection = afs.collection<ArtistInterface>('Artists');
    this.artists = this.artistsCollection.valueChanges();
   }
  private artistsCollection: AngularFirestoreCollection<ArtistInterface>;
  private artists: Observable<ArtistInterface[]>;
  private artistDoc: AngularFirestoreDocument<ArtistInterface>;
  private artist: Observable<ArtistInterface>;
  public selectedArtist: ArtistInterface = {
    id: null
  };
  getAllArtists() {
    return this.artists = this.artistsCollection.snapshotChanges()
    .pipe(map( changes => {
      return changes.map ( action => {
        const data = action.payload.doc.data() as ArtistInterface;
        data.id = action.payload.doc.id;
        return data;
      })
    }));
  }
  
  getOneArtist(idArtist: string){
    this.artistDoc = this.afs.doc<ArtistInterface>(`Artists/${idArtist}`);
    return this.artist = this.artistDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as ArtistInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addArtist(artist: ArtistInterface){
    this.artistsCollection.add(artist);
  }
  updateArtist(artist: ArtistInterface){
    let idArtist = artist.id;
    this.artistDoc = this.afs.doc<ArtistInterface>(`Artists/${idArtist}`);
    this.artistDoc.update(artist);
  }
  deleteArtist(idArtist: string){
    this.artistDoc = this.afs.doc<ArtistInterface>(`Artists/${idArtist}`);
    this.artistDoc.delete();
  }
}
