
var belTable = [];

var belfiles = [];

document.getElementById("submitBttn").addEventListener("click", submitFiles);

function submitFiles(){
  var numb = document.getElementById("numberOfStudios").value;
  if(numb == "one"){
    belfiles[0] = document.getElementById("bel1file").value.substring(12);
    grabData(document.getElementById("bel1file").value.substring(12));
  }else if(numb == "two"){
    belfiles[0] = document.getElementById("bel1file").value.substring(12);
    grabData(document.getElementById("bel1file").value.substring(12));
    belfiles[1] = document.getElementById("bel2file").value.substring(12);
    grabData(document.getElementById("bel2file").value.substring(12));
  }else if(numb == "three"){
    belfiles[0] = document.getElementById("bel1file").value.substring(12);
    grabData(document.getElementById("bel1file").value.substring(12));
    belfiles[1] = document.getElementById("bel2file").value.substring(12);
    grabData(document.getElementById("bel2file").value.substring(12));
    belfiles[2] = document.getElementById("bel3file").value.substring(12);
    grabData(document.getElementById("bel3file").value.substring(12));
  }else if(numb == "four"){
    belfiles[0] = document.getElementById("bel1file").value.substring(12);
    grabData(document.getElementById("bel1file").value.substring(12));
    belfiles[1] = document.getElementById("bel2file").value.substring(12);
    grabData(document.getElementById("bel2file").value.substring(12));
    belfiles[2] = document.getElementById("bel3file").value.substring(12);
    grabData(document.getElementById("bel3file").value.substring(12));
    belfiles[3] = document.getElementById("bel4file").value.substring(12);
    grabData(document.getElementById("bel4file").value.substring(12));
  }
}

document.getElementById("numberOfStudios").addEventListener("click", displayStudioInpBox);

function displayStudioInpBox() {
  if(document.getElementById("numberOfStudios").value == "one"){
    document.getElementById("bel1").hidden = false;
    document.getElementById("bel2").hidden = true;
    document.getElementById("bel3").hidden = true;
    document.getElementById("bel4").hidden = true;
  }else if(document.getElementById("numberOfStudios").value == "two"){
    document.getElementById("bel1").hidden = false;
    document.getElementById("bel2").hidden = false;
    document.getElementById("bel3").hidden = true;
    document.getElementById("bel4").hidden = true;
  }else if(document.getElementById("numberOfStudios").value == "three"){
    document.getElementById("bel1").hidden = false;
    document.getElementById("bel2").hidden = false;
    document.getElementById("bel3").hidden = false;
    document.getElementById("bel4").hidden = true;
  }else if(document.getElementById("numberOfStudios").value == "four"){
    document.getElementById("bel1").hidden = false;
    document.getElementById("bel2").hidden = false;
    document.getElementById("bel3").hidden = false;
    document.getElementById("bel4").hidden = false;
  }
}


function grabData(urlNew){
/* set up XMLHttpRequest #1 */
belTable = [];

/* set up XMLHttpRequest #1 */
var url = urlNew;
console.log(url);
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

var json1;

oReq.onload = function(e) {

  var begin_index = belTable.length;

  var arr = new Array();
  var arraybuffer = oReq.response;

  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");

  /* Call XLSX */
  var workbook = XLSX.read(bstr, {type:"binary"});

  /* DO SOMETHING WITH workbook HERE */
  var first_sheet_name = workbook.SheetNames[0];
  /* Get worksheet */
  var worksheet = workbook.Sheets[first_sheet_name];
  /*console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));*/
  json1 = XLSX.utils.sheet_to_json(worksheet,{header:1},{raw:true});

  /*document.getElementById('display3').innerHTML = json1;*/

  /*for(i = 0; i < 10; i++){
    for(y = 0; y < 4; y++){
      console.log("Scott");
      console.log(json1[i][y]);
    }
  } */
 for( i = 0; i < json1.length; i++){
   if(json1[i][0] != null){
     belTable.push([]);
     belTable[i+begin_index][0] = json1[i][0];
     belTable[i+begin_index][1] = json1[i][1];
     belTable[i+begin_index][2] = json1[i][2];
   }
 }


  var display = XLSX.utils.sheet_to_json(worksheet,{header:1});
  document.getElementById('display').innerHTML = belTable;



}

console.log(belTable);

oReq.send();
}
