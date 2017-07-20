

/* This function calls the StatefulBackendController's HTTP GET method to get a collection of KeyValuePairs from the reliable dictionary in the StatefulBackendService */

function mygrid(x) {


    var jsondata =

    {
        "metadata": [
            { "name": "name", "label": "NAME", "datatype": "string", "editable": true },
            { "name": "firstname", "label": "FIRSTNAME", "datatype": "string", "editable": true },
            { "name": "age", "label": "AGE", "datatype": "integer", "editable": true },
            { "name": "height", "label": "HEIGHT", "datatype": "double(m,2)", "editable": true },
            {
                "name": "country", "label": "COUNTRY", "datatype": "string", "editable": true, "values":
                {
                    "Europe": { "be": "Belgium", "fr": "France", "uk": "Great-Britain", "nl": "Nederland" },
                    "America": { "br": "Brazil", "ca": "Canada", "us": "USA" },
                    "Africa": { "ng": "Nigeria", "za": "South-Africa", "zw": "Zimbabwe" }
                }
            },
            { "name": "email", "label": "EMAIL", "datatype": "email", "editable": true },
            { "name": "freelance", "label": "FREELANCE", "datatype": "boolean", "editable": true },
            {
                "name": "lastvisit",
                "label": "LAST VISIT",
                "datatype": "date",
                "editable": true
            }
        ],

        "data": [
            { "id": 1, "values": { "country": "uk", "age": 33, "name": "Duke", "firstname": "Patience", "height": 1.842, "email": "patience.duke@gmail.com", "lastvisit": "11\/12\/2002" } },
            { "id": 2, "values": ["Rogers", "Denise", 59, 1.627, "us", "rogers.d@gmail.com", "", "07\/05\/2003"] },
            { "id": 3, "values": { "name": "Dujardin", "firstname": "Antoine", "age": 21, "height": 1.73, "country": "fr", "email": "felix.compton@yahoo.fr", "freelance": true, "lastvisit": "21\/02\/1999" } },
            { "id": 4, "values": { "name": "Conway", "firstname": "Coby", "age": 47, "height": 1.96, "country": "za", "email": "coby@conwayinc.com", "freelance": true, "lastvisit": "01\/12\/2007" } },
            { "id": 5, "values": { "name": "Shannon", "firstname": "Rana", "age": 24, "height": 1.56, "country": "nl", "email": "ranna.shannon@hotmail.com", "freelance": false, "lastvisit": "07\/10\/2009" } },
            { "id": 6, "values": { "name": "Benton", "firstname": "Jasmine", "age": 61, "height": 1.71, "country": "ca", "email": "jasmine.benton@yahoo.com", "freelance": false, "lastvisit": "13\/01\/2009" } },
            { "id": 7, "values": { "name": "Belletoise", "firstname": "André", "age": 31, "height": 1.84, "country": "be", "email": "belletoise@kiloutou.be", "freelance": true, "lastvisit": "" } },
            { "id": 8, "values": { "name": "Santa-Maria", "firstname": "Martin", "age": 37, "height": 1.80, "country": "br", "email": "martin.sm@gmail.com", "freelance": false, "lastvisit": "12\/06\/1995" } },
            { "id": 9, "values": { "name": "Dieumerci", "firstname": "Amédé", "age": 37, "height": 1.81, "country": "ng", "email": "dieumerci@gmail.com", "freelance": true, "lastvisit": "05\/07\/2009" } },
            { "id": 10, "values": { "name": "Morin", "firstname": "Wanthus", "age": 46, "height": 1.77, "country": "zw", "email": "morin.x@yahoo.json.com", "freelance": false, "lastvisit": "04\/03\/2004" } }
        ]
    }




    var fdata =
    {
        metadata: [{ "name": "PartitionId", "editable": false },
            { "name": "Key", "editable": true },
            { "name": "Value/Sku", "editable": true },
            { "name": "Value/Price", "editable": true },
            { "name": "Value/Quantity", "editable": true }]
        ,
        data: x
    }

    editableGrid.load(jsondata);
    EditableGrid.prototype.refreshGrid();
    //editableGrid.tableLoaded

    // editableGrid.loadJSON("/js/grid.json");
    // xz= JSON.stringify(jsondata)
    //editableGrid.loadJSONFromString(JSON.stringify(jsondata));
}


