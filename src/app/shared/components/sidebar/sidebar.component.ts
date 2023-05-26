import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private gifsService:GifsService) { }
  get tags():string[]{
    return this.gifsService.tagHistory;
  }
  searchTag(tag:string):void{
    return this.gifsService.searchTag(tag);
  }
  ngOnInit() {
  }

}

