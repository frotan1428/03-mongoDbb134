//=======================================
//              DAY-01 
//====================================

1// to clean the terminal
//--cls

2//to create db named shop
//use shop

3 //to see the current db
//db

4//to list all databasess
//show dbs

5// to create collection named customer
db.createCollection("customer")

6//to see existing collections
//show collections

7//to delete collection
db.customers.drop()

8. //to delete database
db.dropDatabase()

9// to insert documents inside collecion
db.electronics.insertOne({"name":"TV", "price": 240})

10//to insert multiple documents 
db.electronics.insertOne({"name":"TV", "price": 240})

//insert used to be used to insert single or multiple documement, 
//but it is depricate

//for key single, double quates are used. 
//for value quotes are used if the value is string 

//we add documents without creating collection. collection will be created


11//to see all documents 
db.electronics.find()
db.electronics.find().pretty() //pretty()is used to format the 
//json document readable 

12// to bring first two documetns
db.electronics.find().limit(2)

13// to bring 3rd document
db.electronics.find().skip(2).limit(1)

14// to bring 4th and 5th documents
db.electronics.find().skip(3).limit(2)

15//to get document named "TV"
db.electronics.find({"name":"TV"})

//find({filter})

16// to bring document where name is "TV", and brand is LG

db.electronics.find({"name":"TV", "brand":"LG"})
//to bring the same result using and operator
db.electronics.find({$and:[{"name":"TV"},{"brand":"LG"}]})

17//to bring documents where name is TV or oppo
db.electronics.find({$or:[{"name":"TV"}, {"name":"oppo"}]})


18//to bring just prices of TV
db.electronics.find({"name":"TV"},{"price":1})

19//to not to id for the output
db.electronics.find({"name":"TV"},{"price":1, "_id":0})

//find({filter}, {projection}) //we can decide the fields using 0, 1

20// to bring all documents' name and price
db.electronics.find({},{"name":1, "price":1, "_id":0})

21//to sort previous output according to price
db.electronics.find({},{"name":1, "price":1, "_id":0}).sort("price")

//sor() by default sort in ASC order
//if you want to in DESC order then 
db.electronics.find({},{"name":1, "price":1, "_id":0}).sort({"price":-1})

22// to bring first document from collection
db.electronics.find().limit(1)

OR
db.electronics.findOne()

23// to bring first document which has name of "laptop"
db.electronics.find({name:"laptop"}).limit(1)
OR 
db.electronics.findOne({"name":"laptop"})
//=======================================
//              DAY-02
//====================================

24// Comparison Operators
/*
	
		Equal to              ==> $eq
		Less Than             ==> $lt
		Greater Than          ==> $gt
		less than or equal    ==> $lte
		greater than or equal ==> $gte
		not equal			  ==> $ne
		inside array 		  ==> $in
		not inside array	  ==>$nin

        */

25// to bring document which has price of 260
db.electronics.find({"price": 260})

OR

db.electronics.find({"price":{$eq:260}})


26//if i do not want to see id in above output
db.electronics.find({"price":{$eq:260}},  {"_id":0})

27//to bring documents where price is greater than or equal 300
db.electronics.find({"price":{$gte:300}}, {"_id":0})

28// to bring documents where price is equal to 600, 700 or 800

//using or:
db.electronics.find({$or:[{"price":600}, {"price":700}, {"price":800}]})

//using $in
db.electronics.find({"price":{$in:[600, 700, 800]}})

29//// to bring documents where price is not equal to 600, 700 or 800
db.electronics.find({"price":{$nin:[600, 700, 800]}})


//======================== UPDATE ==========================

//=================================================================
//            findOneAndUpdate() - findOneAndReplace()
//=================================================================

// A - findOneAndReplace() 
//----------------------------
/*
	1) Searches the document, removes everything inside this document and sets 
		the entries of the given replacement document.
	2) not entered fields will removed (looks like PUT method in API)
	3) it returns the original document (document before update )

// B - findOneAndUpdate() 
//----------------------------
	1) searches the document and updates just the entries in the given update 
		document. The other entries in the found document will remain.
		(looks like PATCH method in API)
	2) In addition, we can use different atomic operators such as $set(to set directly), $unset, $inc(to increase or decrease), 
		$mul(to multiply)etc., with the update method.
	3) it returns the original document (document before update )


//=================================================================
		NOTE: both methods return original document (document before update)
		syntax: ({filter}, {update}, {options})
*/