function getDictionary(s) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            end = new Date().getTime();
            if (http.status < 400) {
                var returnData = JSON.stringify(JSON.flatten1(JSON.parse(http.responseText)), null, "\t");
                var inArray = [];
                inArray = arrayFrom(JSON.parse(http.responseText));
                var outArray = [];
                for (var row in inArray) {
                    outArray[outArray.length] = parse_object(inArray[row]);
                }
                if (outArray) {
                    //var editableGrid = new EditableGrid("DemoGridJSON");
                    //editableGrid.tableLoaded = function () { this.renderGrid("tablecontent", "testgrid"); };
                    //var mydata = {
                    //  data : outArray
                    //}
                    var editableGrid = new EditableGrid("DemoGridJSON");

                    // editableGrid.tableLoaded = function () { this.renderGrid("tablecontent", "testgrid"); };
                    var jsondata =

                    {
                        "metadata": [
                            { "name": "name", "label": "NAME", "datatype": "string", "editable": true },
                            { "name": "firstname", "label": "FIRSTNAME", "datatype": "string", "editable": true },
                            { "name": "age", "label": "AGE", "datatype": "integer", "editable": true },
                            { "name": "height", "label": "HEIGHT", "datatype": "double(m,2)", "editable": true },
                            {
                                "name": "country", "label": "COUNTRY", "datatype": "string", "editable": true, "values":
                                {
                                    "Europe": { "be": "Belgium", "fr": "France", "uk": "Great-Britain", "nl": "Nederland" },
                                    "America": { "br": "Brazil", "ca": "Canada", "us": "USA" },
                                    "Africa": { "ng": "Nigeria", "za": "South-Africa", "zw": "Zimbabwe" }
                                }
                            },
                            { "name": "email", "label": "EMAIL", "datatype": "email", "editable": true },
                            { "name": "freelance", "label": "FREELANCE", "datatype": "boolean", "editable": true },
                            {
                                "name": "lastvisit",
                                "label": "LAST VISIT",
                                "datatype": "date",
                                "editable": true
                            }
                        ],

                        "data": [
                            { "id": 1, "values": { "country": "uk", "age": 33, "name": "Duke", "firstname": "Patience", "height": 1.842, "email": "patience.duke@gmail.com", "lastvisit": "11\/12\/2002" } },
                            { "id": 2, "values": ["Rogers", "Denise", 59, 1.627, "us", "rogers.d@gmail.com", "", "07\/05\/2003"] },
                            { "id": 3, "values": { "name": "Dujardin", "firstname": "Antoine", "age": 21, "height": 1.73, "country": "fr", "email": "felix.compton@yahoo.fr", "freelance": true, "lastvisit": "21\/02\/1999" } },
                            { "id": 4, "values": { "name": "Conway", "firstname": "Coby", "age": 47, "height": 1.96, "country": "za", "email": "coby@conwayinc.com", "freelance": true, "lastvisit": "01\/12\/2007" } },
                            { "id": 5, "values": { "name": "Shannon", "firstname": "Rana", "age": 24, "height": 1.56, "country": "nl", "email": "ranna.shannon@hotmail.com", "freelance": false, "lastvisit": "07\/10\/2009" } },
                            { "id": 6, "values": { "name": "Benton", "firstname": "Jasmine", "age": 61, "height": 1.71, "country": "ca", "email": "jasmine.benton@yahoo.com", "freelance": false, "lastvisit": "13\/01\/2009" } },
                            { "id": 7, "values": { "name": "Belletoise", "firstname": "André", "age": 31, "height": 1.84, "country": "be", "email": "belletoise@kiloutou.be", "freelance": true, "lastvisit": "" } },
                            { "id": 8, "values": { "name": "Santa-Maria", "firstname": "Martin", "age": 37, "height": 1.80, "country": "br", "email": "martin.sm@gmail.com", "freelance": false, "lastvisit": "12\/06\/1995" } },
                            { "id": 9, "values": { "name": "Dieumerci", "firstname": "Amédé", "age": 37, "height": 1.81, "country": "ng", "email": "dieumerci@gmail.com", "freelance": true, "lastvisit": "05\/07\/2009" } },
                            { "id": 10, "values": { "name": "Morin", "firstname": "Wanthus", "age": 46, "height": 1.77, "country": "zw", "email": "morin.x@yahoo.json.com", "freelance": false, "lastvisit": "04\/03\/2004" } }
                        ]
                    }

                    var fdata =
                    {
                        metadata: [{ "name": "PartitionId", "editable": false },
                            { "name": "Key", "editable": true },
                            { "name": "Value/Sku", "editable": true },
                            { "name": "Value/Price", "editable": true },
                            { "name": "Value/Quantity", "editable": true }]
                        ,
                        data: outArray
                    }
                    editableGrid.loadJSONFromString(fdata);
                    editableGrid.renderGrid("tablecontent", "testgrid");
                    //editableGrid.loadJSON(jsondata);
                    // EditableGrid.prototype.refreshGrid();
                    // mygrid();
                    //editableGrid.loadJSONFromString(JSON.stringify(mydata));
                    // jsontotable(outArray);
                }
            } else {
                //postMessage(http.statusText, "danger", true);
            }
        }
    };

    http.open("GET", s);
    http.send();
}
/* This function calls the StatefulBackendController's HTTP PUT method to insert a KeyValuePair in the reliable dictionary in the StatefulBackendService */
function addKeyValuePair() {
    var keyValue = keyInput.value;

    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            end = new Date().getTime();
            if (http.status < 400) {
                keyInput.value = '';

                keyInput.focus();

            } else {
                keyInput.focus();

            }
        }
    };

    http.open("POST", "/query/BasicApp/ProductSvc/products");
    http.setRequestHeader("content-type", "application/json");
    http.send(keyValue);
    getDictionary("query/BasicApp/ProductSvc/products");
}

