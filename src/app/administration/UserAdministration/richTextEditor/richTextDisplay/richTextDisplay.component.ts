import { Component, Inject, OnInit, SecurityContext } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-richTextDisplay",
  templateUrl: "./richTextDisplay.component.html",
  styleUrls: ["./richTextDisplay.component.css"],
})
export class RichTextDisplayComponent implements OnInit {
  constructor(
    public sanitized: DomSanitizer,
    public dialogRef: MatDialogRef<RichTextDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { description: string }
  ) {}

  ngOnInit() {}
  getDescription(): string {
    return this.sanitized.sanitize(SecurityContext.HTML, this.data.description);
  }
  close(){
    this.dialogRef.close();
  }
}
