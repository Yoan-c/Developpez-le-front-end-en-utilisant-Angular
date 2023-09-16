import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { OlympicService } from './shared/services/olympic.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  olympic$! : Subscription;

  constructor(private olympicService: OlympicService) {}
  ngOnDestroy(): void {
    if (this.olympic$)
      this.olympic$.unsubscribe();
  }

  ngOnInit(): void {
    this.olympic$ = this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }


}
