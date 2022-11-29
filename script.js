var National=document.createElement('div')
National.innerHTML=`<input type="text" id="txt" placeholder="  Enter the Name">
<button class="button-class" type="button" onClick="foo()">Search</button>
`
National.setAttribute('id','count')
var head=document.getElementById("header")
head.after(National)

async function foo() {
       try{
    var value = document.getElementById('value');
    if(value){
        value.innerHTML="";
    }

    

    let character= document.getElementById("txt").value
    if(!character){
        console.log('please enter nationalize name');
        alert('please enter nationalize name');
        return ;
    }

    
    var result= await  fetch(`https://api.nationalize.io?name=${character}`);
    var res= await result.json();
    console.log('result from api :',res)
        var nationalizecountries=res.country[0].country_id
        console.log(nationalizecountries)
        var nationalizecountries1=res.country[1].country_id
        console.log(nationalizecountries1)
        var nationalizeprobabilityvalue=res.country[0].probability
        console.log(nationalizeprobabilityvalue)
        var nationalizeprobabilityvalue1=res.country[1].probability
        console.log(nationalizeprobabilityvalue1)

        var arr=[]
        var arr1=[]

 
        for(let i=0;i<res.country.length;i++){
            var result=res.country[i].country_id
            var probability=res.country[i].probability
            arr.push(result)
            arr1.push(probability)
        }
        document.getElementById('txt').value="";

         document.getElementById('name').innerText=character;
         
         var res1=document.getElementById("result")
         res1.innerText=` Nationality of Top First Countries  : ${nationalizecountries} 

         Nationlity First Countries of Probability Value     : ${nationalizeprobabilityvalue}

     Nationality of Top Second Countries    :${nationalizecountries1}  

         Nationlity Second Countries of Probability Value     :  ${nationalizeprobabilityvalue1}`

         document.getElementById('search').innerHTML= 'Search based on county code and probability value : <br><br> <span>Country :  <input type="text" id="cny" placeholder="Enter the country code"> Pobability : <input type="text" id="pb"placeholder="Enter the probability value "> <button class="button-class" type="button" onclick="search()">Search</button></span>';
}
    
    catch(err){  
        console.log("Some error occured"+ err)
        alert('Please Enter Proper Name')
    }
    
}

async function search() {
    var data = document.getElementById('name').innerText;
    var result= await  fetch(`https://api.nationalize.io?name=${data}`);
    var res= await result.json();
    var pb = document.getElementById('pb').value;
    var coun = document.getElementById('cny').value;

    if(!pb && !coun){
        alert('please enter country or probability');
    }

    var arr=[]
    var arr1=[]

    for(let i=0;i<res.country.length;i++) {
        var result=res.country[i].country_id

        var probability=res.country[i].probability
        console.log('result : ',probability);
        console.log('resultcoun : ',pb);
        if(result === coun){
            arr.push(res.country[i]);
        }
        if(probability === Number(pb)){
            console.log('test');
            arr1.push(res.country[i]);
        }
    }
    console.log(arr1);
    console.log(arr.length);
    document.getElementById('txt').value="";
    var res1=document.getElementById("result")
    if(arr1.length>0){
        res1.innerText=`Country code  : ${arr1[0].country_id} 

                       Probability Value     : ${arr1[0].probability}`
    }    else  if(arr.length>0){
        res1.innerText=` Country Code : ${arr[0].country_id}  

                       Probability Value     : ${arr[0].probability}`
    }else {
        res1.innerText = "No data found";
    }

}
 


