import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from '../environments/environment';
import { AppUpdatorService } from './services/app-updator.service';
import { ApiService } from './services/api.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

    UserId = localStorage.getItem('userId');

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private appUpdatorService: AppUpdatorService,
        private apiService: ApiService
    ) {
        this.initializeApp();
        this.CheckUser();
        this.smsplivo()

    }
    ngOnInit() {
        if (environment.production) {
            this.appUpdatorService.checkPWAUpdate();
        }
    }
    initializeApp = () => {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
    CheckUser() {
        this.apiService.CheckUser(this.UserId).subscribe(data => {

            if (data == false) {
                this.apiService.logout();
            }
        });
    }
    testsms() {
        this.apiService.messageApi('hello').subscribe(data => {
            console.log(data);
        })
    }

    smsplivo() {
        let plivo = require('plivo');
        let client = new plivo.Client('MAYMU5MDVHMDEYN2VKMT', 'MjRmOTNhOWU5ZDQ4N2E0YmYyNDhjNjRmMjkyODMw');

        client.messages.create({
            src: '916380757076',
            dst: '919003388439',
            text: 'Hello, this is a sample text from Plivo',
        }).then(function(response) {
            console.log(response)
        });

    }

}
