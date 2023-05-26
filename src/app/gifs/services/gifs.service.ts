import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchReponse } from '../interfaces/gif.interfaces';


@Injectable({providedIn: 'root'})
export class GifsService {
  public gifList:Gif[]=[];
  private serviceUrl:string='https://api.giphy.com/v1/gifs';
  private apiKey:string='rEjfk9N8YpRdnQBdTLrlm1V62hn8YTej';

  constructor(private http:HttpClient) {
    this.loadLocalStorage();
   }
  private _tagHistory: string[]=[];
  get tagHistory(){
    return [...this._tagHistory];
  }
  private organizeHistory(tag: string){
    tag=tag.toLowerCase();

    if(this._tagHistory.includes(tag)){
      this._tagHistory=this._tagHistory.filter((oldTag)=> oldTag !==tag)
    }
    this._tagHistory.unshift(tag);
    this._tagHistory=this.tagHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagHistory));
  }
  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;
    this._tagHistory= JSON.parse(localStorage.getItem('history')!);

    if(this._tagHistory.length===0) return;
    this.searchTag(this._tagHistory[0]);

  }
  public searchTag(tag:string):void{
    console.log(tag.length);
    // debugger
    if (tag.length==0) return;
    const params= new HttpParams()
          .set('api_key',this.apiKey)
          .set('limit','10')
          .set('q',tag)
    this.organizeHistory(tag);
    this.http.get<SearchReponse>(`${this.serviceUrl}/search`,{params:params})
      .subscribe((resp)=>{
          console.log(resp.data);
          this.gifList=resp.data;
          console.log('gifs : ', this.gifList);


      });
    // this._tagHistory.unshift(tag);
    console.log(this.tagHistory);

  }
}
