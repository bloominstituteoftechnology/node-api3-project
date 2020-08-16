

// [p]rint[t]his: first variable is for description of second variable object returned: third value is any value when entered will debug the object
// Use example --> pt("Object of characters",objCharcters,'yes') or pt("regular console log with no object") or pt("console log seperated by : with object to follow",obj)
function pt(description,objectDescribed,debug){
    objectDescribed?console.log(`${description}: ${objectDescribed}`):console.log(`${description}`)
    debug?debugHelper(objectDescribed,description):null;
}

// Helps determine object type and value of all in one test
// First value is the object to test and the second value is optional name of test
function debugHelper(objectToCheck,nameOfDebug){
    nameOfDebug?pt('\nDebug Name:', nameOfDebug):null;
    objectToCheck != null || objectToCheck != undefined ?
        (pt('\nType',typeof(objectToCheck)),
            (Array.isArray(objectToCheck)?
                pt('isArray?:',Array.isArray(objectToCheck)):
                pt('isArray?:','false')),
            pt('Value',objectToCheck),
            pt("Length",objectToCheck.length)):
        objectToCheck === null?
            pt("This is equal to null"):
            objectToCheck === undefined?
                pt("This is undefined."):
                pt("I dunno | not null not undefined but kinda just not working.");
    if(typeof(objectToCheck) !== 'string' && typeof(objectToCheck) !== 'number' && objectToCheck != null && objectToCheck != undefined){

        try{
            pt('\nAttempting to map over object::')
            objectToCheck.map(item=>{
                pt(item)
            })
            pt("::Map over Object completed\n")
        }
        catch (e) {
            pt("Mapping over object failed.\n")
        }
        // try{
        //     pt("\nAttempting to forEach over object::")
        //     objectToCheck.forEach((item)=>{
        //         pt(item)
        //     })
        //     pt("forEach over object completed::\n")
        // }
        // catch (e) {
        //     pt("forEach over object failed::\n")
        // }
        try{
            pt("\nAttempting to get key|value pairs::")
            for(const property in objectToCheck){
                try{
                    for(const pp in objectToCheck[property]){
                        pt(pp,objectToCheck[property][pp])
                    }
                }

                catch (e) {
                    pt(property,objectToCheck[property])
                }
                pt('')
            }

            pt("::Attempt complete\n")
        }
        catch (e) {
            pt("Getting key|value pairs failed\n")
        }
    }
}






























module.exports = {
    pt,
    debugHelper,

}




