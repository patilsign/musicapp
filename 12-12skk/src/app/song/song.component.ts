import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import {getReview, getSongs } from '../service.constants';

import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  songs: any= [];
  editSong:any={};
  currentSong: any;
  baseUrl = 'https://server-gubzsieuew.now.sh';
  //baseUrl = 'https://files-ojakghlutp.now.sh';

  constructor(private http: HttpClient,private global:GlobalService) {
    // console.log ('environment:', env);
    this.getAll();
  }

  ngOnInit(){
  }
  getAll() {
    // this.http.get(`${this.baseUrl}/songs`)
    //   .subscribe(result => this.songs = result)
    
    
    this.global.song(getSongs).subscribe(
      songs => {
        console.log(songs,'res===',getSongs);
        this.songs = songs
      },
      err => {
          alert('Error occurred. Try again later');
          console.log(err);
      }
    );
  }

  setActiveHandler(song) {
    console.log(song,'song edit')
    this.currentSong = Object.assign({}, song);
    this.global.song(`${getReview}/${song._id}`).subscribe(
      songs => {
        console.log(songs,'res===77',getSongs);
        this.editSong=songs[0];
       // this.songs = songs
      },
      err => {
          alert('Error occurred. Try again later');
          console.log(err);
      }
    );
  }

  save(form: NgForm) {
    if (this.currentSong.id) {
      this.edit(form.value);
    } else {
      this.add(form.value);
      form.reset();
    }
  }

  add(song) {
    this.global.postData(getSongs,song)
      .subscribe(res => {
        console.log(res,'song post res');
        this.songs.push(res)
        this.reset();
      })
  }

  edit(song) {
    // const newDevice = Object.assign(
    //   {},
    //   this.currentSong,
    //   song
    // );
    console.log(song,'song 68s')
    this.global.song(`${getReview}/${song._id}`).subscribe(
      songs => {
        console.log(songs,'res===77',getSongs);
        this.songs = songs
      },
      err => {
          alert('Error occurred. Try again later');
          console.log(err);
      }
    );
    // this.http.patch(`${this.baseUrl}/songs/${newDevice.id}`, newDevice )
    //   .subscribe(
    //     res => {
    //       const index = this.songs.findIndex(d => d.id === newDevice.id) ;
    //       this.songs[index] = newDevice;
    //     }
    //   )
  }

  delete(device) {
    this.http.delete<any>(`${this.baseUrl}/songs/${device.id}`)
      .subscribe(
        () => {
          const index = this.songs.indexOf(device)
          this.songs.splice(index, 1);
          this.reset();
        }
      )
  }

  reset() {
    this.currentSong = {};
  }


}
