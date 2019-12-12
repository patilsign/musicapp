import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit {
  @Input()editSong:any;
  @Input()currentSong:any;

  constructor() { }

  ngOnInit() {
  }

}
