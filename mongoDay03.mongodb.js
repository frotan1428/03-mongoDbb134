//============================= DAY 03 =======================


use("shop")
db.electronics.find()
36//find and update document which has price of 300 to 
//price 400
//name: "smart watch"
//if  the document does not exist insert it

use("shop")
db.electronics.findOneAndUpdate({"price":300},
                                {$set:{"name":"smart wacth","price":400}},
                                {upsert:true,returnNewDocuments:true})
37.1//Find the document whose price is equal to 340, 
//make the brand Gold and the price 400 and shold be clock, show the updated result on the console , 
//if there is no document, create a new one.

use("shop")
db.electronics.findOneAndUpdate({"price":{$eq:340}},
                                {$set:{"brand":"Gold","price":400}},
                                {upsert:true,returnNewDocuments:true});

// if we modify more than one documents at the same time  . What shuld we do ?

37.1 // find and update documents which price is less than 400 to name "product-1"

use("shop")
db.electronics.update({"price":{$lt:400}},
                     {$set:{"name":"product-1"}},
                     {returnNewDocuments:true,multi:true})
                     //multi : true if we chnage more than one documents .

38//. finad and update documents which price greater than 200 and name :"high"
use("shop")

// 1 st way
db.electronics.update({"price":{$gt:200}},
                     {$set:{"name":"High"}},
                     {returnNewDocuments:true,multi:true})
// 2nd way 

use("shop")
db.electronics.updateMany({"price":{$gt:200}},
{$set:{"name":"High"}})
38.1// find the documents which price is eqaul to 1000 and multiply by 2 ..

use("shop")
// 1 st way // better
db.electronics.updateMany({"price":{$gte:1000}},{$mul:{"price":2}})

// 2nd way 
db.electronics.updateMany({"price":{$eq:400}},
    {$set:{"price":400*2}})

// how we can delete a documents ==> deleteOne()  , deleteMany() , remove()
39.// delete the documents which brand is "Gold";
 use("shop")
 db.electronics.deleteOne({"brand":"Gold"})
 //  "deletedCount": 0 it means the document you want delete does not exist.
 40.// delete the documents whose name is "High"
 use("shop")
db.electronics.deleteOne({"name":{$eq:"High"}})
db.electronics.deleteOne({"name":"High"});

41 //  delete all documents with name "High"
use("shop")
db.electronics.deleteMany({"name":"High"})

// or 
use("shop")
db.electronics.remove({"name":"High"})// deprecated ..


// if we delete a docuents which does not exist. what happen ?
 42. // delete the document which name "Radio";

 use("shop")
 db.electronics.deleteMany({"name":"Radio"})
 // Delete methods do not give an error when trying to delete a non-existent document. 
//"deletedCount=0" text appears in the output section

43 //if we want delete all document from a collection  ? 

use("shop")
db.electronics.deleteMany({})
// or 
db.electronics.remove({})// deprecated ...
 
44 // insert new documents name :"loptap" , brnad :{"name: macbookAi1 m1 , modle:2022"} and city["new york","texas"]

use("shop")
db.electronics.insertOne({"name":"laptop",
"brand":{"name":"macBookAi1 m2","model":2023},
"city":["new york","texas"],"active":false});

44//if we want find the model of laptop 2022 .

use("shop")
db.electronics.find({"brand.model":2022});

// find the laptop whcich city "new york";
use("shop")
db.electronics.find({"city":"new york"});

//=================================================
//                   AGGREGATION
//=================================================
// 1) aggregation, processing of data in documents and calculated
// are operations that return results.
//
// 2) The aggregation operation can group values ​​from different documents.
//
// 3) By performing various operations on this grouped data, a unit
// A result value can be returned.
//
// 4) MongoDB allows aggregation with 3 different methods.
// a) Aggregation pipeline --> best practice...
// b) map reduction function (map reduction)
// c) Single purpose 
//
// 5) Aggregation can be compared to the Join operation in SQL.
//================================================ ==== =

//An aggregation pipeline consists of one or more stages that process documents:
// Syntax
//
// pipeline = [
// { $match : { … },
// { $group : { … },
// {$sort : {…},
//...
//]
// db.collectionName.aggregate({pipeline}, {options})
//
// $match() -> to filter data when selecting
// $group({_id : "$field"}) - >To group processed data 
//a group specification must include an _id
// $sort() -> to sort the results

