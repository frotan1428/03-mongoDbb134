//------------------ DAY 05 ---------------------

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

use("school")
db.stories.bulkWrite([
    {insertOne:{"documents":{"author":"john","score":90, "views":600}}},
    {updateOne:{"filter":{"author":"mary"},"update":{$set:{"score":59}}}},
    {replaceOne:{"filter":{"author":"dave"},"replacement":{"author":"tom","score":60}}},
    {deleteMany:{"filter":{"score":{$lt:80}}}},
    {ordered:false}
])
//
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

var pipeline =[
    {$unionWith:{coll:"fictions"}},// stage to join collections
    {$sort:{"amount":-1}},// stage sort
    {$project: {
      "_id":0
    }}

]

db.attempts.aggregate(pipeline);

//TASK-3 : write a query which will display total books (in ascending order) of each 
//publishers from both collections. 

use("MEDYA")

var pipeline =[
    {$unionWith:{coll:"attempts"}},//stage to join collections .
    {$group:{"_id":"$publisher","total_book":{$sum:"$amount"}}},// stage group
    {$sort:{"total_book":1}},// sort stage
    // {$project: {
    //     "_id":0
    //   }}
]

db.fictions.aggregate(pipeline)

//TASK-4 : write a query which will calculate total revenue (from fiction and attempts) 
//of each publisher

use("MEDYA")

var pipeline =[
    {$unionWith:{coll:"fictions"}}, // stage to join collections 
    {$group:{"_id":"$publisher", "total_income":{$sum:{$multiply:["$amount","$price"]}}}} // stage to group by id .
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

// ---- how we can use lookup ------

use("MEDYA")

db.fictions.aggregate(
    {
        $lookup: {
            from:"poems",
            localField:"author",
            foreignField:"writer",
            as:"common_authors"
        }
    }
)


// QUERY1: write a query that will calculate total books and total 
// prices for each author from both collections, 

// 1 st way : 
use("MEDYA")
db.fictions.aggregate(
    {
        $lookup: {
            from:"poems",
            localField:"author",
            foreignField:"writer",
            as:"common_authors"
        }
    },
    {$unwind:{path:"$common_authors"}},
    {
        $addFields:{"total_book":{$add:["$amount","$common_authors.amount"]},
                    "total_price":{$add:["$price","$common_authors.price"]}}
    }
)
// 2nd way : 

var pipeline =[{
    $lookup: {
        from:"poems",
        localField:"author",
        foreignField:"writer",
        as:"common_authors"
    }
},
{$unwind:{path:"$common_authors"}},
{
    $addFields:{"total_book":{$add:["$amount","$common_authors.amount"]},
                "total_price":{$add:["$price","$common_authors.price"]}}
}]

db.fictions.aggregate(pipeline);