30// replace document where price is greater than 700 
	//with name "samsung updated s23"
	//pric 850
	db.electronics.findOneAndReplace({"price":{$gt:700}}, {"name":"samsung updated s23", "price":850})	


31//replace document which has lowest price where price is above 200
// with name "cheapest price"
 
db.electronics.findOneAndReplace({"price":{$gt:200}}, {"name":"cheapest item"}, {sort:{"price":1}})

32//replace document which has highest price where price is above 200
// with name "most expensive item"

db.electronics.findOneAndReplace({"price":{$gt:200}}, {"name":"most expensive item"}, {sort:{"price":-1}})


33//update document which has the highest price where price is below 700
// to name "updated item"
db.electronics.findOneAndUpdate({"price":{$lt:700}}, {$set:{"name":"updated item"}}, {sort:{"price":-1}})


34// update document which has the lowest price where price is above or eqaul to 700 with 
	// new field "condition": "new"

db.electronics.findOneAndUpdate({"price":{$lte:700}}, {$set:{"condition":"new"}}, {sort:{"price":-1}})

// vscode is started .....


use ("shop");
db.electronics.find();

35// find and update document where price is 600 to 
//name "laptop" and price 650 
//and display updated document

use ("shop");
db.electronics.findOneAndUpdate({"price":600},
                                {$set:{"name":"latop", "price":650}},
                                {returnNewDocument: true})

36//find and update document which has price of 199 to 
//price 299
//name: "smart watch"
//it the document does not exist insert it

use ("shop");
db.electronics.findOneAndUpdate({"price":199}, 
                                {$set:{"name":"smart watch", "pice":299}},
                                {upsert: true, returnNewDocument:true})

                                //upsert = update + insert

//=======================================
//              DAY-03
//====================================


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

//=======================================
//              DAY-04
//====================================
1 // Find the number of documents with a points less than 19

//first way: find() + count()
use("school");
db.grades.find({"points":{$lt:19}}).count()

//second way : use aggregate with cout
use("school");
var pipeline =[
  {$match:{"points":{$lt:19}}}, //filter
  {$count:"points less than 19"} //count the documents and add new field name
];

db.grades.aggregate(pipeline);

use("school")
db.exams.insertMany(
[{"student":"dave", "midterm":80,  "final":100},
{"student":"dave",  "midterm":85,  "final":52},
{"student":"fred",  "midterm":60,  "final":100},
{"student":"wilma", "midterm":55,  "final":50},
{"student":"barnie","midterm":60,  "final":75},
{"student":"wilma", "midterm":94,  "final":99},
{"student":"betty", "midterm":95,  "final":91}])


use("school")
db.accounting.insertMany(
[{"name":"dave", "expense":[-80, -40, -50, -120], "earn":[100, 150]},
{"name":"dave",  "expense":[-60, -30, -20],       "earn":[200, 50, 130]},
{"name":"fred",  "expense":[-80, -40, -50],       "earn":[300, 450]},
{"name":"wilma", "expense":[-80, -120],           "earn":[500, 50, 70, 10]},
{"name":"barnie","expense":[-140, -50, -120],     "earn":[400]},
{"name":"wilma", "expense":[-120],                "earn":[22, 375, 65]},
{"name":"betty", "expense":[-180, -40, -70, -12], "earn":[500, 650, 400]}]);


2//to add temproray fields we use $addFields
//2 to create temporary field which will store sum of midterm and final

use("school");
//db.exams.aggregate({$addFields:{"results":{$sum:["$midterm", "$final"]}, successfull: true}})
db.exams.aggregate({$addFields:{"results":{$add:["$midterm", "$final"]}, successfull: true}})

//3a//find total expense and total earn for each document from accounting

use("school");
db.accounting.aggregate({$addFields:{"total_expense":{$sum:"$expense"}, 
                                    "total_earn":{$sum:"$earn"}}});

//3b//find total expense and total earn, and balance from accounting collection

use("school");
var pipeline = [
  {$addFields:{"total_expense":{$sum:"$expense"}, 
                                    "total_earn":{$sum:"$earn"}}},

  {$addFields:{"balance":{$add:["$total_expense", "$total_earn"]}}}
                
]
db.accounting.aggregate(pipeline)

