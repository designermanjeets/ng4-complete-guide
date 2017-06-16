import { DataStorageService } from './shared/data-storage.service';
import { Secrets } from './secret';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedFeature = 'recipe';

  constructor(private dsService: DataStorageService) {}

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit() {
    firebase.initializeApp(Secrets.FIREBASE_INIT);
  }
}
