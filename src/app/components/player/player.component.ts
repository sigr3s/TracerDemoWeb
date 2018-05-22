import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import { Api } from '../../services/api';
import { AppService } from '../../services/appService';
import { Overlay } from 'ngx-modialog';
import { Modal } from '../../../../node_modules/ngx-modialog/plugins/bootstrap';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ObjNgFor',  pure: false })
export class ObjNgFor implements PipeTransform {
  transform(value: any, args: any[] = null): any {
      return Object.keys(value).map(key => Object.assign({ key }, value[key]));
  }
}
@Component({
    selector: 'Player',
    templateUrl: './player.component.html'

})
export class PlayerComponent {
    constructor(public _api: Api, public _appService: AppService, public _modal: Modal, private route: ActivatedRoute)
    {
        this.appService = _appService;
        this.stats = new Array<any>();
        this.champions = new Array<any>();

        this.route.params.subscribe( params => {
          this.summonerName = params["userName"];
          console.log(this.summonerName);
        });

        this.appService.UserLoaded.subscribe(data => {
            if (data == true)
                this.getPlayer();
        });

    }
    model: string;
    stats: Array<any>;
    champions: Array<any>;
    appService: AppService;
    teamName : string;
    summonerName : string;

    getPlayer() {
        this._api.GetSummoner(this.summonerName).subscribe(data => {
            this.stats = data.json()['tracerPlayer']['playerStats']['championStats'];
            console.log(this.stats);
            this.stats.forEach(element => {
              this.champions[element.championName] = element.stats;
            });
        });
    }

}
