var panel = d3.select("panel-body")

// Define a function that will create metadata for given sample
function buildMetadata(sample) {
    //get parent element
    var parentElement = document.getElementById("sample-metadata")
    var newPanel;
    var br;
    var currentPanel = undefined;
    //Add the demographic info into the box for the selected ID
    var result = Object.keys(sample).map(function(key) {
        newPanel = document.createElement("panel-body");
        //and give it some content
        var text = key + ": " + sample[key];
        var newContent = document.createTextNode(text);
        //add the text node to the newly created panel body
        newPanel.appendChild(newContent);
        //create new break element
        br = document.createElement("br");
        //add the newly created element and its content into the DOM
        parentElement.insertBefore(newPanel,currentPanel);
        parentElement.insertBefore(br,newPanel.nextSibling);
    });

        //var row = panel.append("tr");
        //row.text("Ramyata");
        //for (var key in sample){
            //console.log("key "+ key + " has value " + sample[key]);
            //var value = sample[key];
            // var row = panel.append("tr");
            // row.text("something");
            // var cell = row.append("td");
            // cell.text(value);       
};


        //var ids = filteredData.map(id => people.id);
        //console.log(ids)

        // Specify the location of the metadata and update it
        //sample.forEach((info) => {
            //console.log(info);
        //     var row = panel.append("tr");
        //     Object.entries(info).forEach(([key, value]) => {
        //       var cell = row.append("td");
        //       //var str = key + ":" + value;
        //       cell.text(value);
        //     });
        // });

         //});

         //var obj = {"1":5,"2":7,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0}
         
// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data

        // Parse and filter the data to get the sample's OTU data
        // Pay attention to what data is required for each chart

        // Create bar chart in correct location

        // Create bubble chart in correct location
    
}

// Define function that will run on page load
function init() {
    var select = document.getElementById("selDataset"); 
    // Read json data
    d3.json("../../samples.json").then(function(data){
        // Parse and filter data to get sample names
        var sampleNames = data.names;
        console.log(sampleNames);
        // Add dropdown option for each sample   
        sampleNames.forEach((opt) => {
            var el = document.createElement("option");
            el.text = opt;
            el.value = opt;
            select.add(el);
        });
        // Use first sample to build metadata and initial plots
        var sample = data.metadata[0];
        console.log(sample);
        buildMetadata(sample);
    });
};
        

function optionChanged(newSample){

    // Update metadata with newly selected sample

    // Update charts with newly selected sample

}
// Initialize dashboard on page load
init();
