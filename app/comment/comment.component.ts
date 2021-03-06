import { Component, OnInit} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TextField } from 'ui/text-field';
import { Slider } from "ui/slider";
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
    moduleId: module.id,
    templateUrl: './comment.component.html'
})

export class CommentComponent implements OnInit{

    commentForm: FormGroup;
    
    constructor(private formBuilder: FormBuilder,private params: ModalDialogParams){

        this.commentForm = this.formBuilder.group({
            author: '',
            rating: 5,
            comment: ['', Validators.required],
            date: new Date().toISOString()
        })
    }

    ngOnInit(){

    }

    onSubmit() {
        this.params.closeCallback(this.commentForm.value);
    }


}