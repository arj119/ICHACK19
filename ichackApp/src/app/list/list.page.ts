import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Socket} from 'ng-socket-io';


@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    id: string;
    public items: any;
    public adjItems = [];
    public toggleItems = [];
    private roomDevices = [{
        title: "Living Room",
        devices: [
            {
                title: "Light",
                type: "Light",
                icon: 'bulb',
                adjustable: true,
                id: 1
            },
            {
                title: "Fan",
                type: "Fan",
                icon: 'snow',
                adjustable: false,
                id: 1
            },
            {
                title: "Heater",
                type: "Heater",
                icon: 'thermometer',
                adjustable: false,
                id: 1

            }]
    }, {

        title: "Bedroom",
        devices: [
            {
                title: "Main Light",
                type: "Light",
                icon: 'bulb',
                adjustable: false,
                id: 1
            }, {
                title: "Side Lamp",
                type: "Light",
                icon: 'flashlight',
                adjustable: true,
                id: 2
            },
            {
                title: "Heater",
                type: "Heater",
                icon: 'thermometer',
                adjustable: false,
                id: 1

            }]

    }, {

        title: "Bathroom",
        devices: [
            {
                title: "Light",
                type: "Light",
                icon: 'bulb',
                adjustable: false,
                id: 1
            },
            {
                title: "Towel Heater",
                type: "Heater",
                icon: 'flame',
                adjustable: false,
                id: 1

            }]

    }, {

        title: "Kitchen",
        devices: [
            {
                title: "Light",
                type: "Light",
                icon: 'bulb',
                adjustable: false,
                id: 1
            }, {
                title: "Exhaust",
                type: "Fan",
                icon: 'snow',
                adjustable: false,
                id: 1
            },
            {
                title: "Fridge",
                type: "Fan",
                icon: 'cart',
                adjustable: false,
                id: 2
            }]
    }, {

        title: "Entertainment",
        devices: [
            {
                title: "Main Light",
                type: "Light",
                icon: 'bulb',
                adjustable: true,
                id: 1
            }]
    }, {

        title: "Garage",
        devices: [
            {
                title: "Light",
                type: "Light",
                icon: 'bulb',
                adjustable: false,
                id: 1
            }]
    }, {

        title: "Closet",
        devices: [
            {
                title: "Light",
                type: "Light",
                icon: 'bulb',
                adjustable: true,
                id: 1
            }]
    }, {
        title: "Dining Room",
        devices: [
            {
                title: "Main Light",
                type: "Light",
                icon: 'bulb',
                adjustable: true,
                id: 1
            },
            {
                title: "Candle Light",
                type: "Light",
                icon: 'flame',
                adjustable: false,
                id: 2

            },
            {
                title: "Heater",
                type: "Heater",
                icon: 'thermometer',
                adjustable: false,
                id: 1
            }
        ]
    }];
    private roomID: string;

    constructor(private route: ActivatedRoute, private socket: Socket) {
    }

    ngOnInit() {
        this.socket.connect();
        this.id = this.route.snapshot.paramMap.get('id');
        for (let i = 0; i < this.roomDevices.length; i++) {
            if (this.id == this.roomDevices[i].title) {
                this.items = this.roomDevices[i].devices;
                for (let j = 0; j < this.items.length; j++) {
                    if (this.items[j].adjustable) {
                        this.adjItems.push(this.items[j]);
                    }
                    else {
                        this.toggleItems.push(this.items[j]);
                    }
                }
                break;
            }
        }
    }

    switchClicked(item) {
        let x = "";
        if (this.id == "Bathroom") {
            x = "WC";
        }
        else {
            x = this.id;
        }
        this.roomID = x[0] + item.type[0] + item.id + "$";
        console.log(this.roomID);
        this.socket.emit('toggle', this.roomID);
    }

    rangeChanged(e, item) {
        let x = "";
        if (this.id == "Bathroom") {
            x = "WC";
        }
        else {
            x = this.id;
        }
        this.roomID = x[0] + item.type[0] + item.id + e.detail.value + "$";
        console.log(this.roomID);
        this.socket.emit('toggle', this.roomID);
    }
}
