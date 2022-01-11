
export default class ServiceUrls {

    mainUrl = 'https://devapi.upsquad.com';


    loginuser = this.mainUrl+'/users/authenticate';
    validateEmail= this.mainUrl+'/users/validateEmail/';
    roleDetails=this.mainUrl+'/subscriptionUsers/getTeams';
    userRegister=this.mainUrl+'/users/register';
    updateTeams = this.mainUrl+'/subscriptionUsers/updateTeam';
    getCommunities= this.mainUrl+'/subscriptionUsers/getProfileOrganizations';
    imageUpload = this.mainUrl+ '/users/updateUserInfo';
    getuser =this.mainUrl+ '/users/getUser/';
    searchUsersByOrganization =this.mainUrl+ '/users/searchUsersByOrganization';
    searchUsersByOutside =this.mainUrl+ '/users/searchUsersByOutside';
    getParticularUser = this.mainUrl+ '/users/getParticularUser/';
}