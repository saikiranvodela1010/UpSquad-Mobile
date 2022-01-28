
import { Type, plainToClass } from 'class-transformer';

export class Person {
     firstName="bhanuPro";
     lastName="lastName";
     age=12;
     eyeColor="red";
    constructor(first, last, age, eye)
     {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.eyeColor = eye;
      
    }
     getFirstName() {
        return this.firstName;
      }

      /**
     * @param {string} newValue
     */
     setFirstName(newValue) {
        this.firstName = newValue;
        // alert(this.firstName);  
    }


}





  