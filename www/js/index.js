/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    
    // attributes      
    myapp:sap.m.App,
    watchID:String,
    gmap:google.maps.Map,
    marker:google.maps.Marker,
    circle:google.maps.Circle,
        
    // Application Constructor
    initialize: function() { this.bindEvents(); },
    
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() { document.addEventListener('deviceready', this.onDeviceReady, false); },
    
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() { app.receivedEvent('deviceready'); },
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        // get current position
        this.watchID = navigator.geolocation.watchPosition(app.onGPSSuccess,app.onGPSError,{ enableHighAccuracy: true });  
                       
        // ui5 init
        sap.ui.getCore().attachInit(function () {
            
                // create a mobile app and display page1 initially
                this.myapp = new sap.m.App("myApp",{ initialPage:"page1"});
                
                // create the first page
                page1 = new sap.m.Page("page1",{title:"GeoMe",showNavButton:false,headerContent:new sap.m.Button({text:"Detail",icon:"sap-icon://action",press:function(){myapp.getPage("page1").setVisible(false);myapp.getPage("page2").setVisible(true);myapp.to("page2");}})});                                          
                page1.addContent(new sap.ui.core.HTML("mapdiv", { content:'<div id="mapdiv"></div>' }).placeAt("page1"));               
                
                // create the second page with a back button
                page2 = new sap.m.Page("page2", {title:"Hello Page 2",showNavButton:true,navButtonPress:function(){myapp.getPage("page2").setVisible(false);myapp.getPage("page1").setVisible(true);myapp.back();}});
                page2.addContent(new sap.ui.core.HTML("coodiv", { content:'<div id="coodiv"></div>' }).placeAt("page2"));
                page2.setVisible(false);
                
                // add both pages to the app
                this.myapp.addPage(page1).addPage(page2);
                
                // place the app into the HTML document
                this.myapp.placeAt("content");        
                
        });                      
        
    },
    
    // gps ok callback
    onGPSSuccess: function(position) {
            
            // build gcoords
            coords = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            
            if (this.myapp.getPage("page1").getVisible() === true) {
                            
                // build map
                if (jQuery.isEmptyObject(this.gmap)) {this.gmap=new google.maps.Map(document.getElementById("mapdiv"),{center:coords,zoom:16});} else {this.gmap.setCenter(coords);}            

                // marker
                if (jQuery.isEmptyObject(this.marker)) {this.marker=new google.maps.Marker({clickable:false,map:this.gmap,position:coords});} else {this.marker.setPosition(coords);}

                // accuracy circle
                if (jQuery.isEmptyObject(this.circle)) {this.circle=new google.maps.Circle({center:coords,clickable:false,fillColor:"blue",fillOpacity:0.15,map:this.gmap,radius:position.coords.accuracy,strokeColor:"blue",strokeOpacity:0.3,strokeWeight:2})} else {this.circle.setCenter(coords);this.circle.setRadius(position.coords.accuracy);}
            }
            
            if (this.myapp.getPage("page2").getVisible() === true) {
                            
                // get div
                coodiv = document.getElementById("coodiv");

                // set content
                coodiv.innerHTML = 'Latitude: '          + position.coords.latitude         + '<br />' +
                                   'Longitude: '         + position.coords.longitude        + '<br />' +
                                   'Altitude: '          + position.coords.altitude         + '<br />' +
                                   'Accuracy: '          + position.coords.accuracy         + '<br />' +
                                   'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                                   'Heading: '           + position.coords.heading          + '<br />' +
                                   'Speed: '             + position.coords.speed            + '<br />' +
                                   'Timestamp: '         + position.timestamp               + '<br />';
            }

    },
    
    // gps ko callback
    onGPSError: function(error) { alert('code: ' + error.code    + '\n' + 'message: ' + error.message + '\n'); }           
   
    };

app.initialize();