//3c//sort the balance in desc order in prev.example

use("school");
var pipeline = [
  {$addFields:{"total_expense":{$sum:"$expense"}, 
                                    "total_earn":{$sum:"$earn"}}},

  {$addFields:{"balance":{$add:["$total_expense", "$total_earn"]}}},

  {$sort:{"balance":-1}}
                
]
db.accounting.aggregate(pipeline)
/*
//without using variable:pipeline


db.accounting.aggregate([
  {$addFields:{"total_expense":{$sum:"$expense"}, 
                                    "total_earn":{$sum:"$earn"}}},

  {$addFields:{"balance":{$add:["$total_expense", "$total_earn"]}}},

  {$sort:{"balance":-1}}
                
])
*/
//3d//if we want to display name and  fields we added ? 
//1st way
use("school");
var pipeline = [
  {$addFields:{"total_expense":{$sum:"$expense"}, 
                                    "total_earn":{$sum:"$earn"}}},

  {$addFields:{"balance":{$add:["$total_expense", "$total_earn"]}}},

  {$sort:{"balance":-1}},
  {$project:{"_id":0, "name":1, "total_expense":1, "total_earn":1, "balance":1}}
  //for fields we want to project, we used 1
                
]
db.accounting.aggregate(pipeline)

//2nd way
use("school");
var pipeline = [
  {$addFields:{"total_expense":{$sum:"$expense"}, 
                                    "total_earn":{$sum:"$earn"}}},

  {$addFields:{"balance":{$add:["$total_expense", "$total_earn"]}}},

  {$sort:{"balance":-1}},
  {$project:{"_id":0, "earn":0, "expense":0}}
  //for fields we don't want to project, we used 0
                
]
db.accounting.aggregate(pipeline)


use("school");
db.accounting.find()

//=======================================
//              DAY-05
//====================================

//========================================
//          bulkWrite()
//========================================
//bulkWrite() method provides the ability to perform bulk insert,
// update, and delete operations. bulkWrite([])

use("school")
db.stories.insertMany(
[{"author":"dave", "score":75, "views": 200},
{"author":"chris", "score":90, "views": 100},
{"author":"dave", "score":35, "views": 3000},
{"author":"mary", "score":80, "views": 350},
{"author":"dave", "score":54, "views": 333},
{"author":"mary", "score":97, "views": 2000}]);


// Task-1 : Run following commands in one method
//    * Insert {"author":"john","score":90, "views":600} ,
//    * update first document's score to 59 where author is "mary",        
//    * replace first document to {"author":"tom","score":60} where author is "dave"
//    * delete  document where score are less than 80


use("school");
db.stories.bulkWrite([
    {insertOne:{"document":{"author":"john","score":90, "views":600}}},
    {updateOne:{"filter":{"author":"mary"}, "update":{$set:{"score":59}}}},
    {replaceOne:{"filter":{"author":"dave"}, "replacement":{"author":"tom","score":60}}},
    {deleteMany:{"filter":{"score":{$lt:80}}}},
    { ordered : false }

]);


//=========================================================
//                  UNIONWITH ( Full Join )
//=========================================================
// how to get data from two different collections
// JOIN is used in SQL 
//=========================================================    


use("MEDYA")
db.fictions.insertMany(
[{"author": "Mehmet Bak",  "price" : 60, "publisher" : "Yildiz",   "amount": 1000 },//60000
{"author" : "Ali Gel",     "price" : 75, "publisher" : "MaviAy",   "amount": 1200 },
{"author" : "Su Ak",       "price" : 90, "publisher" : "Caliskan", "amount": 2200},
{"author" : "Meryem Can",  "price" : 35, "publisher" : "MorEv",    "amount": 560},
{"author" : "Pelin Su",    "price" : 80, "publisher" : "Hedef",    "amount": 890 },
{"author" : "Suat Ok",     "price" : 54, "publisher" : "Sinir",    "amount": 245}]);



use("MEDYA")
db.attempts.insertMany(
[{"author": "Mehmet Bak",  "price" : 34, "publisher" : "Yildiz", "amount": 400 },//13600
{"author" : "Deniz Kos",   "price" : 44, "publisher" : "Yildiz", "amount": 350 },//15400
{"author" : "Su Ak",       "price" : 50, "publisher" : "MorEv", "amount": 200},
{"author" : "İsmet Kaç",   "price" : 25, "publisher" : "Hedef","amount": 800},
{"author" : "Ali Gel",     "price" : 40, "publisher" : "Hedef", "amount": 1200 },
{"author" : "Meryem Can",  "price" : 22, "publisher" : "MaviAy","amount": 300}]);

