import { Component, Input, OnInit } from "@angular/core";
import { User } from "../Models/User.model";

@Component({
  selector: "app-introduction",
  templateUrl: "./introduction.component.html",
  styleUrls: ["./introduction.component.css"],
})
export class IntroductionComponent implements OnInit {
  constructor() {}

  @Input() user: User;
  @Input() visitors: number = null;
  socialMap = [
    { name: "youtube", character: 77, style: { "font-size.vw": 5 } },
    { name: "linkedin", character: 67, style: { "font-size.vw": 5 } },
    { name: "github", character: 41, style: { "font-size.vw": 4 } },
  ];

  ngOnInit(): void {
  }
  getNameLetters(): string[] {
    if (this.user) return this.user.name.split("");
    return [];
  }
  getSocialCharacter(name: string) {
    const socialItem = this.socialMap.find((val) => {
      if (val.name === name.toLowerCase()) {
        return true;
      }
    });
    if (socialItem) {
      return {
        character: String.fromCharCode(socialItem.character),
        style: socialItem.style,
      };
    }
    return { character: null, style: null };
  }
}
