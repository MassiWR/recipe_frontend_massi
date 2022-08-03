import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name!: string;
  email!: string;
  constructor( public authService: AuthService, private actRoute: ActivatedRoute) {
    this.authService.getUserProfile().subscribe((res) => {
      this.name = res.name;
      this.email = res.email;
    });
   }

  ngOnInit(): void {
  }

}
