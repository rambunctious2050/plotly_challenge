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
}

// Define a function that will create charts for given sample
function buildCharts(sampleID) {

    // Read the json data
    var select = document.getElementById("selDataset"); 
    // Read json data
    d3.json("../../samples.json").then(function(data){
        // Parse and filter data to get samples
        var samples = data.samples;
        var top10OTU;
        var top10OTUVals;
        var top10OTULabels;
        // Get all the necessary data from the json file   
        samples.forEach((opt) => {
            if(opt.id == sampleID){
                // info for the bar chart
                top10OTU = opt.otu_ids.slice(0, 10);
                top10OTUVals = opt.sample_values.slice(0, 10);
                top10OTULabels = opt.otu_labels.slice(0, 10);
                // info for bubble chart    
                OTU = opt.otu_ids;
                OTUVals = opt.sample_values;
                OTULabels = opt.otu_labels;
            }
        });
        
        // Convert bar graph y axis values to strings
        var str_top10OTU = [];
        var str_OTU = [];
        for(var i = 0; i < 10; i++){
            str_top10OTU.push("OTU " + top10OTU[i].toString());
        }
        // Convert y axis values to strings for bubble chart
        for(var i = 0; i < OTU.length; i++){
            str_OTU.push("OTU" + OTU[i].toString())
        }

        // Create bar chart
        var trace1 = {
          type: "bar",
          x: top10OTUVals,
          y: str_top10OTU,
          orientation: 'h'
        };
        var data = [trace1];
        var layout = {
          title: "Top 10 OTU IDs and Sample Values",
        };
        Plotly.newPlot("bar", data, layout);

        // Create bubble chart
        var size = OTUVals;
        var trace2 = {
            x: OTU,
            y: OTUVals,
            text: OTULabels,
            mode: 'markers',
            marker:{
                color: OTU,
                size: size
            }
        };
        var data = [trace2];
        var layout = {
            title: 'All OTU IDs and Sample Values',
            xaxis: { title: "OTU IDs"},
            yaxis: { title: "OTU Sample Values"},
            showlegend: false,
            height: 500,
            width: 1500
        };
        Plotly.newPlot("bubble", data, layout);
    });    
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
        buildCharts(sample.id);

        // When new ID is selected from dropdown, get the relevant info for the new ID
        document.getElementById("selDataset").onchange = function(){
            var newID = document.getElementById("selDataset").value; 
            var newSample;
            data.metadata.forEach((info) => {
                if(info.id == newID){
                    newSample = info;
                }
            });
            optionChanged(newSample);
         };
    });
}
        
function optionChanged(newSample){

    // Clear current panel
    document.getElementById("sample-metadata").innerHTML = "";

    // Update metadata with newly selected sample
    buildMetadata(newSample);

    // Update charts with newly selected sample
    buildCharts(newSample.id); 
}

// Initialize dashboard on page load
init();
