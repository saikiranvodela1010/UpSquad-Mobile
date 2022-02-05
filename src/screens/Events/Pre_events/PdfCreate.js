import {PermissionsAndroid, Platform } from 'react-native';
 
import RNHTMLtoPDF from 'react-native-html-to-pdf';

 export function requestRunTimePermission(){
    
      async function externalStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message:'App needs access to Storage data.',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        return true;
        this.createPDF_File();
      } else {
        return false;
        alert('WRITE_EXTERNAL_STORAGE permission denied');
      }
    } catch (err) {

      alert('Write permission err', err);
      console.log(err);
      return false;
    }
   }
 
    if (Platform.OS === 'android') {
     return  externalStoragePermission();
    } else {
      this.createPDF_File();
    }
  }
 
  export function createPDF_File(value) {

    let htmlString='<h1 style="text-align: center;font-weight:500;text-decoration:underline;margin-bottom:15px">Participants Attending</h1>'+
    "<br><br></br>"+
    '<table>'+
    '<tr>'+
      '<th>Name</th>'+
      '<th>Email</th>'+
     ' <th>Duration(min)</th>'+
     '<th>Join time</th>'+
     ' <th>Left time</th>'+
    '</tr>'+


    '<tr>'+
      '<td>Alfreds </td>'+
     ' <td>Maria Anders</td>'+
      '<td>Germany</td>'+
    '</tr>'+


    '<tr>'+
      '<td>Centro come</td>'+
      '<td>Francisco Chang</td>'+
     ' <td>Mexico</td>'+
    '</tr>'+



  '</table>'

    ;

    


    let options = {
      // HTML Content for PDF.
      // I am putting all the HTML code in Single line but if you want to use large HTML code then you can use + Symbol to add them.
      html:htmlString
         ,  //"bahnu"
      // Setting UP File Name for PDF File.
      fileName: new Date().toLocaleString(),
    
      //File directory in which the PDF File Will Store.
      directory: 'docs',
    };
 
     RNHTMLtoPDF.convert(options).then(response => {
alert(response.filePath); 

    });

  }


