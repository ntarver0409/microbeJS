function init() {    
    // Using D3 to import my data
    d3.json("./samples.json").then(function(data) {
        // Checking that it loaded in properly
        console.log(data);

        //Establishing variables to make my charts

        //Grabbing the OTU Ids from the sample set
        ids = data.samples[0].otu_ids;
        //Taking the top 10 IDs using a slice
        topIds = ids.slice(0,10).reverse();
        console.log(topIds);
        //Getting my labels for my bar chart
        plotLabels = ids.map(function(d) {
            return "OTU " + d
        }).slice(0,10).reverse();
        console.log(plotLabels);
        //Grabbling the sample values for my charts
        let sampleValues = data.samples[0].sample_values;
        //Taking top 10 with a slice
        let topValues = sampleValues.slice(0,10).reverse();
        console.log(topValues);
        //Grabbing the text that displays when you mouse over the bar
        let text = data.samples[0].otu_labels;
        // Getting the top 10... you get the point by now
        let topText = text.slice(0,10).reverse();
        console.log(topText);

        //Making my trace for the bar chart
        let barTrace = {
            x: topValues,
            y: plotLabels,
            text: topText,
            type: "bar",
            orientation: "h"
        };
        //establishing it as my bar chart data
        let barData = [barTrace];
        //making my chart
        Plotly.newPlot("bar", barData);

        //Making my trace for the buuble chart
        let bubbleTrace = {
            x: ids,
            y: sampleValues,
            text: text,
            mode: "markers",
            marker: {
                color: ids,
                size: sampleValues
            }
        };
        //establishing it as my bubble chart data
        let bubbleData = [bubbleTrace];
        // making my x axis label
        let layout = {
            xaxis: {title: "OTU ID"},
            height: 750,
            width: 1000
        };

        Plotly.newPlot("bubble", bubbleData, layout);

        // Making variables for my metadata table
        // Pulling the first JSON object from the meta data.
        let metaData = data.metadata[0];
        console.log(metaData);

        // Selecting the html for where Im displaying the data
        let metaDisplay = d3.select("#sample-metadata");

        // Using object.entries to loop through the metadata and pull/display the data
        Object.entries(metaData).forEach(function([key, value]) {
            metaDisplay.append("h6").text(`${key}: ${value}`);
        });
        // Selecting my drop down menu to populate it
        dropMenu = d3.select("#selDataset");

        // looping through the names part of the data to add them to the menu
        data.names.forEach(function(name) {
            dropMenu.append("option").text(name).property("value");
        });
    });
};

function optionChanged() {
    updatePage();
};

function updatePage(){
    // preventing my page from reloading

    //pulling the value from the drop down menu
    let dropdown = d3.select("#selDataset");
    let selectData = dropdown.property("value");

    console.log(selectData);

    d3.json("./samples.json").then(function(data) {
        // Using the value from the dropdown to filter the data.
        let selectSample = data.samples.filter(function(row){
            return row.id === selectData
        });

        console.log(selectSample);

        //Grabbing the OTU Ids from the sample set
        sampIds = selectSample[0].otu_ids;
        //Taking the top 10 IDs using a slice
        topSampIds = sampIds.slice(0,10).reverse();
        console.log(sampIds);
        console.log(topSampIds)
        //Getting my labels for my bar chart
        sampPlotLabels = sampIds.map(function(d) {
            return "OTU " + d
        }).slice(0,10).reverse();
        console.log(sampPlotLabels);
        //Grabbling the sample values for my charts
        let sampValues = selectSample[0].sample_values;
        //Taking top 10 with a slice
        let topSampValues = sampValues.slice(0,10).reverse();
        console.log(topSampValues);
        //Grabbing the text that displays when you mouse over the bar
        let sampText = selectSample[0].otu_labels;
        // Getting the top 10... you get the point by now
        let topSampText = sampText.slice(0,10).reverse();
        console.log(topSampText);

        //Making my trace for the bar chart
        let barTrace = {
            x: topSampValues,
            y: sampPlotLabels,
            text: topSampText,
            type: "bar",
            orientation: "h"
        };
        //establishing it as my bar chart data
        let barData = [barTrace];
        //making my chart
        Plotly.newPlot("bar", barData);

        //Making my trace for the buuble chart
        let bubbleTrace = {
            x: sampIds,
            y: sampValues,
            text: sampText,
            mode: "markers",
            marker: {
                color: sampIds,
                size: sampValues
            }
        };
        //establishing it as my bubble chart data
        let bubbleData = [bubbleTrace];
        // making my x axis label
        let layout = {
            xaxis: {title: "OTU ID"},
            height: 750,
            width: 1000
        };

        Plotly.newPlot("bubble", bubbleData, layout);

        // Pulling the first JSON object from the meta data.
        let selectMeta = data.metadata.filter(function(row){
            return row.id == selectData
        });
        console.log(selectMeta);

        // Selecting the html for where Im displaying the data
        let sampDisplay = d3.select("#sample-metadata");
        // clearing out the html in the sample-metadata id
        sampDisplay.html("");

        // Using object.entries to loop through the metadata and pull/display the data
        Object.entries(selectMeta[0]).forEach(function([key, value]) {
            sampDisplay.append("h6").text(`${key}: ${value}`);
        });
    });
};



init();