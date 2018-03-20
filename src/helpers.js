const axios = require('axios');
const queryString = require('query-string');

const apiRootUrl = 'https://us-central1-test-api-197100.cloudfunctions.net/ocwScraper/';

function removeDuplicateCourses(courses){
    let result = [];
    courses.forEach((course) => {
        if(result.length > 0){
            let found = result.find(function(element) {
                return element.name == course.name || element.url == course.url;
                });
            if(found === undefined){
                result.push(course);
            }
        } else {
            result.push(course);
        }
        
    });            
    return result;
}

function httpGet(url, callback){
    axios.get(url)
    .then((response) => {
        callback(response.data);
    })
    .catch(function (error) {
        console.log(error);
      });
}

function getURLParamByName(name, url){
    return queryString.parse(url)[name];
}

module.exports.removeDuplicateCourses = removeDuplicateCourses;
module.exports.httpGet = httpGet;
module.exports.apiRootUrl = apiRootUrl;
module.exports.getURLParamByName = getURLParamByName;