import { ToastController } from 'ionic-angular';
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { Api } from "./api";

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Functions {

  constructor(
    private toastController: ToastController,
    private storage: Storage,
    private api: Api,
  ) {}

  httpGetTest(){
    let headers = this.api.getHeaders();
    let seq = this.api.get("test", { headers });
    seq.subscribe(
      (res: any) => {
        console.log(res);
      },
      err => {
        console.error(err);
      }
    );
  }

  async httpAuthTest(){
    let headers = await this.api.getHeadersWithAuthorization();
    let seq = this.api.get("authTest", { headers });
    seq.subscribe(
      (res: any) => {
        console.log(res);
      },
      err => {
        console.error(err);
      }
    );
  }

  requestTokens(){
    let headers = this.api.getHeaders();
    let body = { email: "abdelhak.ayyoub@gmail.com", password: "123456" };
    let seq = this.api.post("login", body, { headers });
    seq.subscribe(
      (res: any) => {
        this.storage.set("accessToken", res.token_type + " " + res.access_token);
        this.storage.set("refreshToken", res.refresh_token);
        this.storage.set("expiresIn", res.expires_in);
        this.storage.get('accessToken').then((val) => {
          console.log('accessToken', val);
        });
      },
      err => {
        console.error(err);
      }
    );
  }

  async showToast(message: string){
    const toast = await this.toastController.create({
      message: message,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }
}