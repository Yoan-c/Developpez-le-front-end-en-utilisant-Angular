import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root',
})
export class ColorService {

    getNbColorRandom(numColor: number): string[]{
        
        let tabColor: string[] = [  '#793D52', '#89A1DB', '#9780A1', '#BFE0F1', '#B8CBE7','#956065',];
        let letters = '0123456789ABCDEF';
       if (numColor > 6){
            while (numColor > 0){
                let color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                tabColor.push(color);
                numColor--;
            }
        }
        return tabColor;
    }
}
