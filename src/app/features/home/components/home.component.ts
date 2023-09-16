import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map, of, take, tap } from 'rxjs';
import { OlympicService } from 'src/app/shared/services/olympic.service';
import { LegendPosition} from '@swimlane/ngx-charts';
import { Color } from '../../../shared/models/color.model';
import { ColorService } from 'src/app/shared/services/colors.service';
import { Router } from '@angular/router';
import { OlympicCountry } from 'src/app/shared/models/olympic-country.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<OlympicCountry[]> = of([]);
  olympicsSubscribe! : Subscription
  numberOfJO: number = 0;
  view: number[] = [700, 400];
  tabChartOlympics! : object[]
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Right;
  colorScheme! : Color;
          

  constructor(private olympicService: OlympicService,
     private colorService : ColorService,
     private router: Router) {}

  ngOnDestroy(): void {
    if (this.olympicsSubscribe)
      this.olympicsSubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.view = [window.innerWidth, 400]
    this.olympicsSubscribe = this.olympicService.getOlympics().pipe(
      take(2),
      tap(tabOlympics => {
        if (tabOlympics){
          this.numberOfJO = this.olympicService.getNumberOfJO(tabOlympics)
          let tabObjectOlympics : Object[] = []
          tabOlympics.forEach((olympicCountry : OlympicCountry) => {
            let nb = 0;
            olympicCountry.participations.forEach(participation =>{
              nb += participation.medalsCount
            })
            const olympicsChart : { name : string, value : number} = {
              name : olympicCountry.country,
              value : nb,
            }
            tabObjectOlympics.push(olympicsChart)
          })
          this.tabChartOlympics = tabObjectOlympics;
          this.colorScheme = {
            domain: this.colorService.getNbColorRandom(this.tabChartOlympics?.length)
          };
        }
      })
      ).subscribe()  
  }
  onSelect(data : {name: string} ): void {
    this.router.navigateByUrl(`/detail/${data.name}`)
  }

  onResize(event : Event): void {
    const target = event.target as Window
    const width = target.innerWidth
    this.view = [width , 400 ]
  }
  public myLabelFormatter(label: string ) : string {
    return label.toUpperCase();
 }
}
