


function getDictionary(s) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            end = new Date().getTime();
            if (http.status < 400) {
               // var returnData = JSON.stringify(JSON.flatten1(JSON.parse(http.responseText)), null, "\t");
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
                 

                    var metadata = [];
                    var p = Object.keys(outArray[0]).length;
                    var keyName;

                    if (outArray)
                        for (var i = 0; i < p; i++) {
                            keyName = Object.keys(outArray[0])[i];
                            if (keyName == "PartitionId") {

                                metadata.push({ name: keyName, datatype: "string", editable: false });

                            } else {

                                metadata.push({ name: keyName, datatype: "string", editable: true });
                            }
                        }
        
                    editableGrid.load({ "metadata": metadata, "data": outArray });
                    // editableGrid.loadJSONFromString(fdata);
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

}


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




