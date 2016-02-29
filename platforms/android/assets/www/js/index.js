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
    
       // app global vars      
        myapp:sap.m.App,
        page1:sap.m.Page,
        page2:sap.m.Page,
        mapdiv:Element,
        coodiv:Element,
        watchID:String,
        gmap:google.maps.Map,
        
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
                
        app.receivedEvent('deviceready');        
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        /*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        */                    
        
        // get current position
        this.watchID = navigator.geolocation.watchPosition(this.onGPSSuccess,this.onGPSError,{ enableHighAccuracy: true });  
                       
        // ui5 init
        sap.ui.getCore().attachInit(function () {
            
                // create a mobile app and display page1 initially
                this.myapp = new sap.m.App("myApp",{ initialPage:"page1"});
                
                // create the first page
                this.page1 = new sap.m.Page("page1",{title:"GeoMe",showNavButton:false,headerContent:new sap.m.Button({text:"Detail",icon:"sap-icon://action",press:function(){myapp.to("page2");}})});                                          
                                
                // prepare div for maps
                this.mapdiv = new sap.ui.core.HTML("mapdiv", { content:'<div id="mapdiv"></div>' }).placeAt("page1");       
                
                // create the second page with a back button
                this.page2 = new sap.m.Page("page2", {title:"Hello Page 2",showNavButton:true,navButtonPress:function(){myapp.back();}});
                
                // prepare div for cohordinates
                this.coodiv = new sap.ui.core.HTML("coodiv", { content:'<div id="coodiv"></div>' }).placeAt("page2");  
                
                // add both pages to the app
                this.myapp.addPage(this.page1).addPage(this.page2);
                
                // place the app into the HTML document
                this.myapp.placeAt("content");        
                
        });                      
        
    },
    
    // gps ok
    onGPSSuccess: function(position) {
            
            // build map
            if (this.gmap == null) { this.gmap = new google.maps.Map(document.getElementById("mapdiv"), {center:{lat:position.coords.latitude,lng:position.coords.longitude},zoom:12}); }
            
            // set map center
            this.gmap.setCenter( new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
            
            // get div
            this.coodiv = document.getElementById("coodiv");
            
            // set content
            this.coodiv.innerHTML = 'Latitude: '          + position.coords.latitude         + '<br />' +
                                    'Longitude: '         + position.coords.longitude        + '<br />' +
                                    'Altitude: '          + position.coords.altitude         + '<br />' +
                                    'Accuracy: '          + position.coords.accuracy         + '<br />' +
                                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                                    'Heading: '           + position.coords.heading          + '<br />' +
                                    'Speed: '             + position.coords.speed            + '<br />' +
                                    'Timestamp: '         + position.timestamp               + '<br />';             

    },
    
    // gps ko
    onGPSError: function(error) { alert('code: ' + error.code    + '\n' + 'message: ' + error.message + '\n'); }           
   
    };

app.initialize();