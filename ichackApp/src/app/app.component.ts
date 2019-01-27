import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
    (window as any).global = window;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Closet',
            url: '/list/Closet',
            icon: 'shirt'
        },
        {
            title: 'Bedroom',
            url: '/list/Bedroom',
            icon: 'bed'
        },
        {
            title: 'Kitchen',
            url: '/list/Kitchen',
            icon: 'restaurant'
        },
        {
            title: 'Entertainment',
            url: '/list/Entertainment',
            icon: 'headset'
        },
        {
            title: 'Living room',
            url: '/list/Living Room',
            icon: 'people'
        },
        {
            title: 'Dining room',
            url: '/list/Dining Room',
            icon: 'wine'
        },
        {
            title: 'Bathroom',
            url: '/list/Bathroom',
            icon: 'woman'
        },
        {
            title: 'Garage',
            url: '/list/Garage',
            icon: 'logo-model-s'
        },

    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
