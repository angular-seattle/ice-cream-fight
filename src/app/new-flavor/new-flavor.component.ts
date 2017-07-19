import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlavorService } from '../flavor.service';

@Component({
  selector: 'app-new-flavor',
  templateUrl: './new-flavor.component.html',
  styleUrls: ['./new-flavor.component.css']
})
export class NewFlavorComponent implements OnInit {
  @ViewChild(NgForm)
  private form: NgForm;

  constructor(private service: FlavorService, private router: Router) { }

  ngOnInit() {
  }

  addFlavor() {
    console.log('Adding flavor ', this.form.value);
    this.router.navigate(['/']);
  }
}
