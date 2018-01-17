import { Injectable } from '@angular/core';
import { isAndroid, isIOS, device, screen } from 'platform';
import * as connectivity from 'connectivity';
import { Observable } from 'rxjs/Observable';
import { Console } from '@angular/core/src/console';

class DeviceInfo {
    
    constructor(

        public model: string,
        public deviceType: string,
        public os: string,
        public osVersion: string,
        public sdkVersion: string,
        public language: string,
        public manufacturer: string,
        public uuid: string
    ){

    }
}

class ScreenInfo {
    constructor(
      
        public heightDIPs: number,
        public heightPixels: number,
        public scale: number,
        public widthDIPs: number,
        public widthPixels: number
    ){}
}


@Injectable()
export class PlatformService {
    
    public deviceInformation: DeviceInfo;
    public screenInformation: ScreenInfo;
    public connectionType: string;

    constructor(){
        this.deviceInformation = new DeviceInfo(
            device.model,
            device.deviceType,
            device.os,
            device.osVersion,
            device.sdkVersion,
            device.language,
            device.manufacturer,
            device.uuid
        );

        this.screenInformation = new ScreenInfo(
            screen.mainScreen.heightDIPs,
            screen.mainScreen.heightPixels,
            screen.mainScreen.scale,
            screen.mainScreen.widthDIPs,
            screen.mainScreen.widthPixels
        );


        let connectionType = connectivity.getConnectionType();
        switch( connectionType){

            case connectivity.connectionType.none:
                this.connectionType = " None ";
                break;
            case connectivity.connectionType.wifi:
                this.connectionType = "wifi";
                break;
            case connectivity.connectionType.mobile:
                this.connectionType = " Mobile ";
                break;
            default:
                break;
            
        }

    }

  public isAndroid(): boolean {
      return isAndroid;
  }

  public isIOS(): boolean {
      return isIOS;
  }

  public screenWidthDIP(): number {
      return this.screenInformation.widthDIPs;
  }

  public networkConnectionType(): string {
      return this.connectionType;
  }

  public startMonitoringNetwork(): Observable<string> {
    return Observable.create((observer) => {
        connectivity.startMonitoring((newConnectionType : number) => {
           
            switch( newConnectionType){

                case connectivity.connectionType.none:
                    this.connectionType = " None ";
                    observer.next('Connection type changed to none');
                    break;
                case connectivity.connectionType.wifi:
                    this.connectionType = "wifi";
                    observer.next('Connection type changed to wifi');
                    break;
                case connectivity.connectionType.mobile:
                    this.connectionType = " Mobile ";
                    observer.next('Connection type changed to Mobile');
                    break;
                default:
                    break;
                
            }
        });
    })
  }

  public stopMonitroingNetwork(){
    connectivity.stopMonitoring();
  }

  public printPlatformInfo(){
      console.log('This device model is'  + this.deviceInformation.model);
      console.log('This device OS is ' + this.deviceInformation.os + ' ' + this.deviceInformation.osVersion );
      console.log('This device type is ' + this.deviceInformation.deviceType );
      console.log('The device size is' + this.screenInformation.widthPixels + ' X ' + this.screenInformation.heightPixels + ' pixels ');
      console.log('This device is connected to ' + this.connectionType );
  }
   
}