function updateKeyValuePair() {
    var keyValue = keyInput.value;

    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            end = new Date().getTime();
            if (http.status < 400) {
                keyInput.value = '';

                keyInput.focus();

            } else {
                keyInput.focus();

            }
        }
    };

    http.open("PUT", "/query/BasicApp/ProductSvc/products");
    http.setRequestHeader("content-type", "application/json");
    http.send(keyValue);
    getDictionary("query/BasicApp/ProductSvc/products");
}
function deleteKeyValuePair() {
    var keyValue = keyInput.value;

    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            end = new Date().getTime();
            if (http.status < 400) {
                keyInput.value = '';

                keyInput.focus();

            } else {
                keyInput.focus();

            }
        }
    };

    http.open("DELETE", "/query/BasicApp/ProductSvc/products");
    http.setRequestHeader("content-type", "application/json");
    http.send(keyValue);
    getDictionary("query/BasicApp/ProductSvc/products");
}
function getDictionary1() {
    getDictionary("query/BasicApp/ProductSvc/products");
}


function jstohtml(s) {
    var inArray = [];
    inArray = arrayFrom(JSON.parse(s));
    var outArray = [];
    for (var row in inArray) {
        outArray[outArray.length] = parse_object(inArray[row]);
    }
    /*   var options = {};
       options.separator = ",";
       options.headers = true;
       options.noBreaks = false;
       var csv = $.csv.fromObjects(outArray, options);
       if (options.headers && (csv.charAt(0) === '\n' || csv.charAt(0) === '\r')) csv = "Field1" + csv;
       document.getElementById('txta').value = csv;
       CSV.isFirstRowHeader = (document.getElementById('chkCsvHeader')).checked;
       CSV.delimiter = delimiter;
       CSV.autodetect = false;
       CSV.parse(document.getElementById('txta').value);
       document.getElementById('txta').value = csvToTable(CSV, (document.getElementById('chkCsvHeader')).checked, false, false);
       document.getElementById('diva').innerHTML = document.getElementById('txta').value;
   return;*/
}

// adapted from csvkit's recursive JSON flattening mechanism:
// https://github.com/onyxfish/csvkit/blob/61b9c208b7665c20e9a8e95ba6eee811d04705f0/csvkit/convert/js.py#L15-L34

// depends on jquery and jquery-csv (for now)
function arrayFrom(json) {
    var queue = [], next = json;
    while (next !== undefined) {
        if ($.type(next) == "array")
            return next;
        if ($.type(next) == "object") {
            for (var key in next)
                queue.push(next[key]);
        }
        next = queue.shift();
    }
    // none found, consider the whole object a row
    return [json];
}

function parse_object(obj, path) {
    if (path == undefined)
        path = "";

    var type = $.type(obj);
    var scalar = (type == "number" || type == "string" || type == "boolean" || type == "null");

    if (type == "array" || type == "object") {
        var d = {};
        for (var i in obj) {

            var newD = parse_object(obj[i], path + i + "/");
            $.extend(d, newD);
        }

        return d;
    }

    else if (scalar) {
        var d = {};
        var endPath = path.substr(0, path.length - 1);
        d[endPath] = obj;
        return d;
    }

    // ?
    else return {};
}




function jsontotable(myBooks) {
    // EXTRACT VALUE FOR HTML HEADER. 

    var col = [];
    for (var i = 0; i < myBooks.length; i++) {
        for (var key in myBooks[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (i = 0; i < myBooks.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myBooks[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}




JSON.flatten1 = function (data) {
    var result = {};

    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            for (var i = 0, l = cur.length; i < l; i++)
                recurse(cur[i], prop + "[" + i + "]");
            if (l == 0) result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop + "." + p : p);
            }
            if (isEmpty && prop) result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
};




