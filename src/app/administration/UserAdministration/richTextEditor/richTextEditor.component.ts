
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Sanitizer,
  SecurityContext,
  ViewChild,
  ViewEncapsulation,
  ɵ_sanitizeHtml,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

// import { InstructionsService } from 'src/app/Services/Packages/bulles-editor.service';

@Component({
  selector: "app-richTextEditor",
  templateUrl: "./richTextEditor.component.html",
  styleUrls: ["./richTextEditor.component.css"],
  // encapsulation: ViewEncapsulation.None,
})
export class RichTextEditorComponent implements OnInit {
  constructor(
    private sanitized: DomSanitizer,
  ) {}

  editorToolsButtons: { icon: string, command: string, tooltip: string, active: boolean}[] = [
    { icon: "format_bold", command: "bold", tooltip: "Bold" , active: false},
    { icon: "format_italic", command: "italic", tooltip: "Italic" , active: false},
    { icon: "format_underline", command: "underline", tooltip: "Underline" , active: false},
    {
      icon: "format_strikethrough",
      command: "strikethrough",
      tooltip: "Strike through", active: false
    },
    {
      icon: "format_align_center",
      command: "justifyCenter",
      tooltip: "Justify Center", active: false
    },
    {
      icon: "format_align_justify",
      command: "justifyFull",
      tooltip: "Justify Full", active: false
    },
    {
      icon: "format_align_left",
      command: "justifyLeft",
      tooltip: "Justify Left", active: false
    },
    {
      icon: "format_align_right",
      command: "justifyRight",
      tooltip: "Justify Right", active: false
    },
    {
      icon: "format_indent_decrease",
      command: "outdent",
      tooltip: "Indent Left", active: false
    },
    { icon: "format_indent_increase", command: "indent", tooltip: "Indent", active: false },
    {
      icon: "format_list_bulleted",
      command: "insertUnorderedList",
      tooltip: "Bulleted List", active: false
    },
    {
      icon: "format_list_numbered",
      command: "insertOrderedList",
      tooltip: "Numbered List", active: false
    },
  ];
  loading = true;
  currentFormat: string = null;
  @Input() text: string = "";
  @Output() textChange = new EventEmitter<string>();
  @ViewChild("Editor") Editor: ElementRef;
  // @ViewChild("pasteBuffer") pasteBuffer: ElementRef;

  @HostListener("paste", ["$event"]) onPaste(e: ClipboardEvent) {
    this.loading = true;
    e.preventDefault();
    const pasteResult = this.sanitized
      .sanitize(SecurityContext.HTML, e.clipboardData.getData("text"))
      .replace(/&#10;/gm, "\r\n");
    document.execCommand("insertText", false, pasteResult);
    this.loading = false;
    // this.pasteBuffer.nativeElement.innerHTML = null;

    // document.execCommand('insertHTML',false,event.clipboardData.getData('text/html'))
  }

  ngOnInit() {
    // this.Editor.document.designMode = "On";
  }
  ngAfterViewInit() {
    this.loading = false;
  }
  executeCommand(command: string) {
    // console.log(this.Editor)
    const editor = document.querySelector(".editor");
    document.execCommand(command, false, null);
  }
  formatTextStyle(command: any) {
    // console.log(command);
    const editor = document.querySelector(".editor");
    if (command === "body") command = null;
    document.execCommand("formatBlock", false, command);
  }
  textValueChanged() {
    //console.log(this.Editor);
    this.textChange.emit(this.Editor.nativeElement.innerHTML);
    // console.log(this.id);

  }
  removeUnauthorizedFormatting() {
    // console.log(this.Editor.nativeElement.innerHTML);
  }

  overrideDefaultKeys(event: KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      event.stopPropagation();
      if (event.key === "Tab" && event.shiftKey) {

        this.executeCommand("outdent");
      } else {
        this.executeCommand("indent");
      }
    }
  }

  addLink() {
    var linkURL = prompt("Enter a URL:", "http://");
    // this.Editor.nativeElement.document.getSelection()
    var sText = document.getSelection();
    document.execCommand(
      "insertHTML",
      false,
      '<a href="' + linkURL + '" target="_blank">' + sText + "</a>"
    );
  }

  updateStyleToolbar() {
    this.editorToolsButtons.forEach(command =>{
      command.active = document.queryCommandValue(command.command) === "true";
    })
    this.currentFormat = document.queryCommandValue('formatblock');
    this.textValueChanged();
  }
}
