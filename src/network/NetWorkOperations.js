
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";


export default class ApiHandler {
    async requestPost(data,url,param) {
        console.log("Request URL>>>>",data,url,param);
        let headers = {
            'Content-Type': 'application/json'
        }
        const networkStatus = await NetInfo.fetch();
        if (networkStatus.isConnected) {
            if(param !=null && param != undefined ){
                return this.callAPI(url+param, data, headers);
            } else{
                return this.callAPI(url, data, headers);
            }
            
        } else {
            return responseData = { status: "No network Connected!" };
        }
    }

    async requestGet(data,url) {
        console.log("Request URL>>>>",data,url);
        let headers = {
            'Content-Type': 'application/json'
        }
        const networkStatus = await NetInfo.fetch();
        if (networkStatus.isConnected) {
            return this.callGetAPI(url, data, headers);
        } else {
            return responseData = { status: "No network Connected!" };
        }
    }

    async callGetAPI(url,data,headers) {
        let responseData;
        await axios.get(url+data, headers) 
        .then(response => {
            responseData = response.data;
            //console.log('Response Data>>>', responseData); 
        })
        .catch(error=>{
            if(error.response!=null){
                responseData = error.response;
                //console.log('error Response Data>>>', responseData);
            }
        });
        return responseData
        
    }




      async callAPI(url,data,headers) {
        let responseData;
        await axios.post(url, data, headers) 
        .then(response => {
            responseData = response.data;
            //console.log('Response Data>>>', responseData);
        })
        .catch(error=>{
            if(error.response!=null){
                responseData = error.response;
                //console.log('error Response Data>>>', responseData);
            }
        });
        return responseData
        
    }
}