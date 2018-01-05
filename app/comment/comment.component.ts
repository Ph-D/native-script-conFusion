import { Component, OnInit} from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular//modal-dialog';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    templateUrl: './comment.component.html'
})

export class CommentComponent implements OnInit{

    commentForm: FormGroup;

    constructor(private formBuilder: FormBuilder){

        this.commentForm = this.formBuilder.group({
            name: '',
            rating: 5,
            comment: ['', Validators.required]
        })
    }

    ngOnInit(){

    }
}