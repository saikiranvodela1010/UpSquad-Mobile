import { Type, plainToClass,Expose } from 'class-transformer'; 
 
 
 export class EventLocation{
      id=null;
                  name="";
                  isChecked=null;

                  
                  getName()
                  {  
                    return this.name;
                  }
                  
                  setName(value) 
                  {   
                     this.name=value;
                  }
                  
                  getId()
                  {  
                    return this.id;
                  }
                  
                  setId(value) 
                  {   
                     this.id=value;
                  }
                  
                  setIsChecked(value) {
                 this.isChecked=value;
                  }
                  
                  getIsChecked() {
                 return this.isChecked;
                  }




}