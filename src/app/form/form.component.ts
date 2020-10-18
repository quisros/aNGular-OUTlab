import { Component, OnInit } from '@angular/core';
import { Info } from '../info';
import { InteractService } from '../interact.service';

import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Validators } from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  profileForm: any;
  crInfo: Info;

  constructor(private interactService: InteractService, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      feedback: ["", [Validators.required]],
      comment: [""]
    });
    this.crInfo = {
      name: " ",
      email: " ",
      feedback: " ",
      comment: " "
    };
  }

 ngOnInit() {

    this.interactService.clearMsg();

    this.interactService.getInfos().subscribe(data => {
      this.profileForm.setValue({
        name: data.name,
        email: data.email,
        feedback: data.feedback,
        comment: data.comment
      });
      this.crInfo.name = data.name;
      this.crInfo.email = data.email;
      this.crInfo.feedback = data.feedback;
      this.crInfo.comment = data.comment;
    }); 
    
 }


  get myForm() {
    return this.profileForm.get('feedback');
  }

  onSubmit() {

    this.interactService.clearMsg();

    let formObj = this.profileForm.getRawValue();
    let serializedForm = JSON.stringify(formObj);

    this.interactService.postInfos(serializedForm).subscribe(
      data => {
        console.log(data);
        this.interactService.createMsg('Form submitted successfully!');
        this.interactService.createMsg('Created '+ serializedForm);
        this.crInfo.name = this.profileForm.get('name').value;
        this.crInfo.email = this.profileForm.get('email').value;
        this.crInfo.feedback = this.profileForm.get('feedback').value;
        this.crInfo.comment = this.profileForm.get('comment').value;
        this.profileForm.setValue({
          name: "",
          email: "",
          feedback: "",
          comment: ""
        });
      },
      error => {this.interactService.createMsg('Error occurred in form submission - form submission was unsuccessful!');}
      );
  }

}
