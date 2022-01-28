export class UserRegisterEvent {
  companyOrOrganization=null;
  firstName= null;
  lastName= null;
  email= null;

  
  getEmail() {
    return this.email;
  }
}
