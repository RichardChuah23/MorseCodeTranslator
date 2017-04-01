


b = [] ; 

//Function to find  the intruder 
function checkintruder(b) {
    var a = ["long", "short", "long", "long"] ; 
    var counter = 0; 
    while (counter < b.length) {
        if(a[counter]==b[counter]) { 
            console.log("checked");
            counter ++ ; 
            
            //When the array is full, shows that there is an intruder
            if (counter == 3 ) {
                console.log("Intruder Found !") ; 
                b = [] ; 
            }

        }else{ 
            //Place the long at the first of the array. 
            if(b[counter] != "long"){
            b = []; 
            return b; 
            }else {
                b = []; 
                b.push("long") ; 
                return b; 
            }
        }
    }
    return b;
};

b.push("short") ; 
b = checkintruder(b) ;
console.log("1. b list is " + b);

b.push("long") ; 
b = checkintruder(b) ;
console.log("2. b list is " + b);

b.push("short") ; 
b = checkintruder(b) ;
console.log("3. b list is " + b);

b.push("long") ; 
b = checkintruder(b) ;
console.log("4. b list is " + b);

b.push("long") ; 
b = checkintruder(b) ;
console.log("5. b list is " + b);

b.push("short") ; 
b = checkintruder(b) ;
console.log("6. b list is " + b);


console.log("final b is " , b);

