import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { AnalyticsEvents } from 'src/app/enums/analytics-events.enum';
import { EventsService } from 'src/app/services/events.service';
import { SettingsService, SettingsType } from 'src/app/services/settings.service';
import { Store } from 'src/app/stores/store';

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html'
})
export class WelcomeModalComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  public settings$: Observable<SettingsType>;

  constructor(
    private modalService: NgbModal,
    private settingsService: SettingsService,
    private eventsService: EventsService,
    private store: Store) { }

  ngOnInit() {
    this.settings$ = this.store.select('settings');

    // wait for settings to be ready and check if display needed
    this.settings$.pipe(
      filter(Boolean),
      first()
    ).subscribe(settings => {
      if (!settings.welcomeShown) {
        this.settingsService.updateSettings({ welcomeShown: true });

        this.modalService.open(this.modal, { backdrop: 'static', centered: true }).result.then(() => { }, () => { });
      }
    });
  }

  /**
   * Call the store to update the settings
   *
   * @param newValue
   * @param settingName
   */
  public settingsUpdated(settingNewValue: string, settingName: string) {
    this.settingsService.updateSettings({ [settingName]: settingNewValue });
  }

  public closeModal() {
    this.modalService.dismissAll();
    this.eventsService.analyticsEvents.next(AnalyticsEvents.APPLICATION_FIRST_LOAD);
  }
}
