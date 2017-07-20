using Microsoft.ServiceFabric.Services.Queryable;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Queryable.Controller;

namespace Basic.Web.Controllers
{
	public class QueryController : QueryableController
	{
		/// <summary>
		/// Returns OData metadata about the queryable reliable collections
		/// and types in the application/service.  If the service name
		/// is 'fabric:/MyApp/MyService', the HTTP Uri should be formatted as:
		/// 
		/// - GET query/MyApp/MyService/$metadata
		/// </summary>
		[HttpGet]
		[Route("query/{application}/{service}/$metadata")]
		public Task<IActionResult> GetMetadata(string application, string service)
		{
			return GetMetadataAsync(application, service);
		}

		/// <summary>
		/// Queries the given reliable collection in the queryable service
		/// using the OData query language. Example queries:
		/// 
		/// Get 10 items from the reliable dictionary named 'my-dictionary' in the service named 'fabric:/MyApp/MyService'.
		/// - GET query/MyApp/MyService/my-dictionary?$top=10
		/// 
		/// Get 10 items with Quantity between 2 and 4, inclusively.
		/// - GET query/MyApp/MyService/my-dictionary?$top=10&$filter=Quantity ge 2 and Quantity le 4
		/// 
		/// Get 10 items, returning only the Price and Quantity properties, sorted by Price in descending order.
		/// - GET query/MyApp/MyService/my-dictionary?$top=10&$select=Price,Quantity&$orderby=Price desc
		/// </summary>
		[HttpGet]
		[Route("query/{application}/{service}/{collection}")]
		public Task<IActionResult> Query(string application, string service, string collection)
		{
			return QueryAsync(application, service, collection);
		}


		/// <summary>
		/// Deletes appropriate key & corresponding value from the given reliable collection in the queryable service.
		/// SINGLE DELETE:
		/// - DELETE /query/BasicApp/ProductSvc/products and in Body provide a Json:
		/// In Body: [{
		///"Key": "sku-218",
		/// "PartitionId": "946fd004-37aa-4ea6-94a0-3013d8956fef"
		///}]
		/// Record belonging to the key provided in the JSON Body of HTTP Request is located in the given partitionID and removed from it.
		/// 
		/// BATCH DELETE (Provide an Array of keys in JSON format inside body of HTTP Delete request to delete them all (with kindness ;) ). 
		/// -DELETE /query/BasicApp/ProductSvc/products
		/// In Body: [{
		///"Key": "sku-218",
		/// "PartitionId": "946fd004-37aa-4ea6-94a0-3013d8956fef"
		///},{
		///"Key": "sku-217",
		/// "PartitionId": "946fd004-37aa-4ea6-94a0-3013d8956fef"
		///}]
		/// 
		/// DELETE A Key from All Partitions :
		/// -DELETE /query/BasicApp/ProductSvc/products 
		/// In Body : 
		/// [{
		///"Key": "sku-218"
		///}]
		/// 
		/// </summary>

		[HttpDelete]
		[Route("query/{application}/{service}/{collection}")]
		public Task<IActionResult> Delete(string application, string service, string collection,
			[FromBody] ValueViewModel[] obj)
		{
			return base.DeleteAsync(application, service, collection, obj);
		}

		/// <summary>
		/// Adds appropriate key & corresponding value to the given reliable collection in the queryable service.
		/// SINGLE ADD:
		/// - POST /query/BasicApp/ProductSvc/products and in Body provide a Json:
		/// In Body: [{
		///	        "Key": "sku-218",
		///	        "Value":  {
		///	            "Sku": "sku-218",
		///	            "Price": 10.95,
		///	            "Quantity":46
		///	        },
		///	        "PartitionId": "946fd004-37aa-4ea6-94a0-3013d8956fef"
		///	    }
		///	    ]
		/// Record belonging to the key provided in the JSON Body of HTTP POST Request is added to a partition ID mentioned, if its not existing already.
		/// Incase Partition ID is not mentioned, Record is added to random partition ID.
		/// 
		/// 
		/// BATCH ADD (Provide an Array of keys & values with optional partitionID in JSON format inside body of HTTP POST request to add them all.). 
		/// -POST /query/BasicApp/ProductSvc/products
		/// In Body: [{
		///             "Key": "sku-218",
		///             "PartitionId": "946fd004-37aa-4ea6-94a0-3013d8956fef"
		///           },{
		///             "Key": "sku-217",
		///             "PartitionId": "946fd004-37aa-4ea6-94a0-3013d8956fef"
		///          }]
		/// 
		/// ADD a Key & Value to a random Partition:
		/// -POST /query/BasicApp/ProductSvc/products 
		/// In Body : 
		/// [{
		///"Key": "sku-218"
		///}]
		/// 
		/// </summary>
		[HttpPost]
		[Route("query/{application}/{service}/{collection}")]
		public Task<IActionResult> Add(string application, string service, string collection,
			[FromBody] ValueViewModel[] obj)
		{
			return base.AddAsync(application, service, collection, obj);
		}