//TASK-2 :list all the documents from both collections and sort in desc order on "amount" field
// do not display id field

use("MEDYA")
var pipeline = [
    {$unionWith:{coll:"attempts"}}, //stage to join collection
    {$sort:{"amount":-1}}, //stage to sort
    {$project:{"_id":-0}} //stage to project fields
]

db.fictions.aggregate(pipeline);

//TASK-3 : write a query which will display total books (in ascending order) of each 
//publishers from both collections. 


use("MEDYA")
var pipeline = [
    {$unionWith:{coll:"attempts"}}, //stage to join collection
    {$group:{"_id":"$publisher", "total_books":{$sum:"$amount"}}}, //stage to group
    {$sort:{"total_books":1}}, //stage to sort
    //{$project:{"_id":-0}} //stage to project fields
]

db.fictions.aggregate(pipeline);


//TASK-4 : write a query which will calculate total revenue (from fiction and attempts) 
//of each publisher

use("MEDYA")
var pipeline = [
    {$unionWith:{coll:"fictions"}}, //stage to join collection
    {$group:{"_id":"$publisher", "total_income":{$sum:{$multiply:["$amount", "$price"]}}}} //stage to group
    
]
db.attempts.aggregate(pipeline);


//==================================================================================
//                       $LOOKUP (LEFT JOIN in SQL) 
//    //returns unshared documents of first collection and shared documents 
    // with other joined collection  
//    {
//      $lookup:
//      {
//        from: <collection to join>,
//        localField: <field from the input documents>,
//        foreignField: <field from the documents of the "from" collection>,
//        as: <output array field>
//      },
//      { $unwind:<field path> }//passes field from first stage to next stage
//    }
//==================================================================================


use("MEDYA")
db.fictions.insertMany(
[{"author": "Mehmet Bak",  "price" : 60, "publisher" : "Yildiz",   "amount": 1000 },//60000
{"author" : "Ali Gel",     "price" : 75, "publisher" : "MaviAy",   "amount": 1200 },
{"author" : "Su Ak",       "price" : 90, "publisher" : "Caliskan", "amount": 2200},
{"author" : "Meryem Can",  "price" : 35, "publisher" : "MorEv",    "amount": 560},
{"author" : "Pelin Su",    "price" : 80, "publisher" : "Hedef",    "amount": 890 },
{"author" : "Suat Ok",     "price" : 54, "publisher" : "Sinir",    "amount": 245}]);

use("MEDYA")
db.poems.insertMany(
[{"writer": "Mehmet Bak",   "price" : 34, "publisher" : "Yildiz", "amount": 400 },
{"writer" : "Ali Gel",      "price" : 40, "publisher" : "Hedef",  "amount": 1200 },
{"writer" : "Su Ak",        "price" : 50, "publisher" : "MorEv",  "amount": 200},
{"writer" : "Meryem Can",   "price" : 22, "publisher" : "MaviAy", "amount": 300},
{"writer" : "Deniz Kos",    "price" : 44, "publisher" : "Yildiz", "amount": 350 },
{"writer" : "İsmet Kaç",    "price" : 25, "publisher" : "Hedef",  "amount": 800}]);




//---------- how we can use lookup() -----------

use("MEDYA");
db.fictions.aggregate(
    
   { $lookup: {
      from: "poems",
      localField: "author",
      foreignField: "writer",
      as: "common_authors"
    }}
)

// QUERY1: write a query that will calculate total books and total 
// prices for each author from both collections, 


use("MEDYA");

var pipeline = [

    {$lookup: {
      from: "poems",
      localField: "author",
      foreignField: "writer",
      as: "common_authors"
    }}, //stage to left join //lookup

//     {$unwind:{path:"$common_authors"}},

//     {$addFields:{"total_books":{$add:["$amount", "$common_authors.amount"]},
//                  "total_price":{$add:["$price","$common_authors.price" ]} }} //stage to add new field
 ]

db.fictions.aggregate(pipeline);



















































































