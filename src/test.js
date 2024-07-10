import { generate } from "randomstring";
import * as constant from "./constant.js";

/* ==== string divider function ==== */
function divideKeyAsChunks({token, size}) {
    if (size <= 0) {
        throw new Error("Number of chunks must be greater than zero");
    }
    const chunkSize = Math.ceil(token.length / size);
    const chunks = new Array(size);
    for (let i = 0, o = 0; i < size; ++i, o += chunkSize) {
        chunks[i] = token.substr(o, chunkSize);
    }
    return chunks;
};

/* === function returns the mutated key name my adding prefix/sufix content === */
function keysMutate({type,content,keys}){
 
    switch (type) {
        case "PREFIX":
               return keys.map((item)=> ({...item, key : (item.key)+content}))
            case "SUFIX":
               return keys.map((item)=> ({...item, key : content+(item.key)}))
        default:
            break;
    }
};

/* === function returns the encoded pattern === */
const cypherPatern = ({pattern,keys,size}) =>{
    let result = [];
    switch (pattern) {
        case 'skip1':
            result = keys.filter((_, index) => index % 1 === 0);
            break;
        case 'skip2':
            result = keys.filter((_, index) => index % 2 !== 0);
            break;
        case 'skip3':
            result = keys.filter((_, index) => index % 3 !== 0);
            break;
        case 'odd':
            result = keys.filter((_, index) => index % 2 !== 0);
            break;
        case 'even':
            result = keys.filter((_, index) => index % 2 === 0);
            break;
        case 'serial':
            result = [...keys];
            break;
        case 'reverse':
            result = [...keys].reverse();
            break;
        default:
            throw new Error("Invalid pattern selected");
    }
    result = result.slice(0, size);
    return result;
}

function generatePatternArray({keys,token, pattern,size,mutate={
    state:false,
    content:null,
    type : "PREFIX"
}}) {
    let result = [];
    let chunks = divideKeyAsChunks({token:token, size:size});
    result = cypherPatern({pattern,keys,size});
    let assignedChuncks =  result.map((key, index) => ({ key, value: chunks[index] , pattern }));
    const mergedData = mergeParentAndChild({parentKeys : keys, childData : assignedChuncks , pattern});
    if(mutate.state){
        return keysMutate({type:mutate.type,content:mutate.content, keys : mergedData})
    }
    return mergedData
};

/* === function returns the merger of encoded pattern and parent of keys === */
function mergeParentAndChild({parentKeys, childData, pattern}) {
    const result = [];
    
    // Map to quickly find child data by key
    const childMap = new Map(childData.map(obj => [obj.key, obj]));
    
    // Iterate over parentKeys to construct result
    parentKeys.forEach(parentKey => {
        if (childMap.has(parentKey)) {
            // Child data exists, use it
            result.push(childMap.get(parentKey));
        } else {
            // Child data does not exist, add fake data
            result.push({
                key: parentKey,
                value: generate(Math.random()*10),
                pattern: pattern
            });
        }
    });

    return result;
};

/* === function removes prefix/sufix from key === */
function removePrefix(inputString, prefix) {
    if (inputString.startsWith(prefix)) {
        return inputString.substring(prefix.length);
    }
    console.log(inputString , 'prepapdp - -ad--ad-')
    return inputString;
};
function removeSuffix(inputString, suffix) {
    if (inputString.endsWith(suffix)) {
        return inputString.substring(0, inputString.length - suffix.length);
    }
    return inputString; 
};

function removeMatchedStr(str1,str2){
   return str1.split(str2).join('')
}

/* === function returns the decoded pattern chunk values === */
function matchAndConcatenate({pattern,keys,size, mutate, patternArray}) {
    const concatenatedValues = [];

    if(mutate.state){
        patternArray =  patternArray?.map((item) =>  ({...item , key : removeMatchedStr(item.key , mutate.content) }) ) 
    }

    const patternMap = new Map(patternArray.map(obj => [obj.key, obj]));


    cypherPatern({pattern,keys,size}).forEach(key => {
        if (patternMap.has(key)) {
            const patternObj = patternMap.get(key);
            concatenatedValues.push(patternObj.value);
        } else {
            concatenatedValues.push(null);
        }
    });

    return concatenatedValues;
};

const patternArray = generatePatternArray({keys : constant.keys , token : constant.token, pattern :constant.pattern[3], size :5, mutate: {state : true , content : "op",type : "SUFIX"} , });
const concatData = matchAndConcatenate({keys : constant.keys, pattern :constant.pattern[3], size :5 , patternArray : patternArray , mutate : {state : true , content : "op",type : "SUFIX"} });
console.log({concat_token : concatData.join("") , decoy : patternArray});

export {
    generatePatternArray,matchAndConcatenate
}
