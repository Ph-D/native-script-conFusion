// import { Component, OnInit, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
// import { DrawerPage } from '../shared/drawer/drawer.page';
// import { TextField } from 'ui/text-field';
// import { Switch } from 'ui/switch';
// import { Page } from 'ui/page';
// import { Validators, FormBuilder, FormGroup} from '@angular/forms';
// import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
// import { ReservationModalComponent } from '../reservationmodal/reservationmodal.component';
// import { Animation, AnimationDefinition } from 'ui/animation';
// import * as enums from 'ui/enums';
// import { View } from 'ui/core/view';
// import { CouchbaseService } from '../services/couchbase.service';
// import { Observable } from 'tns-core-modules/ui/editable-text-base/editable-text-base';

// @Component({
//     selector: 'app-reservation',
//     moduleId: module.id,
//     templateUrl: './reservation.component.html'
// })
// export class ReservationComponent extends DrawerPage implements OnInit {

//     reservation: FormGroup;
//     afterSubmission: boolean = false;
//     cardReservation: View;
//     cardResume: View;
//     cardForm: View;

//     reservations: Array<any>;
//     docId: string = "reservations";

//     constructor(private changeDetectorRef: ChangeDetectorRef,
//         private _modalService: ModalDialogService,
//         private vcRef: ViewContainerRef,
//         private formBuilder: FormBuilder,
//         private page: Page,
//         private couchbaseservice: CouchbaseService) {
//             super(changeDetectorRef);
//             this.reservations = [];
//             this.reservation = this.formBuilder.group({
//                 guests: 3,
//                 smoking: false,
//                 dateTime: ['', Validators.required]
//             });

//             let doc = this.couchbaseservice.getDocument(this.docId);
//             if (doc == null ) {
//                 this.couchbaseservice.createDocument({"reservations": [] }, this.docId);
//             } 
//             else{
//                 this.reservations = doc.reservations;
//             }
    
          
//     }

//     ngOnInit() {
//     }

//     onSmokingChecked(args) {
//         let smokingSwitch = <Switch>args.object;
//         if (smokingSwitch.checked) {
//             this.reservation.patchValue({ smoking: true });
//         }
//         else {
//             this.reservation.patchValue({ smoking: false });
//         }
//     }


//     onGuestChange(args) {
//         let textField = <TextField>args.object;

//         this.reservation.patchValue({ guests: textField.text});
//     }

//     onDateTimeChange(args) {
//         let textField = <TextField>args.object;

//         this.reservation.patchValue({ dateTime: textField.text});
//     }

//     createModalView(args){
//         let options: ModalDialogOptions = {
//             viewContainerRef: this.vcRef,
//             context: args,
//             fullscreen: false
//         };

//         this._modalService.showModal(ReservationModalComponent, options)
//             .then((result: any) => {
//                 if(args === "guest"){
//                     this.reservation.patchValue({guests: result});
//                 }
//                 else if(args === "date-time"){
//                     this.reservation.patchValue({dateTime: result});
//                 }
//             });

            
//     }

//       animForm() { 

//   if (!this.afterSubmission) {
//           this.cardForm = this.page.getViewById<View>("cardForm");
//           this.cardResume = this.page.getViewById<View>("cardResume");
    
//           if(!this.afterSubmission) {
//                 this.cardForm.animate({
//                     scale: { x: 1, y: 1 },
//                     opacity: 1,
//                     duration: 200,
//                     curve: enums.AnimationCurve.easeIn
//             })
//             .then(() => {
//                 this.cardForm.animate({
//                     scale: { x: 0, y: 0 },
//                     opacity: 0,
//                     duration: 200,
//                     curve: enums.AnimationCurve.easeIn
//             })
//               .then(() => {
//                 this.cardResume.animate({
//                     scale: { x: 0, y:0  },
//                     opacity: 0,
//                     duration: 0,
//                     curve: enums.AnimationCurve.easeIn
//             })
//                 .then(() => {
//                     this.afterSubmission = true;
//                     this.cardResume.animate({
//                         scale: { x: 1, y: 1 },
//                         opacity: 1,
//                         duration: 200,
//                         curve: enums.AnimationCurve.easeIn
//                     })
//                   });
//               });
//             });
//           }
         
//         }
//     }
      
//       addReservation(){
//             let doc = this.couchbaseservice.getDocument(this.docId);
//             //this.reservations = this.reservations || [];
//             //let dataJSON = JSON.stringify(this.reservation.value);
//             console.log(JSON.stringify(doc));
//             console.log("");
//             this.reservations.push(this.reservation.value);
//             this.couchbaseservice.updateDocument(this.docId, {"reservations": this.reservations });
//             doc = this.couchbaseservice.getDocument(this.docId);
//             console.log(JSON.stringify(doc));