		/*
<div>

    <script src="/js/editablegrid.js"></script>
 
    <script src="/js/editablegrid_renderers.js"></script>
   
    <script src="/js/editablegrid_editors.js"></script>
   
    <script src="/js/editablegrid_validators.js"></script>

    <script src="/js/editablegrid_utils.js"></script>

    <script src="/js/editablegrid_charts.js"></script>
    <link rel="stylesheet" href="/css/editablegrid.css" type="text/css" media="screen">

    <style>
        body {
            font-family: 'lucida grande', tahoma, verdana, arial, sans-serif;
            font-size: 11px;
        }

        h1 {
            font-size: 15px;
        }

        a {
            color: #548dc4;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        table.testgrid {
            border-collapse: collapse;
            border: 1px solid #CCB;
            width: 800px;
        }

        table.testgrid td, table.testgrid th {
            padding: 5px;
            border: 1px solid #E0E0E0;
        }

        table.testgrid th {
            background: #E5E5E5;
            text-align: left;
        }

        input.invalid {
            background: red;
            color: #FDFDFD;
        }
    </style>

    <script>
        window.onload = function () {
            var editableGrid = new EditableGrid("DemoGridJSON");
            editableGrid.tableLoaded = function () { this.renderGrid("tablecontent", "testgrid"); };
            editableGrid.loadJSON("grid.json");
        }
    </script>
</div>	
*/
		/*
<div class="row">
    <!-- Heading row -->
    <div class="row">
        <div class="col-md-12">
            <h1>Service Fabric Queryable</h1>
            
        </div>
    </div>
    <!-- Input, Table and Messages -->
    
    <style>
        table, th, td 
        {
            margin:10px 0;
            border:solid 1px #333;
            padding:2px 4px;
            font:15px Verdana;
        }
        th {
            font-weight:bold;
        }
    </style>
    <div class="row">
        <div class="panel panel-primary">
            <div class="panel-body">
               
                <!-- Input and Table -->
                <div class="col-md-6">
                    <!-- Input -->
                    <div class="row">
                        <div class="col-md-6">
                            <input type="text" class="form-control" id="keyInput" placeholder="key" tabindex="1">
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control" id="valueInput" placeholder="value" tabindex="2">
                        </div>
                    </div>
                    <div class="row top-buffer">
                        <div class="col-md-6">
                            <button class="btn btn-primary btn-block" onclick="addStatefulBackendServiceKeyValuePair()" type="button" id="addStatefulBackendServiceKeyValuePair" tabindex="3">Add</button>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-primary btn-block" onclick="updateStatefulBackendServiceKeyValuePair()" type="button" id="updateStatefulBackendServiceKeyValuePair" tabindex="3">Update</button>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-primary btn-block" onclick="deleteStatefulBackendServiceKeyValuePair()" type="button" id="deleteStatefulBackendServiceKeyValuePair" tabindex="3">Delete</button>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-primary btn-block" onclick="getStatefulBackendServiceDictionary()" type="button" id="getStatefulBackendServiceDictionary" tabindex="4">Show All</button>
                            <div id="showData"></div>
                        </div>
                        
                        <div>
                            
                            <script>
                                var editableGrid = new EditableGrid("DemoGridJSON");
                                editableGrid.tableLoaded = function () { this.renderGrid("tablecontent", "testgrid"); };
                                editableGrid.loadJSON("grid.json");
                            </script>
                            

                        </div>
                       
                        
                    </div>
                    <!-- Table -->
                    <div class="row top-buffer">
                        <div class="col-md-12 table-responsive" style="overflow: auto; height:150px">
                            <table class="table table-striped" id="statefulBackendServiceTable">
                                <tr>
                                    <th>Key</th>
                                    <th>Value</th>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
*/
		/// <summary>
		/// Updates appropriate key & corresponding value to the given reliable collection in the queryable service.
		/// SINGLE UPDATE:
		/// - PUT /query/BasicApp/ProductSvc/products and in Body provide a Json:
		/// In Body: [{
		///	        "Key": "sku-217",
		///	        "Value":  {
		///	            "Sku": "sku-217",
		///	            "Price": 11.95,
		///	            "Quantity":40
		///	        },
		///	        "PartitionId": "946fd004-37aa-4ea6-94a0-3013d8956fef"
		///	    }
		///	    ]
		/// Record belonging to the key provided in the JSON Body of HTTP PUT Request is loacted in the partition ID mentioned & is updated with the new value, if its not existing already then its added..
		/// Incase Partition ID is not mentioned, Records with matching key from all partitions are located & updated with the new value.
		/// 
		/// 
		/// BATCH UPDATE (Provide an Array of keys & values with optional partitionID in JSON format inside body of HTTP PUT request to update all the keys with new values.). 
		/// -PUT /query/BasicApp/ProductSvc/products
		/// In Body: [{
		///	        "Key": "sku-217",
		///	        "Value":  {
		///	            "Sku": "sku-217",
		///	            "Price": 11.95,
		///	            "Quantity":40
		///	        },
		///	        "PartitionId": "946fd004-37aa-4ea6-94a0-3013d8956fef"
		///	    },
		///     {
		///	        "Key": "sku-218",
		///	        "Value":  {
		///	            "Sku": "sku-218",
		///	            "Price": 11.85,
		///	            "Quantity":41
		///	        },
		///	        "PartitionId": "a76fd004-37aa-4ea6-94a0-3013d8956fef"
		///	    }]
		/// 
		/// Update a Key with New Value in all Partitions:
		/// -PUT /query/BasicApp/ProductSvc/products 
		/// In Body : 
		///     [{
		///         "Key": "sku-218"
		///       },
		///         "Value":  {
		///	            "Sku": "sku-218",
		///	            "Price": 11.85,
		///	            "Quantity":41
		///	    }]
		/// 
		/// </summary>
		[HttpPut]
		[Route("query/{application}/{service}/{collection}")]
		public Task<IActionResult> Update(string application, string service, string collection,
			[FromBody] ValueViewModel[] obj)
		{
			return base.UpdateAsync(application, service, collection, obj);
		}
	}
}
