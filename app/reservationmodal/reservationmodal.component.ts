import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { DatePicker } from 'ui/date-picker';
import { TimePicker } from 'ui/time-picker';
import { ListPicker } from 'ui/list-picker';
import { Page } from 'ui/page';

@Component({
    moduleId: module.id,
    templateUrl: './reservationmodal.component.html'
})

export class ReservationModalComponent implements OnInit {
    guestArray=[1,2,3,4,5,6];
    guests: number;
    isDateTime: boolean = false;

    constructor(private params: ModalDialogParams,
        private page: Page) {

            if(params.context === "guest")
        }
}