//       }

//      onSubmit() {
        
//         this.animForm();
//         this.addReservation();
   
//     }


    
// }


import { Component, OnInit, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { TextField } from 'ui/text-field';
import { Switch } from 'ui/switch';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog'; 
import { ReservationModalComponent } from '../reservationmodal/reservationmodal.component';
import { Animation, AnimationDefinition } from 'ui/animation';
import { Page } from 'ui/page';
import { View } from 'ui/core/view';
import { CouchbaseService } from '../services/couchbase.service';

@Component({
  selector: 'app-reservation',
  moduleId: module.id,
  templateUrl: './reservation.component.html',
  styles: [`
  #reserveConfirmation{
      opacity: 0;
      transform: scale(0);
  }
  `]
})
export class ReservationComponent extends DrawerPage implements OnInit {

    reservation: FormGroup;
    showForm: boolean = true;
    reserveForm: View;
    reserveConfirmation: View;
    reserveDetails: {};
    reservations: Array<object>;
    docId: string = "reservations";

    constructor(private changeDetectorRef: ChangeDetectorRef, 
        private modalService: ModalDialogService, 
        private vcRef: ViewContainerRef, 
        private page: Page, 
        private couchbaseService: CouchbaseService,  
        private formBuilder: FormBuilder) {
            super(changeDetectorRef);

            this.reservation = this.formBuilder.group({
                guests: 3,
                smoking: false,
                dateTime: ['', Validators.required]
            });

            this.reservations = [];

            let doc = this.couchbaseService.getDocument(this.docId);

            if( doc == null) {
                this.couchbaseService.createDocument({"reservations": []}, this.docId);
            }
            else {
            this.reservations = doc.reservations;
            }
    }

    ngOnInit() {

        this.reserveDetails = this.reservation.value;

    }

    onSmokingChecked(args) {
        let smokingSwitch = <Switch>args.object;
        if (smokingSwitch.checked) {
            this.reservation.patchValue({ smoking: true });
        }
        else {
            this.reservation.patchValue({ smoking: false });
        }
    }

    onGuestChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ guests: textField.text });
    }

    onDateTimeChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ dateTime: textField.text });
    }

    createModalView(args) {

        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: args,
            fullscreen: false
        };

        this.modalService.showModal(ReservationModalComponent, options)
            .then((result: any) => {
                if (args === "guest") {
                    this.reservation.patchValue({guests: result});
                }
                else if (args === "date-time") {
                    this.reservation.patchValue({ dateTime: result});
                }
            });

    }

    onSubmit() {
        // console.log(JSON.stringify(this.reservation.value));
        this.reserveDetails = this.reservation.value;
        this.animateForm();
        this.addReservation();
    }

    animateForm() {
        this.reserveForm = this.page.getViewById<View>("reserveForm");
        this.reserveConfirmation = this.page.getViewById<View>("reserveConfirmation");

        let definitions1 = new Array<AnimationDefinition>();
        let definitions2 = new Array<AnimationDefinition>();

        let a1: AnimationDefinition = {
            target: this.reserveForm,
            scale: { x: 0, y: 0 },
            opacity: 0,
            duration: 500
        };
        definitions1.push(a1);

        let a2: AnimationDefinition = {
            target: this.reserveConfirmation,
            scale: { x: 1, y: 1 },
            opacity: 1,
            duration: 500
        };
        definitions2.push(a2);

        let animationSet1 = new Animation(definitions1);
        let animationSet2 = new Animation(definitions2);

            animationSet1.play()
            .then(() => {
                this.showForm = false;
                animationSet2.play()
                    .then(() => {})
                    .catch((e) => {
                        console.log(e.message);
                    });
            })
            .catch((e) => {
                console.log(e.message)
            });
    }

    addReservation() {
        let doc = this.couchbaseService.getDocument(this.docId);
        if (this.reservations.length === 0) {
            this.reservations.push(this.reserveDetails);
            this.couchbaseService.updateDocument(this.docId, {"reservations": this.reservations});
            doc = this.couchbaseService.getDocument(this.docId);
            console.log("This is the first reservation");
            console.log(JSON.stringify(this.reservations));
            console.log("");
        }
        else {
            console.log(JSON.stringify(doc));
            console.log("");
            this.reservations.push(this.reserveDetails);
            this.couchbaseService.updateDocument(this.docId, {"reservations": this.reservations});
            doc = this.couchbaseService.getDocument(this.docId);
            console.log(JSON.stringify(doc));
            console.log("");
        }
        
    }
}