// key : value
use("school")
db.grades.insertMany([
    {_id:6305, name: "A. MacDyver", "assignment":5, "points" :24},
    {_id:6308, name: "B. Batlock", "assignment":3, "points" :22},
    {_id:6312, name: "M. Tagnum", "assignment":5, "points" :30},
    {_id:6319, name: "R. Stiles", "assignment":2, "points" :12},
    {_id:6322, name: "A. MacDyver", "assignment":2, "points" :14},
    {_id:6334, name: "R. Stiles", "assignment":1, "points" :10}
    ]);
use("school")  
db.grades.find();

47// find the total score of each assignments ...

use("school")
// we have keyword var == int x =12;
var  pipeline =[
    {$match: {}},
    {$group:{"_id":"$assignment"}}
];
db.grades.aggregate(pipeline);
// 1 st way : 
use("school")
var  pipeline =[
    {$match: {}},
    {$group:{"_id":"$assignment",
    total_point :{$sum:"$points"}}},
];
db.grades.aggregate(pipeline);

// 2nd   way : 
use("school")

db.grades.aggregate([
    {$match: {}},
    {$group:{"_id":"$assignment",
    total_point :{$sum:"$points"}}},
]);

// first part is filter , the second part is Groping . The reason the first part is empty {} I use all the fields, 
//in the second part I assign it to the _id property because I want to group it according to the assignment.
// Difference between $assignment and assigment: when $ is inserted, the value is marked and remains in the other as the key.

/*
Stages: Each stage starts from stage operators which are:

$match: It is used for filtering the documents can reduce the amount of documents that are given as input to the next stage.
$project: It is used to select some specific fields from a collection.
$group: It is used to group documents based on some value.
$sort: It is used to sort the document that is rearranging them
$skip: It is used to skip n number of documents and passes the remaining documents
$limit: It is used to pass first n number of documents thus limiting them.
$out: It is used to write resulting documents to a new collection
Expressions: It refers to the name of the field in input documents for e.g. { $group : { _id : “$assigmnet“, total_points:{$sum:”$points“}}} here $id and $points are expressions.

Accumulators: These are basically used in the group stage

sum: It sums numeric values for the documents in each group
count: It counts total numbers of documents
avg: It calculates the average of all given values from all documents
min: It gets the minimum value from all the documents
max: It gets the maximum value from all the documents
first: It gets the first document from the grouping
last: It gets the last document from the grouping
*/


48.// let 's find average values of each assginments ..

use("school")
var  pipeline =[
    {$match: {}},
    {$group:{"_id":"$assignment",
    average :{$avg:"$points"}}},
];
db.grades.aggregate(pipeline);

49 // Let's find the minimum point values ​​of each assignment

use("school")
var  pipeline =[
    {$match: {}},
    {$group:{"_id":"$assignment",
    min_points :{$min:"$points"}}},
];
db.grades.aggregate(pipeline);

50 // find the average number of points for filed(record) which less than 4  assignments .

use("school")
var  pipeline =[
    {$match: {"assignment": {$lt:4}}},
    {$group:{"_id":"$assignment",
    average :{$avg:"$points"}}},
    {$sort: {
      "average": -1
    }}
];
db.grades.aggregate(pipeline);
51// find the total number of points of documents whose name start with A;

use("school")
var  pipeline =[
    {$match: {"name":{$regex:"^A"}}},
    {$group:{"_id":null,
    total_points  :{$sum:"$points"}}},
];
db.grades.aggregate(pipeline);

use("school")
var  pipeline =[
    {$match: {"name":{$regex:"^A"}}},
    {$group:{"_id":"",
    total_points  :{$sum:"$points"}}},
];
db.grades.aggregate(pipeline);

52 //Find the total number of points of documents whose names end with s


use("school")
var  pipeline =[
    {$match: {"name":{$regex:"s$"}}},
    {$group:{"_id":"",
    total_points  :{$sum:"$points"}}},
];
db.grades.aggregate(pipeline);


















