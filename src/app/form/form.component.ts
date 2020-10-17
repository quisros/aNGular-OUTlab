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

  infos: Info;
  aninfos: Info[];
  profileForm: any;

  constructor(private interactService: InteractService, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      feedback: ["", [Validators.required]],
      comment: [""]
    });
  }

 ngOnInit() {

    this.getInfos();
    this.profileForm.name.setValue(this.infos.name);
  }

  public getInfos() {
    this.interactService.getInfos().subscribe((data: Info) => this.infos = data);
  }

  get myForm() {
    return this.profileForm.get('feedback');
  }

  onSubmit() {

    this.interactService.clearMsg();

    let formObj = this.profileForm.getRawValue();
    let serializedForm = JSON.stringify(formObj);

    this.interactService.postInfos(serializedForm).subscribe(
      data => this.interactService.createMsg('Form submitted successfully!'),
      error => this.interactService.createMsg('Error occurred in form submission!')
      );
  }

}
