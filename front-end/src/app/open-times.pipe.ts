import { ShimReferenceTagger } from '@angular/compiler-cli/src/ngtsc/shims';
import { Pipe, PipeTransform } from '@angular/core';
import { OpenTimes } from './location';

@Pipe({
  name: 'openTimes'
})
export class OpenTimesPipe implements PipeTransform {

  transform(openTimes: OpenTimes): any {

    let o = [openTimes.sun, openTimes.mon, openTimes.tue, openTimes.wed, 
            openTimes.thu, openTimes.fri, openTimes.sat];

    let t = '';
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday"];




    // this algorithms halfway works, but is still broken :(
    /* 
    for ( let j = 0; j < o.length; j++ ) {
      let sameTime = 0;
      let sameTimeEnd = 0;
      if ( j < o.length && o[j].open == o[j+1].open && o[j].close == o[j+1].close ) {
        //get the first day that has same open/close times
        sameTime = j;
        for ( let k = j; k < o.length; k++ ) {
          if ( o[sameTime].open == o[k].open && o[sameTime].close == o[k].close ) {
            console.log("IF --- ", j);
            j++;
            sameTimeEnd = k;
          } else {
            k = o.length;
            console.log("ELSE --------------- ", j);
          }
        }
        if ( j < o.length && o[0].open == o[o.length-1].open && o[0].close == o[o.length-1].close ) {
          sameTime = j;
          for ( let i = o.length; i > 0; i-- ) {
            //put logic for if sunday and saturday have the same opening times
            
          }
        }
        if ( o[sameTimeEnd].open == 0 ) {
          t += days[sameTime] + " - " + days[sameTimeEnd] + ": Closed" + "\n";
        } else if ( o[sameTimeEnd].close == 24 ) {
          t += days[sameTime] + " - " + days[sameTimeEnd] + ": Open all day" + "\n";
        } else {
          t += days[sameTime] + " - " + days[sameTimeEnd] + ": Open " + o[sameTimeEnd].open + " to " + o[sameTimeEnd].close + "\n";
        }
      } 
      t += days[j] + ": Open " + o[j].open + " to " + o[j].close + "\n";
    }

    */




    
    for ( let i = 0; i < o.length; i++ ) {
      if ( o[i].open == 0 ) {
        t += days[i] + `: Closed\n`;
      } else if ( o[i].open == 24 ) {
        t += days[i] + `: Open All Day\n`;
      } else {
        switch (i) {
          case 0: t += days[i] + `: Open ` + openTimes.sun.open + `AM Close ` + openTimes.sun.open + `PM\n`;
          break ;
          case 1: t += days[i] + `: Open ` + openTimes.mon.open + `AM Close ` + openTimes.mon.open + `PM\n`;;
          break ;
          case 2: t += days[i] + `: Open ` + openTimes.tue.open + `AM Close ` + openTimes.tue.open + `PM\n`;;
          break ;
          case 3: t += days[i] + `: Open ` + openTimes.wed.open + `AM Close ` + openTimes.wed.open + `PM\n`;;
          break ;
          case 4: t += days[i] + `: Open ` + openTimes.thu.open + `AM Close ` + openTimes.thu.open + `PM\n`;;
          break ;
          case 5: t += days[i] + `: Open ` + openTimes.fri.open + `AM Close ` + openTimes.fri.open + `PM\n`;;
          break ;
          case 6: t += days[i] + `: Open ` + openTimes.sat.open + `AM Close ` + openTimes.sat.open + `PM\n`;;
          break ;
        }
      }
    }
    
    console.log('OPEN TIMES', o);

    return t;
  }

}
