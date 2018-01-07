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
    currentValue: number = 10;


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

    onAuthorChange(args) {
        let textField = <TextField>args.object;

        this.commentForm.patchValue({ author: textField.text});
    }

    onCommentChange(args) {
        let textField = <TextField>args.object;

        this.commentForm.patchValue({ comment: textField.text});
    }

    onSliderValueChange(args) {
        let slider = <Slider>args.object;

        this.currentValue = slider.value;
    }


    onSubmit() {
        this.params.closeCallback(this.commentForm.value);
    }


}