import {Socket} from 'ng-socket-io';
import {LoadingController} from '@ionic/angular';
import {ChangeDetectorRef, Component} from '@angular/core';

declare var webkitSpeechRecognition: any;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    d = (new Date());
    date1 = this.d.getDate() + "/" + this.d.getMonth() + 1 + "/" + this.d.getFullYear();
    isWebSpeechRecording = false;
    recognition: any;
    allOff(type) {
        this.socket.emit("all_off", type);
    }
    allOn() {
        this.socket.emit("all_on", "a");
    }
    setMode(data){
        this.socket.emit("set_mode", data);
    }

    constructor(private socket: Socket, private readonly changeDetectorRef: ChangeDetectorRef,
                private readonly loadingCtrl: LoadingController) {


    }


    ngOnInit() {
        this.socket.connect();


    }

    searchWebSpeech() {
        if (!('webkitSpeechRecognition' in window)) {
            return;
        }
        this.recognition = new webkitSpeechRecognition();
        this.recognition.continuous = false;


        this.recognition.onstart = () => {
            this.isWebSpeechRecording = true;
            this.changeDetectorRef.detectChanges();
        };

        this.recognition.onerror = event => console.log('error', event);
        this.recognition.onend = () => {
            this.isWebSpeechRecording = false;
            this.changeDetectorRef.detectChanges();
        };

        this.recognition.onresult = event => {
            const terms = [];
            if (event.results) {
                for (const result of event.results) {
                    for (const ra of result) {
                        let sentence = ra.transcript;
                        console.log(sentence);
                        this.socket.emit("toggle", sentence[0].toUpperCase() + "L1");
                    }
                }
            }
        };
        this.recognition.start();
    }
}
